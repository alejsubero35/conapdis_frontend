<template>
  <v-app>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-form
      class="form-container"
      lazy-validation
      ref="documents"
      enctype="multipart/form-data"
    >
      <TitleSection :sectiontitle="sectiontitle" />
    <!--   <v-container>
        <v-layout>
             <v-row>
              <v-col cols="12" sm="12" md="8">
                <v-card class="mb-5" outlined>
                  <v-card-title class="headline">Documentos Cargados</v-card-title>
                  <v-data-table
                    :headers="[
                      { text: 'Nombre', value: 'title' },
                  { text: 'Fecha de carga', value: 'registration_date' },
                  { text: 'Documento', value: 'file_url', sortable: false }
                ]"
                :items="documentsload"
                class="elevation-1"
                :loading="overlay"
                loading-text="Cargando documentos..."
                dense
              >
                <template v-slot:item.file_url="{ item }">
                  <v-btn v-if="item.file_url" :href="item.file_url" target="_blank" icon color="primary">
                    <v-icon>mdi-file-eye</v-icon>
                  </v-btn>
                  <span v-else class="grey--text">No disponible</span>
                </template>
              </v-data-table>
            </v-card>
              </v-col>
            </v-row>
         
        </v-layout>
      </v-container> -->
      <v-container v-if="documents.length > 0" class="mt-5">
        <v-layout v-for="(doc, index) in documents" :key="index" row wrap>
          <v-row>
            <input type="hidden" v-model="doc.id" />
            <input type="hidden" v-model="doc.bussines_id" />
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :disabled="disabled"
                label="Nombre Documento"
                placeholder="Nombre Documento"
                outlined
                dense
                :rules="rules"
                v-model="doc.title"
              >
              </v-text-field>
            </v-col>

            <v-col v-if="doc.file_url == '' || doc.file_url == null" cols="12" sm="6" md="4">
              <v-file-input
                :rules="doc.is_required == 1 ? rules : Notrules"
                :disabled="doc.approved == 1 ? disabledFile : !disabledFile"
                accept=".pdf,.jpg,.png,.jpeg"
                outlined
                dense
                :label="
                  doc.approved == 1
                    ? 'Documento Adjuntado en Revisión'
                    : placeholder
                "
                @change="updateDocument(doc)"
                v-model="doc.name"
              >
              </v-file-input>
              <span
                class="d-flex justify-end"
                style="margin-top: -25px; color: #4b4b4b"
                >{{ validation }} |
                {{ doc.max_size.substring(0, doc.max_size.length - 6) }}
                MB</span
              >
            </v-col>
            <v-col v-else cols="12" sm="6" md="4">
              <v-chip
                class="ma-1 mt-2 mb-5"
                :href="doc.file_url"
                target="_blank"
                :color="doc.status == 'pending' ? 'warning' : 'green'"
                text-color="white"
                style="width: 100%; cursor: pointer"
              >
                {{ doc.title }}
              </v-chip>
            </v-col>
          </v-row>
        </v-layout>
      </v-container>
      <v-container v-else>
        <h1 class="text-center">No hay documentos requeridos</h1>
      </v-container>
      <div class="mt-5 d-flex justify-end">
        <v-btn small @click="save"  color="success"
          >Guardar
        </v-btn>
      </div>
    </v-form>
    <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color" />
    <Alertas
      :data="dataModalAlert"
      :dialogOpen="dialogOpen"
      v-on:cerrarModal="closeModal"
    />
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import sessionModule from "@/store/modules/sessionModule";
import documentModule from "@/store/modules/documentRequiredModule";
import { ValidationObserver } from "vee-validate";
import storageData from "@/store/services/storageService";

@Component({
  components: {},
})
export default class RequerimentsDocuments extends Vue {
  [x: string]: unknown;
  value = "";
  label = "prueba";
  validation = "(Solo png,jpg,jpeg,pdf)";
  overlay = false;
  show: Boolean = false;
  bussines_id = "";
  documentsForm = {};
  documents = [];

  snackbar = false;
  textmsj = "";
  sectiontitle = "Cargar Documentos";
  visiblecustomers = false;
  date = "";
  menu2: boolean = false;
  max25chars = (v: string | any[]) => v.length <= 25 || "Input too long!";
  imageUrl: any = "";
  imageName: any = "";
  color = "";
  fileUpload = "";
  disabled = true;
  disabledFile = true;
  disabledBtn = false;
  placeholder = "Cargar Documento";
  dataModalAlert = "";
  dialogOpen = false;
  tempDoc = {};
  arrayExtension = ["pdf", "jpg", "png", "jpeg", "PNG"];
  dateP = new Date().toISOString().substr(0, 10);
  todayDate = this.getTodayDate();

  getTodayDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  max = new Date(Date.now() - 315569260000).toISOString().substr(0, 10);
  arrayDates = [];
  disablePastDates(val) {
    return val >= new Date().toISOString().substr(0, 10);
  }
  data() {
    return {
      rules: [
        (v: any) => !!v || "Campo requerido",
        //value => !value || value.size < 100000 || 'El archivo excede el tamaño permitido',
      ],
      Notrules: [],
    };
  }

  get FormRequestDocuments(): any {
    return this.documents;
  }
  get getBussines() {
    return sessionModule.getBussines;
  }

