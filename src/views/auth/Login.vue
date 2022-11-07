<template>
    <div class="page-wrap">
        <div  :class="[(loginShow) ? 'session-form-hold' : 'session-form-register']" >
  	    <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <v-row>
            <img v-show="loginShow"  src="img/logos_conapdis/logo_cuadrado.png" alt="" class="logo_login" />
        </v-row>
            <v-card-text class="text-center content">
                <v-avatar v-show="registerShow" size="60" class="mb-4">
                    <v-icon  large style="font-size:60px;">mdi-account-multiple-plus</v-icon>
                </v-avatar>
                 <h4  v-show="registerShow"  class=" font-weight-bold mb-10">
                    {{ title_register }}
                </h4>
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
                    <v-container>
                        <v-layout row wrap >
                            <v-col cols="12" :sm="sm" :md="md">
                                <v-select
                                    :items="tipodocumentos"
                                    item-text="text"
                                    item-value="value"
                                    label="Tipo Documento"
                                    placeholder="Tipo Documento"
                                    v-model="usersForm.type_document"
                                    outlined
                                    dense
                                    :rules="rules"
                                    required
                                    @change="showTypeDocument()"
                                ></v-select>
                            </v-col>
                            <v-col v-show="identity" cols="12" :sm="sm" :md="md">
                                <v-select
                                    :items="tipoidentity"
                                    item-text="text"
                                    item-value="value"
                                    label="Tipo de Cédula"
                                    placeholder="Tipo de Cédula"
                                    outlined
                                    dense
                                    v-model="usersForm.type_identity_card"                   
                                ></v-select>
                            </v-col>
                            <v-col cols="12" :sm="sm" :md="md">
                                <v-text-field
                                    label="Cédula / Pasaporte"
                                    placeholder="Cédula / Pasaporte"
                                    outlined
                                    dense
                                    :rules="numberRule"
                                    v-model="usersForm.number_document_identity"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" :sm="sm" :md="md">
                                <v-text-field
                                    label="Nombres"
                                    placeholder="nombres"
                                    outlined
                                    dense
                                    :rules="rules"
                                    v-model="usersForm.first_name"
                            
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" :sm="sm" :md="md">
                                <v-text-field
                                    label="Apellidos"
                                    placeholder="Apellidos"
                                    outlined
                                    dense
                                    :rules="rules"
                                    v-model="usersForm.last_name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" :sm="sm" :md="md">
                                <v-text-field label="Nombre de Usuario" placeholder="Nombre de Usuario" outlined dense :rules="rules" v-model="usersForm.username">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" :sm="sm" :md="md">
                                <v-text-field
                                label="Email"
                                placeholder="Email"
                                outlined
                                dense
                                :rules="emailRules"
                                v-model="usersForm.email"
                            ></v-text-field>
                            </v-col>
           
                            <v-col cols="12" :sm="sm" :md="md">
                                 <v-text-field   :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"   :type="show ? 'text' : 'password'"  label="Password" placeholder="Password" outlined dense :rules="rules" v-model="usersForm.password"  @click:append="show = !show">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" :sm="sm" :md="md">
                                <v-select
                                    :items="arrayPosition"
                                    item-text="name"
                                    item-value="id"
                                    label="Cargo"
                                    placeholder="Cargo"
                                    outlined
                                    dense
                                    v-model="usersForm.position_id"
                                    :rules="rules"
                                    required
                                ></v-select>
                            </v-col>
                            <v-col cols="12" :sm="sm" :md="md">
                                <v-text-field
                                    label="Teléfono"
                                    placeholder="###########"
                                    outlined
                                    dense
                                    v-model="usersForm.phone"
                                    v-mask="'###########'"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" :sm="sm" :md="md">
								<v-select
									:items="arrayStates"
									item-text="name"
									item-value="id"
									label="Estado"
									placeholder="Estado"
									v-model="usersForm.state_id"
									outlined
									dense
									:rules="rules"
									required
									@change="getMunicipalityByState($event)"
								></v-select>
							</v-col>
							<v-col cols="12" :sm="sm" :md="md">
								<v-select
									:items="arrayMunicipality"
									item-text="name"
									item-value="id"
									label="Municipio"
									placeholder="Municipio"
									v-model="usersForm.municipality_id"
									outlined
									dense
									:rules="rules"
									required
									@change="getParishesByMunicipality($event)"
								></v-select>
							</v-col>
							<v-col cols="12" :sm="sm" :md="md">
								<v-select
									:items="arrayParishes"
									item-text="name"
									item-value="id"
									label="Parroquia"
									placeholder="Parroquia"
									v-model="usersForm.parishe_id"
									outlined
									dense
									:rules="rules"
									required
								></v-select>
							</v-col>
              
            
                        </v-layout>
                    </v-container>
                    <div class="mt-5 d-flex justify-end">
                        <v-btn color="success" @click="saveUsers" block dark class="btn-login" ><v-icon left>mdi-content-save-check</v-icon>Guardar</v-btn> 
                    </div>
                </v-form>
                <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color"/>
                <v-btn v-show="loginShow" class="mb-4 btn-login" @click="login" block color="success" dark>
                    <v-icon left>mdi-login</v-icon>
                    Iniciar Sesión
                </v-btn>
                <v-btn v-show="registerShow" class="mb-15 mt-5 btn-login register" @click="register" block color="info" dark>
                    <v-icon left>mdi-arrow-left-bold-box-outline</v-icon>
                    Login
                </v-btn>
                <v-btn  v-show="loginShow"  class="mb-4 btn-login register" @click="registerUser" block color="info" dark>
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
import bussinesModule from '@/store/modules/bussinesModule';
import { ValidationObserver } from 'vee-validate'



