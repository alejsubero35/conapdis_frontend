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
        <h3 class="title_section">INTERPRETES</h3>
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

           <template v-slot:item.actions="{ item }">
                <div class="d-flex">
                    <v-tooltip top>
                        <template v-slot:activator="{on, attrs}">
                            <v-btn
                                color="error"
                                dark
                                @click="editar(item)"   
                                icon
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-edit-circle-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Editar</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{on, attrs}">
                            <v-btn
                                color="error"
                                dark
                                @click="eliminar(item)"   
                                icon
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-delete-circle-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Eliminar</span>
                    </v-tooltip>
                </div>
            </template>
        </v-data-table>
      </template>
    </v-col>
    <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color" />

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
  title: string = "NUEVO";
  tituloModal: string = "";
  dataEditForm: object = {};
  id_delete = "";
  snackbar = false;
  textmsj = "";
  color = "";
  timeout = 2000;
  label = "Buscar";
  moduleStore = formacionModule;
  per_page = 10;
  endpoint: string = "users";
  options = {};
  textbody = "";
  titlemodal = "";
  $router: any;
  formPayment: any = {};
  dialogPayment = false;
    date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
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
    this.$router.push({ name: "create" });
  }

  Delete(id) {
    this.dialogDelete = true;
    this.textbody = "Confirme que desea eliminar";
    this.titlemodal = "Eliminar Registro";
    this.id_delete = id;
  }
  cerrarModal(event) {
    this.dialogDelete = event;
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
    //this.dataIndexRequest();
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
