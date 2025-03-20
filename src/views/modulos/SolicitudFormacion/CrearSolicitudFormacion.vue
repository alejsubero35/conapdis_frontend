<template>
  <div class="content-section">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-form class="form_data_section" ref="dataForm" lazy-validation>
      <TitleSection :sectiontitle="sectiontitle" />
      <input type="hidden" v-model="dataForm.id" />
      <v-row class="mt-5 p-3">
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Empresa"
            placeholder="Empresa"
            outlined
            dense
            v-model="empresaname"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            :items="workshops"
            item-text="description"
            item-value="id"
            label="Taller"
            placeholder="Taller"
            @change="getWorkshop($event)"
            outlined
            dense
            :rules="rules"
            required
            return-object
          ></v-select>
        </v-col>
        <v-col v-show="amount" cols="12" sm="4" md="3">
          <v-text-field
            label="Monto por Participante"
            placeholder="Monto por Participante"
            outlined
            dense
            readonly
            v-model="amount_participant"
            prefix="$"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <v-text-field
            label="Responsable Solicitud"
            placeholder="Responsable Solicitud"
            outlined
            dense
            :rules="rules"
            v-model="dataForm.responsible"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <v-text-field
            label="Teléfono Responsable Solicitud"
            placeholder="Teléfono Responsable Solicitud"
            outlined
            dense
            :rules="rules"
            v-model="dataForm.phone_number"
            type="number"
            min="0"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <v-text-field
            label="Cantidad Participantes"
            placeholder="Cantidad Participantes"
            outlined
            dense
            :rules="rulesNum"
            v-model="dataForm.number_of_participants"
            type="number"
            min="0"
            @input="calculateAmount()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            :items="invitedInstitutions"
            item-text="text"
            item-value="value"
            label="Instituciones Invitadas"
            placeholder="Instituciones Invitadas"
            v-model="dataForm.invited_institutions"
            outlined
            dense
            :rules="rules"
            required
            @change="getInvited($event)"
          ></v-select>
        </v-col>
        <v-col v-show="cantInvited" cols="12" sm="4" md="3">
          <v-text-field
            label="Nombre de la Institución"
            placeholder="Nombre de la Institución"
            outlined
            dense
            v-model="dataForm.name_institution"
            type="text"
          ></v-text-field>
        </v-col>
        <v-col v-show="cantInvited" cols="12" sm="4" md="3">
          <v-text-field
            label="Cantidad Personas Invitadas"
            placeholder="Cantidad Personas Invitadas"
            outlined
            dense
            v-model="dataForm.invited_people_number"
            type="number"
            min="0"
            @input="calculateAmountInvited()"
            :rules="(cantInvited) ? rules : Notrules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="3">
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
        <v-col cols="12" sm="4" md="3">
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
        <v-col cols="12" sm="4" md="3">
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
        <v-col cols="12" sm="6" md="3">
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
                v-model="date"
                label="Fecha Prop. Formación"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                dense
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              locale="es"
              @input="menu2 = false"
              @change="updateFecha()"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <v-text-field
            label="Hora Inicio"
            placeholder="Hora Inicio"
            outlined
            dense
            :rules="rules"
            v-model="dataForm.start_time"
            type="time"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <v-text-field
            label="Hora fin"
            placeholder="Hora fin"
            outlined
            dense
            :rules="rules"
            v-model="dataForm.end_time"
            type="time"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Punto de Referencia"
            placeholder="Punto de Referencia"
            outlined
            dense
            :rules="rules"
            v-model="dataForm.benchmark"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            :items="tipozona"
            item-text="text"
            item-value="value"
            label="Tipo de Zona"
            placeholder="Tipo de Zona"
            v-model="dataForm.zona"
            outlined
            dense
            :rules="rules"
            required
            @change="setItem()"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="8" md="3">
          <v-textarea
            label="Dirección"
            placeholder="Dirección"
            outlined
            dense
            :rules="rules"
            v-model="dataForm.address"
            rows="3"
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <v-text-field
            label="Monto Total del Taller"
            placeholder="Monto Total del Taller"
            dense
            v-model="dataForm.workshop_amount"
            type="number"
            readonly
            prepend-inner-icon="mdi-currency-usd"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <h4>Requerimientos Disponibles</h4>
          <hr />
          <v-container class="d-flex justify-content-around flex-wrap">
            <v-checkbox
              v-for="req in arrayRequirements"
              :key="req.id"
              v-model="checkboxModel"
              :value="req.id"
              :label="req.name"
              class="req"
            />
          </v-container>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <v-textarea
            label="Observaciones"
            placeholder="Obse|rvaciones"
            outlined
            dense
            :rules="rules"
            v-model="dataForm.observation"
            rows="3"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center p-5">
        <v-btn @click="onSubmit" color="primary" small>Guardar</v-btn>
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
import { ValidationObserver } from "vee-validate";
import storageData from "@/store/services/storageService";

