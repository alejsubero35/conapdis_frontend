<template>
    <div>
        <div class="title"> 
            <v-col class="content_section" cols="12" sm="12" md="12">
                <h4 class="title_section">{{ sectiontitle }}</h4><br>
                <v-btn class="btn_atras mx-2" fab dark x-small outlined color="indigo mr-3" @click="back()">
                    <v-icon color="white" lef>mdi-arrow-left</v-icon>
                </v-btn>
            </v-col>
    
        </div>
    </div>
</template>
<script>

export default {
    props:['sectiontitle'],
    data(){
        return{

        }
    },
    
    methods: {
        back(){
            this.$router.go(-1);
        }
    }    
}
</script>
<style lang="scss" scoped>

.title{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    background-color: #3f51b5;
    color: white;
    height: 64px;
    border-radius: 5px;
    margin-bottom: 5%;
}
.btn_atras{
    background-color: #3f51b5;
    border: #3f51b5;
}
.title_section{
    color:#ffff;
    font-size: 20px;
    margin-top: 7px;
}
.content_section{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    .btn_atras{
  
        
    }
    .title{
            padding-right: 58px !important;
    }
}
</style>