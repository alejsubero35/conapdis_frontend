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
        <h3 class="title_section">LABORATORIO DE ORTESIS</h3>
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
                                color="success"
                                dark
                                @click="editar(item)"   
                                icon
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-pencil-circle-outline</v-icon>
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
     <ModalDelete
      @deleteData="deleteData"
      :titlemodal="titlemodal"
      :textbody="textbody"
      :dialogDelete="dialogDelete"
      @cerrarModal="cerrarModal"
    />

  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import bussinesModule from "@/store/modules/bussinesModule";
import extrasModule from "@/store/modules/extrasModule";
import storageData from "@/store/services/storageService";

@Component({
  components: {},
})
export default class Usuario extends Vue {
  @Prop() item?: Object;
  headers = [
    { text: "ID", value: "id" },
    { text: "Nombre del Laboratorio", value: "laboratory_name" },
    { text: "Dirección", value: "laboratory_address" },
/*     { text: "Estado", value: "estado_id" },
    { text: "Municipio", value: "municipio_id" },
    { text: "Parroquia", value: "parroquia_id" }, */
    { text: "Teléfonos", value: "laboratory_phone" },
    { text: "Tipo de Prótesis", value: "tipo_protesis" },
    { text: "Cédula Beneficiario", value: "beneficiary_identity_number" },
    { text: "Empresa", value: "busine_id" },
    { text: "Acciones", value: "actions" },
  ];


  [x: string]: unknown;
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
  dataFormDelete: object = {
    endpoint: 'ortesis-laboratories',
  };
  id_delete = "";
  snackbar = false;
  textmsj = "";
  color = "";
  timeout = 2000;
  label = "Buscar";
  per_page = 10;
  endpoint: string = 'ortesis-laboratories';
  options = {};
  textbody = "";
  titlemodal = "";
  $router: any;
  formPayment: any = {};
  dialogPayment = false;
    date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
  get FormRequestDelete(): any {
    return this.dataFormDelete;
  }
  openView() {
    this.$router.push({ name: "createortesislaboratories" });
  }

  eliminar(item) {
    this.dataFormDelete = {
      endpoint: this.endpoint,
      id: item.id,
    };
    this.dialogDelete = true;
    this.textbody = "Confirme que desea eliminar el registro";
    this.titlemodal = "Eliminar Registro";
  }
  async deleteData(event) {
    this.overlay = true;
    const res: any = await extrasModule.delete(this.FormRequestDelete);
    if (res.status == 200) {
      this.dialogDelete = event;
      this.dataIndexRequest();
      this.color = "success";
      this.textmsj = "Registro Eliminado con Éxito.";
      this.snackbar = true;
      this.closeSnackbar();
      this.overlay = false;
    }
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

  editar(item) {
    this.$router.push({
      name: "createortesislaboratories",
      params: { id: item.id },
    });
  }
  async dataIndexRequest() {
    this.overlay = true;
    const data: any = await extrasModule.getAll(this.endpoint);

    this.desserts = data.data.data;
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