@Component({
  components: {},
})
export default class EditarCliente extends Vue {
  [x: string]: unknown;
  listPrice?: any = [];
  pricelist_id = "";
  condicionespago?: any = [];
  overlay = false;
  title: string = "";
  subtitle: string = "";
  tipozona = [
    { value: "Rural", text: "Rural" },
    { value: "Turistica", text: "Turistica" },
    { value: "Urbana", text: "Urbana" },
  ];
  invitedInstitutions = [
    { value: "si", text: "Si" },
    { value: "no", text: "No" },
  ];

  btName = "Guardar";
  snackbar = false;
  textmsj = "";
  color = "";
  timeout = 2000;
  sectiontitle = "AÑADIR SOLICITUD DE FORMACIÓN";
  dialog = false;
  openDialog = false;
  textbody = "";
  titleModalDelete = "";
  date = "";
  menu2: boolean = false;
  max25chars = (v) => v.length <= 25 || "Input too long!";
  dataForm: any = {
    status: "Pendiente",
    date_request: this.date,
  };
  workshops = [];
  arrayStates = [];
  arrayMunicipality = [];
  arrayParishes = [];
  empresaname = "";
  cantInvited = false;
  arrayRequirements: any = [];
  checkboxModel = [];
  amount = false;
  amount_participant = 0;
  totalamount = 0;
  $refs!: {
    dataForm: InstanceType<typeof ValidationObserver>;
  };
  get FormRequest(): any {
    return this.dataForm;
  }
  async getInvited(event) {
  if(this.dataForm.number_of_participants != undefined){
    if (event == "si") {
          this.cantInvited = true;
        } else {
          this.cantInvited = false;
        }
      }else{
        this.textmsj = "El Campo cantidad de participantes NO puede estar vacio.";
        this.color = "warning";
        this.snackbar = true;
        this.backError();
        this.dataForm.invited_institutions = ''
      }
  }
   
  updateFecha() {
    this.dataForm.proposed_date = this.date;
    this.dataForm.date_request = this.date;
  }
  async getWorkshop(event) {
    this.dataForm.workshop_id = event.id;
    this.amount = true;
    this.amount_participant = event.amount_by_participant;
    this.calculateAmount();
  }
  async calculateAmount() {
    if (this.amount_participant == 0) {
      this.textmsj = "Debe Seleccionar un Taller.";
      this.color = "warning";
      this.snackbar = true;
      this.backError();
      this.dataForm.number_of_participants = "";
      this.dataForm.workshop_amount = "";
    } else {
      this.dataForm.workshop_amount =
        parseFloat(this.dataForm.number_of_participants) *
        this.amount_participant;
    }

  }

  async calculateAmountInvited(){
    if(this.dataForm.invited_people_number > 0){
      this.dataForm.workshop_amount = (parseFloat(this.dataForm.invited_people_number) + parseFloat(this.dataForm.number_of_participants)) * this.amount_participant;
    }else{
      this.dataForm.workshop_amount = parseFloat(this.dataForm.number_of_participants) * this.amount_participant;
    }
  }
  onSubmit() {
    this.dataForm.arrayRequirement = this.checkboxModel;
    console.log(this.dataForm);
    const valid: any = this.$refs.dataForm.validate();

    if (valid) {
      this.save();
    } else {
      this.dialog = true;
    }
  }
  async save() {
    this.overlay = true;
    const data = await formacionModule.save(this.FormRequest);

    if (data.code == 200 || data.code == 201) {
      this.textmsj = "solicitud de Formación Creada con Éxito.";
      this.color = "success";
      this.snackbar = true;
      this.back();
      this.overlay = false;
    } else {
      this.textmsj = "Error al crear la Solicitud.";
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
  async comboboxAll() {
    const typeWorkshops: any = await formacionModule.getWorkshopsAll();
    this.workshops = typeWorkshops.data;
  }
  async getStates() {
    const states: any = await bussinesModule.getStatesAll();
    this.arrayStates = states.data.data;
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
  async getRequirementTrainig() {
    const requirement: any = await formacionModule.getRequirementTrainigAll();
    this.arrayRequirements = requirement;
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
  mounted() {
    this.comboboxAll();
    this.getStates();
    this.getRequirementTrainig();
    this.dataForm.empresa_id = storageData.get("_bussines").id;
    this.empresaname =
      storageData.get("_bussines").rif +
      "-" +
      storageData.get("_bussines").company_name;
    this.dataForm.proposed_date = this.date;
    this.dataForm.date_request = this.date;
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
