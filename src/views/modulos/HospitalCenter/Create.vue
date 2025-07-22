<template>
  <div class="content-section">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-form class="form_data_section" ref="dataForm" lazy-validation>
      <TitleSection :sectiontitle="sectiontitle" />
      <input type="hidden" v-model="dataForm.id" />
      <v-row class="mt-5 p-3">
        <!-- Centro de Salud -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Nombre del Centro de Salud"
            placeholder="Nombre del Centro de Salud"
            outlined
            dense
            v-model="dataForm.health_center_name"
            :rules="rules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-select
            :items="arrayStates"
            item-text="name"
            item-value="id"
            label="Estado"
            placeholder="Estado"
            v-model="dataForm.estado_id"
            outlined
            dense
            :rules="rules"
            required
            @change="getMunicipalityByState($event)"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-select
            :items="arrayMunicipality"
            item-text="name"
            item-value="id"
            label="Municipio"
            placeholder="Municipio"
            v-model="dataForm.municipio_id"
            outlined
            dense
            :rules="rules"
            required
            @change="getParishesByMunicipality($event)"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-select
            :items="arrayParishes"
            item-text="name"
            item-value="id"
            label="Parroquia"
            placeholder="Parroquia"
            v-model="dataForm.parroquia_id"
            outlined
            dense
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="8" md="8">
          <v-textarea
            label="Dirección del Centro de Salud"
            placeholder="Dirección"
            outlined
            dense
            v-model="dataForm.health_center_address"
            :rules="rules"
            required
            rows="2"
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Teléfonos del Centro de Salud"
            placeholder="Teléfonos"
            outlined
            dense
            v-model="dataForm.health_center_phone"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Nombre del Director(a)"
            placeholder="Director(a)"
            outlined
            dense
            v-model="dataForm.health_center_director"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayTiposCedulas"
            item-text="nombre"
            item-value="id"
            label="Tipo de Cédula del Director"
            outlined
            dense
            v-model="dataForm.tipo_cedula_id"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Nº de Cédula del Director"
            placeholder="Nº de Cédula"
            outlined
            dense
            v-model="dataForm.health_center_identity_number"
          ></v-text-field>
        </v-col>
        <!-- Madre -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Nombre de la Madre"
            placeholder="Nombre de la Madre"
            outlined
            dense
            v-model="dataForm.mother_name"
            :rules="rules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayTiposCedulas"
            item-text="nombre"
            item-value="id"
            label="Tipo de Cédula de la Madre"
            outlined
            dense
            v-model="dataForm.mother_tipo_cedula_id"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Nº de Cédula de la Madre"
            placeholder="Nº de Cédula"
            outlined
            dense
            v-model="dataForm.mother_identity_type"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-checkbox
            v-model="dataForm.mother_has_disability"
            label="¿La madre posee discapacidad?"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6" md="4" v-if="dataForm.mother_has_disability">
          <v-select
            :items="arrayDiscapacidades"
            item-text="nombre"
            item-value="id"
            label="Tipo de Discapacidad de la Madre"
            outlined
            dense
            v-model="dataForm.tipo_discapacidad_general_id"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <!-- Niño -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Nombre del Niño Nacido con Discapacidad"
            placeholder="Nombre del Niño"
            outlined
            dense
            v-model="dataForm.child_name"
            :rules="rules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dataForm.child_birth_date"
                label="Fecha de Nacimiento"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                dense
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dataForm.child_birth_date"
              no-title
              locale="es"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arraySexos"
            item-text="nombre"
            item-value="id"
            label="Sexo"
            outlined
            dense
            v-model="dataForm.sexo_id"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayDiscapacidades"
            item-text="nombre"
            item-value="id"
            label="Tipo de Discapacidad del Niño"
            outlined
            dense
            v-model="dataForm.child_tipo_discapacidad_general_id"
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
    <!-- <ModalApproved @confirm="confirm" :titleModalDelete="titleModalDelete" :textbody="textbody" :dialogDelete="openDialog" @cerrarModal="cerrarModal"/> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import formacionModule from "@/store/modules/formacionModule";
