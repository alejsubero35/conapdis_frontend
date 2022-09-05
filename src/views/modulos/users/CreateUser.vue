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
            ref="usersForm"
          >
            <TitleSection :sectiontitle="sectiontitle"/>
            <v-container >
                <v-layout row wrap >
                     <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Nombre Completo" placeholder="Nombre Completo" outlined dense :rules="rules" v-model="usersForm.name">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                        label="Email"
                        placeholder="Email"
                        outlined
                        dense
                        :rules="emailRules"
                        v-model="usersForm.email"
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                        :items="roles"
                        item-text="name"
                        item-value="id"
                        label="Roles"
                        placeholder="Roles"
                        v-model="usersForm.role_id"
                        outlined
                        dense
                        :rules="rules"
                        required
                        @change="getIdRole($event)"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field    :type="show ? 'text' : 'password'"  label="Password" placeholder="Password" outlined dense :rules="rules" v-model="usersForm.password"  @click:append="show = !show">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"   :type="show ? 'text' : 'password'" @keyup="validarPassword()" label="Password Confirmation" placeholder="Password Confirmation" outlined dense :rules="rules" v-model="usersForm.passwordConfirmation"  @click:append="show = !show">
                        </v-text-field>
                    </v-col>
                        <v-col v-show="visiblecustomers" cols="12" sm="6" md="4">
                        <v-select
                        :items="customers"
                        item-text="nameLegal"
                        item-value="id"
                        label="Cliente"
                        placeholder="Cliente"
                        v-model="usersForm.customer_id"
                        outlined
                        dense
                        @change="getIdCustomers($event)"
                        ></v-select>
                    </v-col>
                </v-layout>
            </v-container>
            <div class="mt-5 d-flex justify-end">
                <v-btn small @click="submitSetting" color="success"  >Guardar</v-btn> 
            </div>
        </v-form>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import usersModule from '@/store/modules/usersModule';
import { ValidationObserver } from 'vee-validate'
import { Usuarios } from "@/store/interfaces/Usuarios";
import {serialize} from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class Users extends Vue {

    overlay = false;
    show : Boolean =  false;
    usersForm = {
        name:'',
        email:'',
        password:'',
        customer_id:'',
        passwordConfirmation:'',
        roles:{
            id: '',
        },
        customers:{
            id:''
        }
    }
    roles = []
    customers = []
    snackbar = false
    textmsj     = '' 
    sectiontitle = 'Crear Usuario'
    visiblecustomers = false
  

    
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
    validarPassword(){
      
    }

    get FormRequestUser(): any {
        return serialize(this.usersForm,'users',{ relationships: ['roles','customers']});
    } 

    get FormRequestUserRoles(): any {
        return serialize(this.usersForm,'users',{ relationships: ['roles']});
    } 

    $refs!: {
        usersForm: InstanceType<typeof ValidationObserver>;
    };
    getIdRole(event) {
        if (event == 6) {
            this.visiblecustomers = true
        } else {
            this.visiblecustomers = false
            this.usersForm.customer_id = ''
            this.usersForm.customers.id = ''
         
        }
        this.usersForm.roles.id = event
    }
    getIdCustomers(event) {
        this.usersForm.customers.id = event
    }
    async submitSetting() { 
         
        delete this.FormRequestUser.data.attributes.role_id
        delete this.FormRequestUser.data.attributes.customer_id
        delete this.FormRequestUserRoles.data.attributes.role_id
        delete this.FormRequestUserRoles.data.attributes.customer_id
        delete this.FormRequestUserRoles.data.attributes.customers

        if(this.usersForm.customers.id != '') {
            this.saveUsers(this.FormRequestUser)
        } else {
            this.saveUsers(this.FormRequestUserRoles)
        }
    
   
    };
    async saveUsers(dataUsers : any) {console.log(dataUsers)
        const valid = await this.$refs.usersForm.validate();
        if (valid) {
            this.overlay  = true
            const data    = await usersModule.save(dataUsers)  
            this.textmsj  = 'Usuario Creado con Éxito.'
            this.snackbar = true
            this.back();
            this.overlay  = false
        } else {
            //return false
        }  
    }
    async getRoles(){
        const roles : any = await  usersModule.getRoles();
        this.roles = roles;
    }
    async getCustomers(){
        const customers : any = await  usersModule.getCustomers();
        this.customers = customers;
    }
    reset () {
        if (!this.$refs.usersForm.validate()) {
            this.$refs.usersForm.reset()
        }  
    };
    back() {
        setTimeout(() => {
            this.$router.go(-1);
            this.snackbar = false
        },2000);
    }
    mounted() {
        this.getRoles();
        this.getCustomers();
        this.usersForm.email = ''
        this.usersForm.password = ''
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