@Component
export default class Login extends Vue {
[x: string]: unknown;
    $router :any
    sm = '12'
    md = '12'
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
        email:'',
        type_document:'',
        number_document_identity:'',
        type_identity_card:'',
        first_name:'',
        last_name:'',
        username:'',
        position_id:'',
        phone:'',
        password:'',
        roles:10,
        state_id:'',
        municipality_id:'',
        parishe_id:'',
        country_id:237,
        is_active:1,
        code: 0,
        message: ''
    }
    identity = false
    title_login = 'Iniciar Sesión en su Cuenta'
    title_register = 'Registrar Usuario'
    loginShow = true
    registerShow = false
    snackbar = false
    textmsj     = ''
    color = '' 
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
    tipodocumentos  = [
        {value: 'cedula', text: 'Cédula'},
        {value: 'passport', text: 'Pasaporte'},
    ];
    tipoidentity  = [
        {value: '1', text: 'Venezolano'},
        {value: '2', text: 'Extrajero'},
    ];
    arrayStates = []
	arrayMunicipality = []
	arrayParishes = []
    arrayPosition = []
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
        numberRule: [
            (v:any) => !!v || 'Cédula o Pasaporte',
            (v:any) =>
                (v && v.length <= 8) ||
                'Debe ingresar máximo 8 caracteres'
        ]
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
    async showTypeDocument(){
        if(this.usersForm.type_document == 'cedula') {
            this.identity = true
        } else {
            this.identity = false
        }
    }
 
    async login() {
        this.overlay = true
        const valid : any =  this.$refs.loginForm.validate();
        if (valid) { 
            const data : any = await sessionModule.login(this.LoginRequest)
    
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
    }
    async registerUser(){
        this.loginShow = false
        this.registerShow = true
        this.sm = '6'
        this.md = '6'
    }
    getIdRole(event) {
        this.usersForm.roles = event
    }
    async getPositionAll(){
		const position : any = await sessionModule.getPositionAll()
		this.arrayPosition = position.data.data
	}
    async getStates(){
		const states : any = await bussinesModule.getStatesAll()
		this.arrayStates = states.data.data
	}
    async getMunicipalityByState(event){
		const municipality : any = await bussinesModule.getMunicipality(event)
		this.arrayMunicipality = municipality.data.data
	}
	async getParishesByMunicipality(event){
		const parishes : any = await bussinesModule.getParishes(event)
		this.arrayParishes = parishes.data.data
	}
    async saveUsers() {
        const valid = await this.$refs.usersForm.validate();
        if (valid) {
            this.overlay  = true
            const data    = await usersModule.save(this.FormRequestUser)  
            if(data.code == 201){
                this.textmsj = 'Usuario Registrado con Éxito.'
                this.color = 'success'
                this.snackbar = true
                this.back();
                this.overlay = false 
            } else {
                this.textmsj = 'Error al Registrar los datos de Usuario.'
                this.color = 'error'
                this.snackbar = true
                this.backError();
                this.overlay = false 
            }
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
    backError(){
		setTimeout(() => {
            this.snackbar = false
        },3500);
	}
    mounted(){
        this.getPositionAll()
        this.getStates()
    }
}
</script>
<style lang="scss" scoped>
.page-wrap {
   /*  background-image : url('../img/logos_conapdis/fondo.jpg'); */
    background-color:  #1C3969 !important;
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
.session-form-register{
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}
.content{
      background-color: white;
      border-radius: 10px;
}
.logo_login{
    width: 66%;
    padding: 18px;
    margin: auto;
}
.btn-login{
    border-radius: 25px;
}
.register{
    background-color: #1C3969  !important;
}
/* .v-application .success {
    background-color: #EFAF30 !important;
    border-color: #EFAF30 !important;
} */
</style>
