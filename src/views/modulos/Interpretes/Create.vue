
<template>
  <div class="content-section">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-form class="form_data_section" ref="dataForm" lazy-validation>
      <TitleSection :sectiontitle="sectiontitle" />
      <input type="hidden" v-model="dataForm.id" />
      <v-row class="mt-5 p-3">
              <!-- Cédula de Identidad -->
               <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="arrayCustomers"
                    item-text="cedula"
                    item-value="id"
                    label="Cédula"
                    placeholder="Cédula"
                    dense
                    :rules="rules"
                    required
                    v-model="cedulaselect"
                    @change="getPersonCertificate($event)"
                    return-object
                  
                  >
                    <template v-slot:prepend-item>
                      <v-overlay :value="isLoading">
                        <v-progress-circular
                          indeterminate
                          size="24"
                          color="#ff7005"
                        ></v-progress-circular>
                      </v-overlay>
                      <v-list-item>
                        <v-list-item-content>
                          <v-text-field
                            type="number"
                            min="1"
                            v-model="searchTerm"
                            placeholder="Buscar Persona Certificada"
                            @keyup.enter="searchCertificatePerson"
                            autofocus
                          ></v-text-field>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                    </template>
                  </v-select>
                </v-col>
        <!-- <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Cédula de Identidad"
            placeholder="Cédula de Identidad"
            outlined
            dense
            v-model="dataForm.identity_card"
            :rules="rules"
            required
          ></v-text-field>
        </v-col> -->
        <!-- Nombre y Apellido del Intérprete -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Nombre y Apellido"
            placeholder="Nombre y Apellido del Intérprete"
            outlined
            dense
            v-model="dataForm.full_name"
            :rules="rules"
            required
          ></v-text-field>
        </v-col>
  
        <!-- Tipo de Intérprete -->
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayInterpreterTypes"
            item-text="text"
            item-value="value"
            label="Tipo de Intérprete"
            outlined
            dense
            v-model="dataForm.interpreter_type"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <!-- Posee Discapacidad -->
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="[{ text: 'Sí', value: true }, { text: 'No', value: false }]"
            item-text="text"
            item-value="value"
            label="¿Posee Discapacidad?"
            outlined
            dense
            v-model="dataForm.has_disability"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <!-- Tipo de Discapacidad General -->
        <v-col cols="12" sm="6" md="4" v-if="dataForm.has_disability">
          <v-select
            :items="arrayDiscapacidades"
            item-text="nombre"
            item-value="id"
            label="Tipo de Discapacidad General"
            outlined
            dense
            v-model="dataForm.tipo_discapacidad_general_id"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <!-- Instituto que acredita -->
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayInstitutosAcreditadores"
            item-text="text"
            item-value="value"
            label="Instituto que acredita"
            outlined
            dense
            v-model="dataForm.accrediting_institute"
            :rules="rules"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center p-5">
        <v-btn @click="onSubmit" color="primary" small>{{ btnName }}</v-btn>
      </v-row>
    </v-form>
    <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color" />
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Notificación</span>
        </v-card-title>
        <v-card-text>
          <p>Esta cédula no esta certificada , será redirigido a la sección donde se registran los Intérpretes de <strong>Lengua de Señas Venezolana</strong>.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="confirmDialog">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import formacionModule from "@/store/modules/formacionModule";
import bussinesModule from "@/store/modules/bussinesModule";
import extrasModule from "@/store/modules/extrasModule";
import linkedModule from "@/store/modules/linkedModule";
import { ValidationObserver } from "vee-validate";
import storageData from "@/store/services/storageService";

@Component({
  components: {},
})
export default class Students extends Vue {

