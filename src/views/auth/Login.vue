<template>
    <div class="page-wrap">
        <div class="session-form-hold">
  	    <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
            <v-card-text class="text-center content">
                <v-avatar size="60" class="mb-4">
                    <img v-show="loginShow"  src="@/assets/images/conapdis_circular.png" alt="" />
                    <img v-show="registerShow"  src="@/assets/images/avatars/avatar_4.png" alt="" />
                </v-avatar>

                <h6 v-show="loginShow" class="text--disabled font-weight-bold mb-10">
                    {{ title_login }}
                </h6>
                 <h6  v-show="registerShow"  class="text--disabled font-weight-bold mb-10">
                    {{ title_register }}
                </h6>
                <v-form v-show="loginShow" ref="loginForm">
                    <v-text-field
                        label="Email"
                        v-model="loginForm.email"
                        :rules="emailRules"
                        required
                        @keyup.enter="login()"
                    />

                    <v-text-field
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        name="input-10-2"
                        label="Password"
                        :counter="100"
                        :rules="nameRules"
                        v-model="loginForm.password"
                        @click:append="show = !show"
                        @keyup.enter="login()"
                    ></v-text-field>
                </v-form>  
                <v-form v-show="registerShow"  lazy-validation  ref="usersForm">
                    <v-container >
                        <v-layout row wrap >
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field label="Nombre Completo" placeholder="Nombre Completo" outlined dense :rules="rules" v-model="usersForm.name">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                label="Email"
                                placeholder="Email"
                                outlined
                                dense
                                v-model="usersForm.email"
                            ></v-text-field>
                            </v-col>
                           <!--  <v-col cols="12" sm="12" md="12">
                                <v-select
                                :items="roles"
                                item-text="name"
                                item-value="id"
                                label="Roles"
                                placeholder="Roles"
                                v-model="usersForm.roles"
                                outlined
                                dense
                                :rules="rules"
                                required
                                @change="getIdRole($event)"
                                ></v-select>
                            </v-col> -->
                            <v-col cols="12" sm="12" md="12">
                                 <v-text-field   :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"   :type="show ? 'text' : 'password'"  label="Password" placeholder="Password" outlined dense :rules="rules" v-model="usersForm.password"  @click:append="show = !show">
                                </v-text-field>
                            </v-col>
                        </v-layout>
                    </v-container>
                    <div class="mt-5 d-flex justify-end">
                        <v-btn color="success" @click="saveUsers" block dark ><v-icon left>mdi-content-save-check</v-icon>Guardar</v-btn> 
                    </div>
                </v-form>
                <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
                <v-btn v-show="loginShow" class="mb-4" @click="login" block color="success" dark>
                    <v-icon left>mdi-login</v-icon>
                    Iniciar Sesión
                </v-btn>
                <v-btn v-show="registerShow" class="mb-15 mt-5" @click="register" block color="info" dark>
                    <v-icon left>mdi-arrow-left-bold-box-outline</v-icon>
                    Login
                </v-btn>
            
                <v-btn  v-show="loginShow"  class="mb-4" @click="registerUser" block color="info" dark>
                    <v-icon left>mdi-account-outline</v-icon>
                    Registrar Usuario
                </v-btn>
                <v-alert type="error" v-model="alert" dismissible>
                {{ text }}
                </v-alert> 
            </v-card-text>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import sessionModule from '@/store/modules/sessionModule';
import usersModule from '@/store/modules/usersModule';
import { ValidationObserver } from 'vee-validate'



@Component
export default class Login extends Vue {
    $router :any
    overlay = false;
    email = '';
    password = '';
    loginError = '';
    text = 'Email o Password Incorrecto'
    alert = false
    loginForm : any = {
        code: 0,
        message: '',
    }
    usersForm = {
        name:'',
        email:'',
        password:'',
        roles:1
    }
    title_login = 'Iniciar Sesión en su Cuenta'
    title_register = 'Registrar Usuario'
    loginShow = true
    registerShow = false
    snackbar = false
    textmsj     = '' 
    roles = [
        {
            id:1,
            name:'admin'
        },
        {
            id:2,
            name:'empresa'
        },
        {
            id:3,
            name:'estandar'
        }
    ]
    data(){
        return{
        show:false,
        checkbox1: true,
        checkbox2: false,
        
        emailRules: [
            (v:any) => !!v || 'E-mail is required',
            (v:any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        nameRules: [
            (v:any) => !!v || 'Password is required',
            (v:any) =>
                (v && v.length <= 100) ||
                'Name must be less than 100 characters'
        ],
        rules: [
            (v:any) => !!v || 'Campo requerido'
        ],
        }
    };
    get LoginRequest(): any {
        return this.loginForm;
    }

    $refs!: {
        loginForm: InstanceType<typeof ValidationObserver>;
        usersForm: InstanceType<typeof ValidationObserver>;
    };
    get FormRequestUser(): any {
        return this.usersForm;
    } 
 
    async login() {
        this.overlay = true
        const valid : any =  this.$refs.loginForm.validate();
        if (valid) { 
            const data : any = await sessionModule.login(this.LoginRequest)
            console.log(data)
            if (data.code == 200) {
                this.$router.push({ name: 'Dashboard' });
                this.overlay = false
            } else {
                this.alert = true
                this.loginError = data.message
                this.overlay = false
            }
        } 
    }
    async register(){
        this.loginShow = true
        this.registerShow = false
        //this.$router.push({ name: "bussines"});
    }
    async registerUser(){
        this.loginShow = false
        this.registerShow = true
        //this.$router.push({ name: "createuser"});
    }
    getIdRole(event) {
        this.usersForm.roles = event
    }
    async saveUsers() {
        const valid = await this.$refs.usersForm.validate();
        if (valid) {
            this.overlay  = true
            const data    = await usersModule.save(this.FormRequestUser)  
            console.log('en la vista:: ' + data )
            this.textmsj  = 'Usuario Creado con Éxito.'
            this.snackbar = true
            this.back();
            this.overlay  = false
        } else {
            //return false
        }  
    }
    back() {
        setTimeout(() => {
            this.$router.push({ name: 'bussines' });
            this.snackbar = false
        },2000);
    }
}
</script>
<style lang="scss" scoped>
.page-wrap {
   /*  background-image : url('../img/logos_conapdis/fondo.jpg'); */
    background-color: #64A14D !important;
    display: flex;
    align-items: center;
    padding: 40px 1rem;
    height: 100%;
    min-height: 100vh;
}
.session-form-hold {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
}
.content{
      background-color: white;
      border-radius: 10px;
}
/* .v-application .success {
    background-color: #EFAF30 !important;
    border-color: #EFAF30 !important;
} */
</style>