  $refs!: {
    [x: string]: any;
    documents: InstanceType<typeof ValidationObserver>;
  };

  async getDocuments() {
    this.overlay = true;
    const documents: any = await documentModule.getDocumentsAll(storageData.get("_bussines").id);
 /*    console.log(documents, 'aquii')
     const loaddocuments: any = await documentModule.getRequiredDocuments(
     storageData.get("_bussines").id
    ); */
 /*    console.log(loaddocuments)
    this.documentsload = loaddocuments.data.required_documents */
;
    this.documents = documents.data.documents.filter(
      (doc: any) => doc.visibility_in === 2
    );
    this.validateBtn();
    this.overlay = false;
  }

  async save() {
    console.log(this.FormRequestDocuments)
    const valid = await this.$refs.documents.validate();
    delete this.FormRequestDocuments.name;
    const events = [];
    for (var i = 0; i < this.FormRequestDocuments.length; i++) {
      if (
        this.FormRequestDocuments[i].file_url == "" &&
        this.FormRequestDocuments[i].bussines_id != undefined
      ) {
        events.push(this.FormRequestDocuments[i]);
      }
    }
    if (events.length > 0) {
      if (valid) {
        this.saveDocuments(events);
      }
    }
  }

  async saveDocuments(dataDoc) {
    this.overlay = true;
    const data = await documentModule.saveDocuments(dataDoc);
    if (data.code == 200 || data.code == 201) {
      this.textmsj = "Documentos Cargados con Éxito.";
      this.color = "success";
      this.snackbar = true;
      //await sessionModule.updateStatusBussines('inspection_request')
      this.back();
      //  this.disabledBtn = true
      this.overlay = false;
    } else {
    }
  }
  async updateFecha(id_) {
    let index = this.documents.findIndex(({ id }) => id == id_);
    this.documents[index].registration_date = this.date;
    if (storageData.get("_bussines")) {
      this.documents[index].bussines_id = storageData.get("_bussines")
        ? storageData.get("_bussines").id
        : this.getBussines.id;
    } else {
      await sessionModule.redirectLogin();
    }
  }
  async updateDocument(doc) {
    let index = this.documents.findIndex(({ id }) => id == doc.id);
    const _this = this;
    var event = event || window.event;

    if (event.target.files != undefined) {
       this.documents[index].bussines_id = storageData.get("_bussines")
        ? storageData.get("_bussines").id
        : this.getBussines.id;
        this.documents[index].registration_date = this.todayDate;
      if (event.target.files.length > 0) {
        if (
          event.target.files[0].type === "image/png" ||
          event.target.files[0].type === "image/jpg" ||
          event.target.files[0].type === "image/jpeg" ||
          event.target.files[0].type === "application/pdf"
        ) {
          if (event.target.files[0].size < this.documents[index].max_size) {
            if (
              event.target.files[0] != undefined &&
              event.target.files.length == 1
            ) {
              let base64 = await this.getBase64(event.target.files[0], doc);
            }
          } else {
            this.dialogOpen = true;
            this.dataModalAlert = "El Documento excede el tamaño permitido";
            this.backClear(doc);
          }
        } else {
          this.dialogOpen = true;
          this.dataModalAlert = "Extensión NO permitida";
          this.backClear(doc);
          return false;
        }
      }
    }
  }


  getBase64(file, doc) {
    const _this = this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      _this.getImgBase(reader.result, doc, file);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    return true;
  }

  async getImgBase(imgbase64, doc, fileName) {
    let index = this.documents.findIndex(({ id }) => id == doc.id);
    this.documents[index].file = imgbase64;
    this.documents[index].name = fileName;
    console.log(this.documents)
  }
  closeModal() {
    this.dialogOpen = false;
  }
  reset() {
    if (!this.$refs.documentsForm.validate()) {
      this.$refs.documentsForm.reset();
    }
  }
  back() {
    setTimeout(() => {
      this.snackbar = false;
      this.$router.push({ name: "Dashboard" });
    }, 2000);
  }
  backClear(doc) {
    setTimeout(() => {
      doc.name = null;
    }, 1500);
  }
  async validateBtn() {
    const events = [];
    for (var i = 0; i < this.FormRequestDocuments.length; i++) {
      if (this.FormRequestDocuments[i].url == "") {
        events.push(this.FormRequestDocuments[i]);
      }
    }
    if (events.length > 0) {
      this.disabledBtn = false;
    } else {
      this.disabledBtn = true;
    }
  }
  mounted() {
    if (storageData.get("_bussines")) {
      this.getDocuments();
    }
  }
}
</script>
<style lang="scss" scoped>
.form-container {
  background-color: white;
  padding: 4%;
  border-radius: 5px;
}
.img_prev {
  float: right;
  margin-top: -20px;
  margin-right: 12px;
  border-radius: 5px;
  width: 250px;
}
.v-text-field--filled > .v-input__control > .v-input__slot,
.v-text-field--full-width > .v-input__control > .v-input__slot,
.v-text-field--outlined > .v-input__control > .v-input__slot {
  align-items: stretch;
  min-height: 0px !important;
}
.text {
  align-items: stretch;
  min-height: 0px !important;
}
</style>

function imageBlob(arg0: string, imageBlob: any, arg2: string) { throw new
Error('Function not implemented.'); }
