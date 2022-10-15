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
                    <img src="@/assets/images/conapdis_circular.png" alt="" />
                </v-avatar>

                <h6 class="text--disabled font-weight-bold mb-10">
                    Iniciar Sesión en su Cuenta
                </h6>
                <v-form ref="loginForm">
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
                    <v-btn
                        class="mb-4"
                        @click="login"
                        block
                        color="success"
                        dark
                    >
                        <v-icon left>mdi-login</v-icon>
                        Iniciar Sesión</v-btn
                    >
               
                    <v-btn
                        class="mb-4"
                        @click="registerUser"
                        block
                        color="info"
                        dark
                    >
                        <v-icon left>mdi-account-outline</v-icon>
                        Registrar Usuario</v-btn
                    >
             <!--        <v-btn
                        class="mb-4"
                        @click="register"
                        block
                        color="primary"
                        dark
                    >
                        <v-icon left>mdi-account-plus-outline</v-icon>
                        Registrar Empresa</v-btn
                    > -->
                </v-form>  
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
        ]
        }
    };
    get LoginRequest(): any {
        return this.loginForm;
    }

    $refs!: {
        loginForm: InstanceType<typeof ValidationObserver>;
    };
 

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
        this.$router.push({ name: "bussines"});
    }
    async registerUser(){
        this.$router.push({ name: "createuser"});
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
.v-application .success {
    background-color: #EFAF30 !important;
    border-color: #EFAF30 !important;
}
</style>
