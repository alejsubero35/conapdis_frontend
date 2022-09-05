<template>
    <div style="display:flex;flex-wrap: wrap;justify-content:center">
        <div class="camera-box">
            <div style="display: flex; justify-content: center;">
                <img style="height: 25px;cursor:pointer" v-if="isCameraOpen"
                    src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
                    class="button-img camera-shoot" />
                <div class="camera-button">
                    <button type="button" class="button is-rounded cam-button"
                            style="background-color: white; border: 0px;cursor:pointer"
                            @click="toggleCamera"
                    >
                <span v-if="!isCameraOpen"><img style="height: 25px;" class="button-img"
                src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
                </span>
                    </button>
                </div>
            </div>
            <div class="image-front">
                <div v-if="isCameraOpen" class="camera-canvas">
                    <video ref="camera" :width="canvasWidth" :height="canvasHeight" autoplay></video>
                    <canvas v-show="false" id="photoTaken" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
                </div>
            </div>
            <div>
                <div  v-if="isCameraOpen" class="mt-2 mb-5 d-flex justify-center ">
                    <v-btn  small  @click="toggleCamera" color="warning" class="mr-3" ><v-icon>mdi-camera-off-outline</v-icon></v-btn>
                    <v-btn  small @click="capture" color="success"  ><v-icon>mdi-camera-plus-outline</v-icon></v-btn> 
                </div>
            </div>
        </div>
       <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
      <!--<vue-picture-swipe :items="items"></vue-picture-swipe> -->
    </div>
</template>
<script>
import recepcionModule from '@/store/modules/recepcionModule';
import cierreModule from '@/store/modules/cierreModule';
import {serialize} from 'jsonapi-fractal'
import VuePictureSwipe from 'vue-picture-swipe';
import storageData from '@/store/services/storageService'
export default {

    components: {
        VuePictureSwipe
    },
    props:['recepcion_id','section'],
    data() {
        return {
        isCameraOpen: false,
        canvasHeight:150,
        canvasWidth:150,
        dataUpload: [],
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
        snackbar : false,
        textmsj : '',
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
    methods:{
        toggleCamera() {
            if (this.isCameraOpen) {
                this.isCameraOpen = false;
                this.stopCameraStream();
            } else {
                this.isCameraOpen = true;
                this.startCameraStream();
            }
        },
        startCameraStream() {
            const constraints = (window.constraints = {
                audio: false,
                video: true
            });
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.$refs.camera.srcObject = stream;
                }).catch(error => {
                alert("Browser doesn't support or there is some errors." + error);
            });
        },
        stopCameraStream() {
            let tracks = this.$refs.camera.srcObject.getTracks();
            tracks.forEach(track => {
                track.stop();
            });
        },
       async capture() {
            const FLASH_TIMEOUT = 50;
            let self = this;
            setTimeout(() => {
                const context = self.$refs.canvas.getContext('2d');
                context.drawImage(self.$refs.camera, 0, 0, self.canvasWidth, self.canvasHeight);
                const dataUrl = self.$refs.canvas.toDataURL("image/png");
                /* self.addToPhotoGallery(dataUrl,45); */
                self.uploadPhoto(dataUrl);
                self.isCameraOpen = false;
                self.stopCameraStream();
            }, FLASH_TIMEOUT);
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
        urlImg: function(img){
            return URL.createObjectURL(img);
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
   
        generateCapturePhotoName(){
            return  Math.random().toString(36).substring(2, 15)
        },
        dataURLtoFile(dataURL, filename) {
            let arr = dataURL.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
        
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type: mime});
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
.camera-box {
  border: 1px dashed #d6d6d6;
  border-radius: 4px;
  padding: 2px;
  width: 50%;
}
.image-front{
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin:10px 10px 0 0;
 
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
.img_prev{
    border: 1px solid #bdbdbd;
    border-radius: 5px;
}

</style>

