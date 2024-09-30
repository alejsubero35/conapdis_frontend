<template>
    <div>
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <v-row class="mt-5">
            <div  class="custom-input-file" >
                <input type="file" class="input-file"  id="uploadfiles" name="uploadfiles[]" ref="uploadfiles"  @change="getImgBase">
                <v-icon color="white">mdi-cloud-upload-outline</v-icon>
            </div>
        </v-row>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </div>
</template>
<script>
    import recepcionModule from '@/store/modules/recepcionModule';
    import cierreModule from '@/store/modules/cierreModule';
    import storageData from '@/store/services/storageService'
    import Draggable from 'vuedraggable'
    import {serialize} from 'jsonapi-fractal'
    export default {
        name: 'imageView',
        props:['id'],
        components:{
            Draggable
        },
        props:['recepcion_id','section'],
        data (){
            return {
                image:'',
                dataUpload:[],
                dataSubmit:{
                formdata : {},
                    id   : 0
                },
                overlay : false,
                snackbar : false,
                textmsj : '',
                color : '',
                showImage: false,
                isActive:'', 
                photoForm:{
                    photo_base64:'',
                    checkequipments:{
                        id:''
                    }
                },
                photoFormClose:{
                    photo_base64:'',
                    ticketclosures:{
                        id:''
                    }
                },
                photoFormDelete : {
                    id : '',
                    deletedAt : ''
                },              
            }
        },
        computed: {
            FormRequest() {
                if(this.section == 'recepcion'){
                    return serialize(this.photoForm,'checkequipmentphotos',{ relationships: ['checkequipments']});
                } else {
                    return serialize(this.photoFormClose,'ticketclosurephotos',{ relationships: ['ticketclosures']});  
                }
               
            },
            FormRequestDelete() {
                return serialize(this.photoFormDelete,'checkequipmentphotos',{});
            },
        },
        methods: { 
            urlImg: function(img){
                return URL.createObjectURL(img);
            },

            async getImgBase(){  
                const _this = this
                var event = event || window.event;
                let base64 = await this.getBase64(event.target.files[0])               
            },
            getBase64(file) {
                const _this = this
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    _this.uploadPhoto(reader.result)
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            },     
            async uploadPhoto(base64){
                if(this.section == 'recepcion'){
                    this.photoForm.photo_base64 = base64
                    this.photoForm.checkequipments.id = this.recepcion_id.toString()
                    const resphoto = await  recepcionModule.savePhotoEquipment(this.FormRequest)
                    if(resphoto){
                        this.textmsj = 'Foto Guardada con Éxito.'
                        this.snackbar = true
                        this.back()
                        this.addToPhotoGallery(base64,resphoto.id)
                    }
                } else {
                    this.photoFormClose.photo_base64 = base64
                    this.photoFormClose.ticketclosures.id = this.recepcion_id.toString()
                    const resphoto = await  cierreModule.savePhotoCloseCase(this.FormRequest)
                    if(resphoto){
                        this.textmsj = 'Foto Guardada con Éxito.'
                        this.snackbar = true
                        this.back()
                        this.addToPhotoGallery(base64,resphoto.id)
                    }
                }
            },
            addToPhotoGallery(dataURI,id) {
                const _this = this
                this.urltoFile(dataURI, id,'text/plain')
                .then(function(file){
                _this.dataUpload.push(file);
                _this.addToStoreFile(file)
                });
            },
            addToStoreFile(file){
                recepcionModule.addUploadFile(file)
            },
            urltoFile(url, filename, mimeType){
                return (fetch(url)
                    .then(function(res){return res.arrayBuffer();})
                    .then(function(buf){return new File([buf], filename,{type:mimeType});})
                );
            },
            async delImg(item,index){
                this.photoFormDelete.id = item.name
                this.photoFormDelete.deletedAt = this.currentDateDelete()
                const res  = await recepcionModule.deletePhotoEquipment(this.FormRequestDelete);
                
                if (res.status == 200) {
                    this.dataUpload.splice(index,1);
                    this.textmsj = 'Foto Eliminada con Éxito.'
                    this.snackbar = true
                    this.back()
                }
            },
            currentDateDelete() {
                var date = new Date();
                return  date.toISOString();
            },
            back() {
                setTimeout(() => {
                    this.snackbar = false
                },2000);
            }
        }
    }
</script>
<style scoped>
    *{margin:0 auto;padding:0;font-family:"Microsoft Yahei";}

    .mb-5{
        float: right;
    }
    @media screen and (max-width: 640px) {
        .image-view .view{
            display: grid;
        }
    }
    .moving-card {
        @apply opacity-50 bg-gray-100 border border-blue-500;
    }
    .main-item{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
    .custom-input-file {
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    margin: 0 auto 0;
    min-height: 15px;
    overflow: hidden;
    padding: 6px;
    position: relative;
    text-align: center;
    width: 200px;
    border-radius: 4px;
    }

    .custom-input-file .input-file {
    border: 10000px solid transparent;
    cursor: pointer;
    font-size: 10000px;
    margin: 0;
    opacity: 0;
    outline: 0 none;
    padding: 0;
    position: absolute;
    right: -1000px;
    top: -1000px;
    }
    .itemContainer{
        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
    }
    .item{
        display: flex;
        flex-direction: row;
        align-items: baseline;
        position:relative;
        float:left;
        height:100px;
        margin:20px 10px 0 0;
    
    }
    .image-view .item {
        position:relative;
        float:left;
        height:100px;
        margin:10px 10px 0 0;
    }
    .item .cancel-btn{
        position: absolute;
        right: -4px;
        top: -2px;
        display: block;
        width: 20px;
        height: 20px;
        color: #fff;
        line-height: 20px;
        text-align: center;
        background: red;
        border-radius: 5px;
        cursor: pointer;
    }
    .upload-box {
        border: 1px dashed #d6d6d6;
        border-radius: 4px;
        padding: 2px;
        width: 50%;
        height: 180px;
    }
    .img_prev{
        border: 1px solid #bdbdbd;
        border-radius: 5px;
    }
   
</style>