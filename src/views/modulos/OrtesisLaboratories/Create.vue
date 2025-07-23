<template>
  <div class="content-section">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-form class="form_data_section" ref="dataForm" lazy-validation>
      <TitleSection :sectiontitle="sectiontitle" />
      <input type="hidden" v-model="dataForm.id" />
      <v-row class="mt-5 p-3">
        <!-- Nombre del Laboratorio -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Nombre del Laboratorio"
            placeholder="Nombre del Laboratorio"
            outlined
            dense
            v-model="dataForm.laboratory_name"
            :rules="rules"
            required
          ></v-text-field>
        </v-col>
        <!-- Dirección del Laboratorio -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Dirección"
            placeholder="Dirección del Laboratorio"
            outlined
            dense
            v-model="dataForm.laboratory_address"
            :rules="rules"
            required
          ></v-text-field>
        </v-col>
        <!-- Estado -->
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayStates"
            item-text="name"
            item-value="id"
            label="Estado"
            outlined
            dense
            v-model="dataForm.estado_id"
            :rules="rules"
            required
            @change="getMunicipalityByState($event)"
          ></v-select>
        </v-col>
        <!-- Municipio -->
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayMunicipality"
            item-text="name"
            item-value="id"
            label="Municipio"
            outlined
            dense
            v-model="dataForm.municipio_id"
            :rules="rules"
            required
            @change="getParishesByMunicipality($event)"
          ></v-select>
        </v-col>
        <!-- Parroquia -->
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayParishes"
            item-text="name"
            item-value="id"
            label="Parroquia"
            outlined
            dense
            v-model="dataForm.parroquia_id"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <!-- Teléfonos -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Teléfonos"
            placeholder="Teléfonos del Laboratorio"
            outlined
            dense
            v-model="dataForm.laboratory_phone"
            :rules="rules"
          ></v-text-field>
        </v-col>
        <!-- Tipo de Prótesis -->
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayTiposProtesis"
            label="Tipo de Prótesis"
            outlined
            dense
            v-model="dataForm.tipo_protesis_id"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <!-- Cédula Beneficiario -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Cédula del Beneficiario"
            placeholder="Cédula del Beneficiario"
            outlined
            dense
            v-model="dataForm.beneficiary_identity_number"
            :rules="rules"
          ></v-text-field>
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
  arrayStates = [];
  arrayMunicipality = [];
  arrayParishes = [];
  arrayTiposProtesis: Array<{ text: string; value: string }> = [];


  dataForm: any = {
    endpoint: 'ortesis-laboratories',
  };
  dataFormEdit: any = {
    endpoint: 'ortesis-laboratories',
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
   
  updateFecha() {
    this.dataForm.proposed_date = this.date;
    this.dataForm.date_request = this.date;
  }
 
  onSubmit() {
    this.dataForm.endpoint = 'ortesis-laboratories';

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
    async getProtesisAll() {
    const protesis: any = await extrasModule.getAll('protesis');
    this.arrayTiposProtesis = protesis.data.map((item: any) => ({
      text: item.name,
      value: item.id
    }));
  }
  mounted() {
    this.getDiscapacidades();
    this.getStates();
    this.getTypeDocumentAll()
    this.getProtesisAll();
  
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