  [x: string]: unknown;
  overlay = false;
  snackbar = false;
  textmsj = "";
  color = "";
  timeout = 2000;
  sectiontitle = "";
  dialog = false;
  openDialog = false;
  textbody = "";
  titleModalDelete = "";
  date = "";
  menu2: boolean = false;
  btnName = "Guardar";
  arrayStates = [];
  arrayMunicipality = [];
  arrayParishes = [];
  arrayDiscapacidades = [];
  temp_id : any = null;
  arrayInstitutosAcreditadores: Array<{ text: string; value: string }> = [
    { text: 'FEDERACIÓN VENEZOLANA DE SORDOS FEVENSOR', value: 'FEVENSOR' },
    { text: 'ASOCIACIÓN DE SORDOS DE CARACAS ASC', value: 'ASC' },
    { text: 'UNIVERSIDAD PEDAGÓGICA EXPERIMENTAL LIBERTADOR', value: 'UPEL' },
    { text: 'INSTITUTO PEDAGÓGICO DE CARACAS', value: 'IPC' }
  ];
  arrayInterpreterTypes: Array<{ text: string; value: string }> = [
    { text: 'Usuario de LSV', value: 'usuario' },
    { text: 'Intérprete LSV', value: 'Interprete' },
    { text: 'Traductor de LSV', value: 'traductor' },
    { text: 'Guía Intérprete', value: 'guia_interprete' },
    { text: 'Guía Vidente', value: 'guia_vidente' },
    { text: 'Facilitador de Braille', value: 'facilitador_braile' },
    { text: 'Facilitador de O y M (Orientación y Movilidad)', value: 'facilitador_O_M' }
  ];
  searchTerm = "";
  isLoading = false;
  arrayCustomers = [];
  cedulaselect = ''
  dataForm: any = {
    endpoint: 'lsv-interpreter',
  };
  dataFormEdit: any = {
    endpoint: 'lsv-interpreter',
  };



  $refs!: {
    dataForm: InstanceType<typeof ValidationObserver>;
  };
  get FormRequest(): any {
    return this.dataForm;
  }
  get FormRequestEdit(): any {
    return this.dataFormEdit;
  }

    async searchCertificatePerson(val) {
    this.isLoading = true;
    const data: any = await linkedModule.searchCertificatePerson(
      this.searchTerm
    );

    if (data.data.length > 0) {
        this.arrayCustomers = data.data;
        this.isLoading = false;
    } else {
      this.searchTerm = "";
      this.isLoading = false;
      this.dataForm.full_name = "";
      this.dataForm.identity_card = "";
      this.arrayCustomers = [];
      this.$refs.dataForm.reset();
      
      this.dialog = true;
    }
  }

  getPersonCertificate(event) {
    if (event && event.nombres && event.apellidos) {
      // Forzar actualización reactiva
      this.$set(this.dataForm, 'full_name', `${event.nombres} ${event.apellidos}`);
    } else {
      this.$set(this.dataForm, 'full_name', '');
    }
    if (event && event.cedula) {
      this.$set(this.dataForm, 'identity_card', event.cedula);
    } else {
      this.$set(this.dataForm, 'identity_card', '');
    }
  }
  confirmDialog() {
    this.dialog = false;
    // Cambia la URL por la pública de destino
    const url = 'https://web.conapdis.gob.ve/interpreters';
    window.open(url, '_blank');
  }
  updateFecha() {
    this.dataForm.proposed_date = this.date;
    this.dataForm.date_request = this.date;
  }
 
  onSubmit() {
    this.dataForm.endpoint = 'lsv-interpreter';

    const valid: any = this.$refs.dataForm.validate();

    if (valid) {
      if(this.$route.params.id) {
        this.update();
      } else {
        this.save();
      }
    } else {
      this.dialog = true;
    }
  }
  async save() {
    this.overlay = true;
    const data = await extrasModule.save(this.FormRequest);

    if (data.code == 200 || data.code == 201) {
      this.textmsj = "Registro Creado con Éxito.";
      this.color = "success";
      this.snackbar = true;
      this.back();
      this.overlay = false;
    } else {
      this.textmsj = "Error al crear el registro.";
      this.color = "error";
      this.snackbar = true;
      this.backError();
      this.overlay = false;
    }
  }
   async update() {
    this.overlay = true;
    const data = await extrasModule.update(this.FormRequest);

    if (data.code == 200 || data.code == 201) {
      this.textmsj = "Registro Actualizado con Éxito.";
      this.color = "success";
      this.snackbar = true;
      this.back();
      this.overlay = false;
    } else {
      this.textmsj = "Error al actualizar el registro.";
      this.color = "error";
      this.snackbar = true;
      this.backError();
      this.overlay = false;
    }
  }
  cerrarModal(event) {
    this.openDialog = event;
    this.reset();
    this.textmsj = "Cliente Creado con Éxito.";
    this.color = "success";
    this.snackbar = true;
    this.back();
    this.overlay = false;
  }


