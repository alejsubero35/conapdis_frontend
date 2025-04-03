<template>
  <v-row class="principal_container">
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
        class="laoding"
      ></v-progress-circular>
    </v-overlay>

    <ButtonOpen @openView="openView" :title="title" />

    <div class="title">
      <v-col cols="12" md="12" sm="12" xs="12">
        <h3 class="title_section">LISTADO DE SOLICITUD FORMACIÓN</h3>
        <br />
      </v-col>
    </div>
    <v-col cols="12">
      <template>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :options.sync="options"
          :itemsPerPage="per_page"
          :footer-props="{
            'items-per-page-text': 'Filtro por Página',
          }"
        >
          <template v-slot:item.status="{ item }">
            <template class="task">
              <v-btn :color="getColor(item.status)" dark rounded x-small>
                {{ item.status }}
              </v-btn>
            </template>
          </template>
          <template v-slot:item.action="{ item }">
            <div v-if="item.payment_proccesed == 1" class="d-flex">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    dark
                    @click="ver(item)"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-eye-outline</v-icon>
                  </v-btn>
                </template>
                <span>Ver Solicitud de Formación</span>
              </v-tooltip>
              <v-tooltip
                v-if="
                  !(item.status === 'Negada' || item.status === 'Pendiente')
                "
                top
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="info"
                    dark
                    @click="asistencias(item)"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-account-multiple-plus-outline</v-icon>
                  </v-btn>
                </template>
                <span>Ver Asistencias</span>
              </v-tooltip>
              <v-tooltip v-if="item.attendances.length > 0" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="warning"
                    dark
                    @click="evaluarformacion(item)"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-check-decagram-outline</v-icon>
                  </v-btn>
                </template>
                <span>Evaluar Formación</span>
              </v-tooltip>
              <v-tooltip v-if="item.available_download != 0" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="error"
                    dark
                    @click="downloadCertificates(item)"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-printer</v-icon>
                  </v-btn>
                </template>
                <span>Descargar Certificados</span>
              </v-tooltip>
            </div>
            <div v-else class="d-flex">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    @click="paymentInLine(item)"
                    x-small
                    rounded
                    >PROCESAR PAGO
                    <v-icon>mdi-credit-card-outline</v-icon>
                  </v-btn>
                </template>
                <span>Pago en Línea</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </template>
    </v-col>
    <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color" />
    <v-dialog v-model="dialogPayment" width="700">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Procesar Pago
        </v-card-title>

        <v-card-text class="pa-5">
          <v-row>
            <v-col cols="4">
              <v-subheader>Banco Emisor</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-select
                :items="bankArray"
                item-text="nombre"
                item-value="codigo"
                outlined
                dense
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="4">
              <v-subheader>Monto</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                dense
                outlined
                v-model="formPayment.amount_payment"
                type="number"
                min="0"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="4">
              <v-subheader>Nombres y Apellidos</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field dense outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="4">
              <v-subheader>Cédula</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                dense
                outlined
                type="number"
                min="0"
                v-model="formPayment.identity_card"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="4">
              <v-subheader>Teléfono</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field dense outlined type="number"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="4">
              <v-subheader>Correo</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field dense outlined type="email"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-end">
          <v-btn color="error" text @click="dialogPayment = false">
            Cerrar
          </v-btn>

          <v-btn color="primary" text @click="procesedPayment()">
            Pagar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import formacionModule from "@/store/modules/formacionModule";
import storageData from "@/store/services/storageService";

