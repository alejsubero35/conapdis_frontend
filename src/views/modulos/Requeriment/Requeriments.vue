<template>
    <v-app>
        <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>

        <v-form class="form-container" 
            lazy-validation 
            ref="documents"
            enctype='multipart/form-data'
          >
            <TitleSection :sectiontitle="sectiontitle"/>
            <v-container v-if="documents.length > 0" >
                <v-layout  v-for="(doc,index) in documents" :key="index" row wrap >
                   <v-row>
                    <input type="hidden" v-model="doc.id">
                    <input type="hidden" v-model="doc.bussines_id">
                     <v-col cols="12" sm="6" md="4">
                        <v-text-field :disabled="disabled" label="Nombre Documento" placeholder="Nombre Documento" outlined dense :rules="rules" v-model="doc.title">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-menu
                            :close-on-content-click="true"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="doc.registration_date"
                                label="Fecha Vencimiento"
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                dense 
                                outlined
                                :rules="(doc.url == '') ? rules : Notrules"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="date"
                            @change="updateFecha(doc.id)"
                            no-title
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col v-if="doc.url == ''" cols="12" sm="6" md="4">
                        <v-file-input
                            :rules="(doc.is_required) ? rules : Notrules"
                            :disabled="(doc.approved == 1) ? disabledFile : !disabledFile"
                            accept="image/png, image/jpeg, application/pdf"
                            outlined 
                            dense
                            :label="(doc.approved == 1) ? 'Documento Adjuntado en Revisión' : placeholder"
                            @change="updateDocument(doc)"
                            v-model="doc.name"
                    
                        >
                     </v-file-input>
                    </v-col>
                    <v-col v-else cols="12" sm="6" md="4">
                         <v-chip
                            class="ma-1 mt-2 mb-5"
                            :href="doc.url" 
                            target="_blank"
                            :color="(doc.status == 'pending') ? 'warning' : 'green'"
                            text-color="white"
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
            <div v-if="documents.length > 0" class="mt-5 d-flex justify-end">
                <v-btn small @click="save" :disabled="disabledBtn" color="success">Guardar</v-btn> 
            </div>
        </v-form>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color"/>
    </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import sessionModule from '@/store/modules/sessionModule';
import documentModule from '@/store/modules/documentRequiredModule';
import { ValidationObserver } from 'vee-validate'
import storageData from '@/store/services/storageService'



@Component({
  components: {
 
  }
})
export default class Users extends Vue {
    [x: string]: unknown;
    value = ''
    label = 'prueba'
    overlay = false;
    show : Boolean =  false;
    bussines_id  = ''
    documentsForm = {

    }
    documents = []
 
    snackbar = false
    textmsj     = '' 
    sectiontitle = 'Cargar Documentos'
    visiblecustomers = false
    date = ''
    menu2 : boolean = false
    max25chars = (v: string | any[]) => v.length <= 25 || 'Input too long!'
    imageUrl : any = ''
    imageName : any = ''
    color = ''
    fileUpload = ''
    disabled = true
    disabledFile = true
    disabledBtn = false
    placeholder = 'Cargar Documento'
    data(){
        return{
            rules: [
                (v:any) => !!v || 'Campo requerido'
            ],
            Notrules: [
           
            ],
                
        }
    };

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

    async getDocuments(){
        this.overlay  = true
        const documents : any = await  documentModule.getDocumentsAll();
        this.documents = documents.data.data;
        this.overlay  = false
    }

    async save(){
        const valid = await this.$refs.documents.validate();
        delete this.FormRequestDocuments.name
        const events = []
        for(var i=0; i<this.FormRequestDocuments.length;i++){ 
            if(this.FormRequestDocuments[i].url == '' ){
                events.push(this.FormRequestDocuments[i])
            }  
        }
        console.log(events)
        if (valid) {
            this.saveDocuments(events)
        }
    }

    async saveDocuments(dataDoc) { 
    
        this.overlay  = true
        const data    = await documentModule.saveDocuments(dataDoc)  
        if(data.code == 201 ){
            this.textmsj  = 'Documentos Cargados con Éxito.'
            this.snackbar = true
            this.back();
            this.disabledBtn = true
            this.overlay  = false
        } else {
            
        }
     
    }
    async updateFecha(id_){
        let index  = this.documents.findIndex(({ id })  => id == id_)
        this.documents[index].registration_date = this.date
        this.documents[index].bussines_id = (storageData.get('bussines_id')) ? storageData.get('bussines_id') : this.getBussines.id
    }
    async updateDocument(doc){
        const _this = this
        var event = event || window.event;
        if(event.target.files != undefined && event.target.files.length == 1){
            let base64 = await this.getBase64(event.target.files[0],doc)  
        }
    }

    async getImgBase(imgbase64,doc,fileName){  
        let index  = this.documents.findIndex(({ id })  => id == doc.id)
        this.documents[index].file =  imgbase64; 
        this.documents[index].name =  fileName;     
    }
    getBase64(file,doc) { 
        const _this = this
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          _this.getImgBase(reader.result,doc,file) 
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    reset () {
        if (!this.$refs.documentsForm.validate()) {
            this.$refs.documentsForm.reset()
        }  
    };
    back() {
        setTimeout(() => {
            this.snackbar = false
        },2000);
    }
    mounted() {
        this.getDocuments()
        if(this.getBussines){
            storageData.set('bussines_id',this.getBussines.id)
        }

    }
}

</script>
<style lang="scss" scoped>
    .form-container{
        background-color: white;
        padding: 4%;
        border-radius: 5px;
    }
    .img_prev{
        float: right;
        margin-top: -20px;
        margin-right: 12px;
        border-radius: 5px;
        width:250px;
    } 
.v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--full-width > .v-input__control > .v-input__slot, .v-text-field--outlined > .v-input__control > .v-input__slot {
    align-items: stretch;
    min-height: 0px !important;
}
.text{
     align-items: stretch;
    min-height: 0px !important;
}
</style>

function imageBlob(arg0: string, imageBlob: any, arg2: string) {
  throw new Error('Function not implemented.');
}