  async getDiscapacidades() {
    const discapacidades : any = await  formacionModule.getDiscapacidadesAll();
    this.arrayDiscapacidades = discapacidades.data;
  }

  reset() {
    this.$refs.dataForm.reset();
  }

  back() {
    setTimeout(() => {
      this.snackbar = false;
      this.$router.go(-1);
    }, 2000);
  }
  backError() {
    setTimeout(() => {
      this.snackbar = false;
    }, 2000);
  }
  go() {
    this.$router.go(-1);
  }

  async getFindById(id: number) {
    this.dataFormEdit.id = id;
    this.overlay = true;
    const data: any = await extrasModule.getById(this.FormRequestEdit);
    if (data && data.data) {
      Object.assign(this.dataForm, data.data.data);
      // Normaliza el booleano
      if (data.data.data.has_disability === 1) {
        this.dataForm.has_disability = true;
      } else {
        this.dataForm.has_disability = false;
      }
      if(data.data.data.identity_card){
        this.getInterpreteByCedula(data.data.data.identity_card);
      }
    }
    this.overlay = false;
  }
  async getInterpreteByCedula(cedula) {
    const DataTransfer: any = await linkedModule.searchCertificatePerson(cedula);
    const dataArray = [DataTransfer];
    this.arrayCustomers = dataArray[0].data;
    // Busca el objeto correspondiente a la cédula
    const selected = this.arrayCustomers.find((item: any) => item.cedula == cedula);
    if (selected) {
      this.cedulaselect = selected;
      // Dispara el cambio manualmente para que se actualicen los campos dependientes
      this.getPersonCertificate(selected);
    } else {
      this.cedulaselect = '';
    }
  }
  mounted() {  
    const bussines = storageData.get("_bussines");
    this.dataForm.busine_id = bussines && bussines.id ? Number(bussines.id) : null;
    if ((this.$route as any).params && (this.$route as any).params.id) {
      this.getDiscapacidades();
      this.getFindById((this.$route as any).params.id);
      this.sectiontitle = "ACTUALIZAR REGISTRO";
      this.btnName = "Actualizar";
    }else {
      this.sectiontitle = "NUEVO REGISTRO";
      this.getDiscapacidades();
    }
  }


  data() {
    return {
      rules: [(v: any) => !!v || "Campo requerido"],
      emailRules: [
        (v) => !!v || "E-mail is requerido",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      numberRule: [
        (v) => v >= 0 || "El valor debe ser mayor a cero",
        (v) => v <= 100 || "El valor debe ser menor a 100",
      ],
      rulesNum: [(v) => v >= 0 || "Campo Requerido"],
      textRules: [
        (v: any) => !!v || "Campo Requerido",
        (v: any) =>
          /^[A-Za-z-0-9]+$/.test(v) || "Campo No acepta caracteres especiales",
        (v: any) =>
          (v && v.length <= 10) || "Debe ingresar máximo 10 caracteres",
      ],
      Notrules: [
           
      ],
    };
  }
  setItem() {}
}
</script>
<style lang="scss" scoped>
.form_data_section {
  background: white;
  border-radius: 8px;
  width: 100%;
  padding: 20px;
}
.content-section {
  display: flex;
  justify-content: center;
}
.col-md-6 {
  padding: 2px;
}
@media screen and (max-width: 374px) {
  .form_data_section {
    width: 100%;
  }
}
@media screen and (min-width: 375px) and (max-width: 424px) {
  .form_data_section {
    width: 100%;
  }
}
@media screen and (min-width: 425px) and (max-width: 830px) {
  .form_data_section {
    width: 100%;
  }
}
</style>