import bussinesModule from "@/store/modules/bussinesModule";
import extrasModule from "@/store/modules/extrasModule";
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
  dataForm: any = {
    endpoint: 'children-with-disabilities',
  };
  dataFormEdit: any = {
    endpoint: 'children-with-disabilities',
  };
  arrayDiscapacidades = [];
  arrayStates = [];
  arrayMunicipality = [];
  arrayParishes = [];
  arrayTiposCedulas = [];
  arraySexos = [
    { id: 1, nombre: "Masculino" },
    { id: 2, nombre: "Femenino" },
  ];

  $refs!: {
    dataForm: InstanceType<typeof ValidationObserver>;
  };
  get FormRequest(): any {
    return this.dataForm;
  }
  get FormRequestEdit(): any {
    return this.dataFormEdit;
  }
   
  updateFecha() {
    this.dataForm.proposed_date = this.date;
    this.dataForm.date_request = this.date;
  }
 
  onSubmit() {
    this.dataForm.endpoint = 'children-with-disabilities';

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

  async getStates() {
    const states: any = await bussinesModule.getStatesAll();
    this.arrayStates = states.data.data;
  }
  async getTypeDocumentAll() {
    const types: any = await bussinesModule.getTypeDocumentAll();
    this.arrayTiposCedulas = types.data;
  }
  async getMunicipalityByState(event) {
    const municipality: any = await bussinesModule.getMunicipality(event);
    this.arrayMunicipality = municipality.data.data;
  }
  async getParishesByMunicipality(event) {
    const parishes: any = await bussinesModule.getParishes(event);
    this.arrayParishes = parishes.data.data;
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
    console.log(data.data)
    if (data && data.data) {
      Object.assign(this.dataForm, data.data.data);
      if(data.data.data.estado_id) {
        await this.getMunicipalityByState(data.data.data.estado_id);
        await (this.dataForm.municipio_id = data.data.data.municipio_id);
        await this.getParishesByMunicipality(data.data.data.municipio_id);
        await (this.dataForm.parroquia_id = data.data.data.parroquia_id);
      }
  
    }
    this.overlay = false;
  }
  mounted() {
    this.getDiscapacidades();
    this.getStates();
    this.getTypeDocumentAll()
    this.fillFormOnInit();
    const bussines = storageData.get("_bussines");
    this.dataForm.busine_id = bussines && bussines.id ? Number(bussines.id) : null;
    if ((this.$route as any).params && (this.$route as any).params.id) {
      this.getFindById((this.$route as any).params.id);
      this.sectiontitle = "ACTUALIZAR REGISTRO";
      this.btnName = "Actualizar";
    }else {
      this.sectiontitle = "NUEVO REGISTRO";
    }
  }

  fillFormOnInit() {
    // Valores por defecto para ChildrenBornWithDisabilities
    this.dataForm = {
      health_center_name: 'Centro de Salud Ejemplo',
      estado_id: this.arrayStates.length ? this.arrayStates[0].id : '',
      municipio_id: this.arrayMunicipality.length ? this.arrayMunicipality[0].id : '',
      parroquia_id: this.arrayParishes.length ? this.arrayParishes[0].id : '',
      health_center_address: 'Av. Principal, Sector Centro',
      health_center_phone: '0212-1234567',
      health_center_director: 'Dr. Ejemplo',
      tipo_cedula_id: '1',
      health_center_identity_number: 'J123456789',
      mother_name: 'María Pérez',
      mother_identity_type: '14521456',
      mother_tipo_cedula_id: '2',
      mother_has_disability: false,
      tipo_discapacidad_general_id: '2',
      child_name: 'Juanito Pérez',
      child_birth_date: '',
      sexo_id: '',
      child_tipo_discapacidad_general_id: '3',
    };
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
