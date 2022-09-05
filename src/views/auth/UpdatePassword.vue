<template>
    <v-app>
        <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <v-form class="form-container" 
            ref="usersFormPassword"
            lazy-validation 
          >
            <TitleSection :sectiontitle="sectiontitle"/>
            <v-container >
                <v-layout row wrap >
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field    :type="show ? 'text' : 'password'"  label="Password" placeholder="Password" outlined dense :rules="rules" v-model="usersFormPassword.password"  @click:append="show = !show">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"   :type="show ? 'text' : 'password'"  label="Password Confirmation" placeholder="Password Confirmation" outlined dense  :rules="[(usersFormPassword.password === usersFormPassword.password_confirmation) || 'confirmación Incorrecta ']" v-model="usersFormPassword.password_confirmation"  @click:append="show = !show">
                        </v-text-field>
                    </v-col>
                </v-layout>
            </v-container>
            <div class="mt-5 d-flex justify-end ">
                <v-btn small color="primary mr-3" @click="reset">Limpiar</v-btn>
                <v-btn small @click="submitUpdatePassword" color="success"  >Guardar</v-btn> 
            </div>
        </v-form>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import usersModule from '@/store/modules/usersModule';
import sessionModule from '@/store/modules/sessionModule';
import { ValidationObserver } from 'vee-validate'
import { serialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class Users extends Vue {

    overlay = false;
    show : Boolean =  false;
    usersFormPassword = {
       user_id : '' ,
       password : '',
       password_confirmation : ''
    }
    snackbar = false
    textmsj     = '' 
    sectiontitle = 'Actualización de Contraseña'
    dialog = false
  
    data(){
    return{
        rules: [
            (v:any) => !!v || 'Campo requerido'
        ],
        emailRules: [
			v => !!v || 'E-mail is requerido',
			v => /.+@.+/.test(v) || 'E-mail must be valid',
		],  
            
        }
    };

    get getUserId() {
        return sessionModule.getUserId; 
    }

    get FormRequestUpdatePassword(): any {
        return serialize(this.usersFormPassword,'users',{});
    } 

    $refs!: {
        usersFormPassword: InstanceType<typeof ValidationObserver>;
    };
    async submitUpdatePassword() {
        const valid = await this.$refs.usersFormPassword.validate();
        if (valid) {
            this.overlay = true
            const data = await usersModule.updatePassword(this.FormRequestUpdatePassword)  
            this.textmsj = 'Password Actualizado con Éxito.'
            this.snackbar = true
            this.back();
            this.overlay = false
    
        } else {
            //return false
        }      
   
    };
    back() {
        setTimeout(() => {
            this.$router.go(-1);
            this.snackbar = false
        },2000);
    }
    reset () {
        if (!this.$refs.usersFormPassword.validate()) {
            this.$refs.usersFormPassword.reset()
        }  
    };
    mounted() {
        if (this.$route.params.section == 'Usuarios') {
            this.usersFormPassword.user_id = this.$route.params.id
        } else {
            this.usersFormPassword.user_id = this.getUserId
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
</style>