@Component({
  components: {},
})
export default class Usuario extends Vue {
  @Prop() item?: Object;
  headers = [
    { text: "Id", value: "id" },
    { text: "Fecha ", value: "proposed_date" },
    { text: "Taller", value: "workshop.description" },
    { text: "Responsable", value: "responsible" },
    { text: "Cantidad", value: "number_of_participants" },
    { text: "Status", value: "status" },
    { text: "Acciones", value: "action" },
  ];
  section: string = "Usuarios";
  overlay = false;
  desserts: any = [];
  search: String = "";
  selected: Object = [];
  loadTable: boolean = true;
  clientes: any = [];
  dialog: boolean = false;
  dialogDelete: boolean = false;
  title: string = "AÑADIR SOLICITUD";
  tituloModal: string = "";
  dataEditForm: object = {};
  id_delete = "";
  snackbar = false;
  textmsj = "";
  color = "";
  timeout = 2000;
  label = "Buscar Solicitud";
  moduleStore = formacionModule;
  per_page = 10;
  endpoint: string = "users";
  options = {};
  textbody = "";
  titlemodal = "";
  $router: any;
  formPayment: any = {};
  dialogPayment = false;
  bankArray = [
    {
      codigo: "0001",
      nombre: "Banco Central de Venezuela",
      rif: "G200001100",
    },
    {
      codigo: "0102",
      nombre: "Banco de Venezuela",
      rif: "G200099976",
    },
    {
      codigo: "0104",
      nombre: "Banco Venezolano de Crédito",
      rif: "J000029709",
    },
    {
      codigo: "0105",
      nombre: "Banco Mercantil",
      rif: "J000029610",
    },
    {
      codigo: "0108",
      nombre: "BBVA Provincial",
      rif: "J000029679",
    },
    {
      codigo: "0114",
      nombre: "Bancaribe",
      rif: "J000029490",
    },
    {
      codigo: "0115",
      nombre: "Banco Exterior",
      rif: "J000029504",
    },
    {
      codigo: "0128",
      nombre: "Banco Caroní",
      rif: "J095048551",
    },
    {
      codigo: "0134",
      nombre: "Banesco",
      rif: "J070133805",
    },
    {
      codigo: "0137",
      nombre: "Banco Sofitasa",
      rif: "J090283846",
    },
    {
      codigo: "0138",
      nombre: "Banco Plaza",
      rif: "J002970553",
    },
    {
      codigo: "0146",
      nombre: "Bangente",
      rif: "J301442040",
    },
    {
      codigo: "0151",
      nombre: "BFC Banco Fondo Común",
      rif: "J000723060",
    },
    {
      codigo: "0156",
      nombre: "100% Banco",
      rif: "J085007768",
    },
    {
      codigo: "0157",
      nombre: "DELSUR Banco Universal",
      rif: "J000797234",
    },
    {
      codigo: "0163",
      nombre: "Banco Del Tesoro",
      rif: "G200051876",
    },
    {
      codigo: "0166",
      nombre: "Banco Agrícola de Venezuela",
      rif: "G200057955",
    },
    {
      codigo: "0168",
      nombre: "Bancrecer",
      rif: "G200068973",
    },
    {
      codigo: "0169",
      nombre: "Mi Banco",
      rif: "J315941023",
    },
    {
      codigo: "0171",
      nombre: "Banco Activo",
      rif: "J080066227",
    },
    {
      codigo: "0172",
      nombre: "Bancamiga",
      rif: "J316287599",
    },
    {
      codigo: "0173",
      nombre: "Banco Internacional de Desarrollo",
      rif: "J294640109",
    },
    {
      codigo: "0174",
      nombre: "Banplus",
      rif: "J000423032",
    },
    {
      codigo: "0175",
      nombre: "Banco Bicentenario del Pueblo",
      rif: "G200091487",
    },
    {
      codigo: "0177",
      nombre: "Banfanb",
      rif: "G200106573",
    },
    {
      codigo: "0191",
      nombre: "Banco Nacional de Crédito (BNC)",
      rif: "J309841327",
    },
    {
      codigo: "0601",
      nombre: "Instituto Municipal de Crédito Popular",
      rif: "G200068973",
    },
  ];
  getColor(item) {
    if (item == "Pendiente") {
      return "warning";
    } else if (item == "Negada") {
      return "error";
    } else {
      return "success";
    }
  }
  openView() {
    this.$router.push({ name: "crearsolicitudformacion" });
  }
  ver(item) {
    this.$router.push({
      name: "versolicitudformacion",
      params: { id: item.id },
    });
  }
  asistencias(item) {
    this.$router.push({ name: "crearasistencia", params: { id: item.id } });
  }
  Delete(id) {
    this.dialogDelete = true;
    this.textbody = "Confirme que desea eliminar la solicitud";
    this.titlemodal = "Eliminar Registro de Solicitud";
    this.id_delete = id;
  }
  cerrarModal(event) {
    this.dialogDelete = event;
  }
  async evaluarformacion(item) {
    this.$router.push({ name: "trainingevaluation", params: { id: item.id } });
  }
  async downloadCertificates(item) {
    const data: any = await formacionModule.downloadCertificate(item.id);
  }
  async paymentInLine(item) {
    console.log(item);
    this.dialogPayment = true;
    this.formPayment.amount_payment = item.workshop_amount;
  }
  async procesedPayment() {
    this.overlay = true;
    this.dialogPayment = false;
    this.snackbar = true;
    this.textmsj = "Su pago será revisado y le notificaremos";
    this.color = "warning";
    this.closeSnackbarpayment();
  }
  closeSnackbar() {
    setTimeout(() => {
      this.snackbar = false;
    }, 2000);
  }
  closeSnackbarpayment() {
    setTimeout(() => {
      this.snackbar = false;
      this.overlay  = false;
    }, 3000);
  }
  handleDataUser(event) {
    this.desserts = event;
    this.loadTable = false;
  }
  currentDate() {
    var date = new Date();
    return date.toISOString();
  }

  viewPDF(id) {
    this.$router.push({
      name: "planillaboletaordenamiento",
      params: { id: id },
    });
  }
  async dataIndexRequest() {
    this.overlay = true;
    const data: any = await formacionModule.getRequestAll(
      storageData.get("_bussines_id")
    );

    // Ordenar los datos de forma descendente por el ID
    data.data.sort((a, b) => b.id - a.id);

    this.desserts = data.data;
    this.overlay = false;
  }

  mounted() {
    this.dataIndexRequest();
  }
}
</script>
<style lang="scss" scoped>
::v-deep .table-one {
  thead.v-data-table-header {
    tr {
      &:hover {
        background-color: #f2f3f8;
      }
      th {
        span {
          font-size: 16px;
          color: #304156;
        }
      }
    }
    tr {
      td {
        padding-bottom: 20px;
        padding-top: 20px;
      }
    }
  }
  tbody {
    tr {
      &:hover {
        background-color: #f2f3f8 !important;
      }
    }
  }
}
.loading {
  z-index: 210;
}
.principal_container {
  background-color: white;
  padding: 15px;
  border-radius: 13px;
  margin: 0;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
}
</style>
