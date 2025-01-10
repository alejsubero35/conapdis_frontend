<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div class="formCliente">
      <TitleSection :sectiontitle="sectiontitle" />
      <v-tabs>
        <v-tab>DATOS DE LA NUEVA DECLARACIÓN</v-tab>
        <v-tab @click="getStatements()">DECLARACIONES</v-tab>

        <v-tab-item>
          <v-container fluid>
            <v-form class="formCliente" ref="validateStepForm" lazy-validation>
              <input type="hidden" v-model="declararform.id" value:any="0" />
              <v-row>
                <p class="anuncio">
                  Usted esta a punto de declarar un trimestre ante el Conapdis
                  la cantidad de Personas con Discapacidad que trabajan en su
                  empresa según lo dispone la ley.Si Usted no esta de acuerdo
                  con la cantidad de trabajadores que esta declarando, por favor
                  dirijase al menú "Vincular - Desvincular PCD" y realice la
                  vinculación o desvinculación de Trabajadores con Discapacidad
                  a su empresa.
                </p>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Total Nómina de trabajadores sin discapacidad "
                    placeholder="Total Nómina de trabajadores sin discapacidad "
                    dense
                    :rules="rules"
                    v-model="declararform.numero_total_trabajadores"
                    type="number"
                    @keyup="calcularporcentaje()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Trabajadores con Discapacidad "
                    placeholder="Trabajadores con Discapacidad "
                    dense
                    v-model="declararform.trabajadores_discapacidad"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="arrayPeriods"
                    item-text="nombre"
                    item-value="id"
                    label="Seleccione el Periodo"
                    placeholder="Seleccione el Periodo"
                    dense
                    :rules="rules"
                    required
                    @change="getPeriodo($event)"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Porcentaje de Trabajadores con Discapacidad"
                    placeholder="Porcentaje de Trabajadores con Discapacidad"
                    dense
                    :rules="rules"
                    v-model="porcentaje"
                    readonly
                    class="porcentaje"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="d-flex justify-end">
                <v-btn :disabled="disabled" @click="declarar()">
                  <v-icon>mdi-content-save-outline</v-icon> Declarar</v-btn
                >
              </v-row>
            </v-form>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container fluid>
            <v-form
              class="formCliente"
              ref="validateStepFormTwo"
              lazy-validation
            >
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <template>
                    <v-data-table
                      :headers="headers"
                      :items="desserts"
                      class="elevation-1"
                      no-data-text="No hay datos disponibles"
                      :footer-props="{
                        'items-per-page-options': [5, 10 - 1],
                        'items-per-page-text': 'Filtro por Página',
                      }"
                    >
                      <template v-slot:item.actions="{ item }">
                        <div class="d-flex">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                color="success"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                icon
                                @click="imprimir(item)"
                              >
                                <v-icon>mdi-printer-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>Imprimir Declaración</span>
                          </v-tooltip>
                        </div>
                      </template>
                    </v-data-table>
                  </template>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </div>
    <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color" />
    <v-dialog v-model="dialogOpen" max-width="350">
      <v-card>
        <v-card-title class="text-h5"> Notificación </v-card-title>
        <v-card-text>
          Debe vincular trabajadores para poder declarar
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogOpen = false">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import bussinesModule from "@/store/modules/bussinesModule";
import statementsModule from "@/store/modules/statementsModule";
import { ValidationObserver } from "vee-validate";
import storageData from "@/store/services/storageService";

@Component({
  components: {},
})
export default class Bussines extends Vue {
  [x: string]: unknown;
  overlay = false;
  title: string = "";
  subtitle: string = "";
  validateStepForm: any = { inactivo: "1" };
  arrayPeriods = [];
  declararform: any = {
    empresa_id: "",
    fecha_registro: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
  };
  loadingWizard = false;

