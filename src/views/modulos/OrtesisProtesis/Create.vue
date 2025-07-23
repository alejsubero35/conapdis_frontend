<template>
  <div class="content-section">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-form class="form_data_section" ref="dataForm" lazy-validation>
      <TitleSection :sectiontitle="sectiontitle" />
      <input type="hidden" v-model="dataForm.id" />
      <v-row class="mt-5 p-3">
        <!-- Empresa -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Nombre de la Empresa"
            placeholder="Nombre de la Empresa"
            outlined
            dense
            v-model="dataForm.company_name"
            :rules="rules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="[{ text: 'Fabricante', value: 'fabricante' }, { text: 'Distribuidor', value: 'distribuidor' }, { text: 'Proveedor', value: 'proveedor' }]"
            label="Tipo"
            outlined
            dense
            v-model="dataForm.tipo"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayTiposProtesis"
            label="Tipos de Prótesis"
            outlined
            dense
            v-model="dataForm.tipo_protesis"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayTiposOrtesis"
            label="Tipos de Ortesis"
            outlined
            dense
            v-model="dataForm.tipo_ortesis"
            :rules="rules"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="arrayOtros"
            label="Otros"
            outlined
            dense
            v-model="dataForm.otros"
            :rules="rules"
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
  arrayTiposProtesis: Array<{ text: string; value: string }> = [
    { text: 'Prótesis de miembro superior', value: 'miembro_superior' },
    { text: 'Prótesis de miembro inferior', value: 'miembro_inferior' },
    { text: 'Prótesis ocular', value: 'ocular' },
    { text: 'Prótesis auditiva', value: 'auditiva' },
    { text: 'Prótesis dental', value: 'dental' },
    { text: 'Otra', value: 'otra' }
  ];
  arrayTiposOrtesis: Array<{ text: string; value: string }> = [
    { text: 'Ortesis de miembro superior', value: 'miembro_superior' },
    { text: 'Ortesis de miembro inferior', value: 'miembro_inferior' },
    { text: 'Ortesis de columna', value: 'columna' },
    { text: 'Ortesis craneal', value: 'craneal' },
    { text: 'Otra', value: 'otra' }
  ];
  arrayOtros: Array<{ text: string; value: string }> = [
    { text: 'Silla de ruedas', value: 'silla_ruedas' },
    { text: 'Andadera', value: 'andadera' },
    { text: 'Bastón', value: 'baston' },
    { text: 'Muletas', value: 'muletas' },
    { text: 'Otra', value: 'otra' }
  ];
  dataForm: any = {
    endpoint: 'ortesis-protesis',
  };
  dataFormEdit: any = {
    endpoint: 'ortesis-protesis',
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
    this.dataForm.endpoint = 'ortesis-protesis';

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
    // Valores por defecto para OrtesisProtesis
    this.dataForm = {
      endpoint: 'ortesis-protesis',
      company_name: '',
      tipo: '',
      tipo_protesis: this.arrayTiposProtesis && this.arrayTiposProtesis.length ? this.arrayTiposProtesis[0].value : '',
      tipo_ortesis: this.arrayTiposOrtesis && this.arrayTiposOrtesis.length ? this.arrayTiposOrtesis[0].value : '',
      otros: this.arrayOtros && this.arrayOtros.length ? this.arrayOtros[0].value : '',
      empresa_id: '',
      busine_id: this.dataForm.busine_id || null,
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