  agente_retencion = "";
  snackbar = false;
  textmsj = "";
  color = "";
  timeout = 2000;
  sectiontitle = "Declaración";
  dialog = false;
  tabIndex = 0;
  date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);
  menu2: boolean = false;
  max25chars = (v) => v.length <= 25 || "Input too long!";

  headers = [
    { text: "Código", value: "id" },
    { text: "Fecha de Registro", value: "fecha_registro" },
    { text: "Periodo", value: "nombre" },
    { text: "Cantidad Trabajadores", value: "numero_total_trabajadores" },
    { text: "Personas con Discapacidad", value: "personas_discapacidades" },
    { text: "Action", value: "actions" },
  ];
  desserts = [];
  porcentaje = "";
  disabled = true;
  dataValidate = {
    empresa_id: "",
    periodo_id: "",
  };
  dialogOpen = false;
  $refs!: {
    validateStepForm: InstanceType<typeof ValidationObserver>;
    validateStepFormTwo: InstanceType<typeof ValidationObserver>;
  };
  get getBussines() {
    return bussinesModule.getBussines;
  }
  get FormRequest(): any {
    return this.declararform;
  }

  get activo() {
    return (this.validateStepForm.inactivo = "1");
  }
  async getPeriodo(event) {
    this.dataValidate.periodo_id = event;
    this.dataValidate.empresa_id = storageData.get("_bussines_id");
    const validate: any = await statementsModule.validateStatement(
      this.dataValidate
    );
    if (validate.length > 0) {
      this.textmsj = "El Periodo Seleccionado ya fue Declarado.";
      this.color = "warning";
      this.snackbar = true;
      this.back();
      this.disabled = true;
    } else {
      this.declararform.periodo = event;
      this.declararform.empresa_id = storageData.get("_bussines_id");
      this.calcularporcentaje();
      this.disabled = false;
    }
  }
  async calcularporcentaje() {
    let porcentajeley: number =
      parseInt(this.declararform.numero_total_trabajadores) * (5 / 100);

    if (
      porcentajeley > parseFloat(this.declararform.trabajadores_discapacidad)
    ) {
      this.porcentaje =
        "Total = " +
        porcentajeley +
        " " +
        " - No cumple con el 5% estipulado por la  Ley";
      this.porcentaje = "0";
      this.disabled = true;
    } else {
      this.porcentaje =
        "Total = " +
        porcentajeley +
        " " +
        "- Cumple con el 5% estipulado por la  Ley";
      this.disabled = false;
    }
  }
  async getPeriods() {
    const periods: any = await statementsModule.getPeriodsAll();
    this.arrayPeriods = periods.data;
  }
  async getPeopleLinkedByBussinesId(id) {
    const peoplelinked: any =
      await statementsModule.getPeopleLinkedByBussinesId(id);

    if (peoplelinked.data.length > 0) {
      this.declararform.trabajadores_discapacidad = peoplelinked.data.length;
      this.declararform.personas_discapacidades = peoplelinked.data.length;
    } else {
      this.declararform.trabajadores_discapacidad = 0;
      //this.dialogOpen = true
    }
  }
  async declarar() {
    this.overlay = true;
    const data = await statementsModule.save(this.FormRequest);

    if (data.code == 200 || data.code == 201) {
      this.textmsj = "Declaración Creada con Éxito.";
      this.color = "success";
      this.snackbar = true;
      this.back();
      this.overlay = false;
      this.dialog = true;
    } else {
      this.textmsj = "Error al Registrar la Declaración.";
      this.color = "error";
      this.snackbar = true;
      this.backError();
      this.overlay = false;
    }
  }
  async update() {
    this.overlay = true;
    const data = await bussinesModule.update(this.FormRequest);

    if (data.code == 201) {
      this.textmsj = "Usuario Vinculado con Éxito.";
      this.color = "success";
      this.snackbar = true;
      this.back();
      this.overlay = false;
    } else {
      this.textmsj = "Error al Actualizar los datos de la Empresa.";
      this.color = "error";
      this.snackbar = true;
      this.backError();
      this.overlay = false;
    }
    //this.reset();
  }
  async getStatements() {
    const statementAll: any = await statementsModule.getStatementByBussine(
      storageData.get("_bussines_id")
    );
    this.desserts = statementAll.data;
  }
  imprimir(item) {
    console.log(item);
    this.$router.push({ name: "planilladeclaracion", params: { item: item } });
  }
  reset() {
    this.$refs.validateStepForm.reset();
  }
  back() {
    setTimeout(() => {
      this.tabIndex = 0;
      this.snackbar = false;
    }, 2000);
  }
  backError() {
    setTimeout(() => {
      this.snackbar = false;
    }, 3500);
  }

  data() {
    return {
      show: false,
      rules: [(v: any) => !!v || "Campo requerido"],
      emailRules: [
        (v) => !!v || "E-mail is requerido",
        (v) => /.+@.+/.test(v) || "El email debe ser válido",
      ],
      numberRule: [
        (v) => !!v || "campo requerido",
        (v) => v > 0 || "El valor debe ser mayor a cero",
        (v) => v <= 100 || "El valor debe ser menor a 100",
      ],
    };
  }
  mounted() {
    this.getPeriods();
    this.getPeopleLinkedByBussinesId(storageData.get("_bussines_id"));
    this.declararform.empresa_id = storageData.get("_bussines_id");
  }
}
</script>
<style lang="scss" scoped>
.formCliente {
  background: white;
  padding: 2%;
  //border-radius: 8px;
  //border: 1px solid;
}
.vue-form-wizard {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.vue-form-wizard .wizard-header {
  display: none;
}
.anuncio {
  color: blue;
  font-size: 18px;
}
.v-tabs-slider {
  background-color: red;
  height: 100%;
  width: 100%;
}
.porcentaje {
  color: red;
}
</style>
