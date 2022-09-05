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
            <div class="mt-5 d-flex justify-end ">
                <v-btn small @click="submitSetting" color="success"  >Actualizar</v-btn> 
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
        id:'',
        name:'',
        email:'',
        role_id:'',
        customer_id:'',
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
    sectiontitle = 'Actualizar Usuario'
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

        if(this.usersForm.customers) {
            this.updateUsers(this.FormRequestUser)
        } else {
            this.updateUsers(this.FormRequestUserRoles)
        }
    
   
    };
    async updateUsers(dataUsers : any) {
        const valid = await this.$refs.usersForm.validate();
        if (valid) {
            this.overlay  = true
            const data    = await usersModule.update(dataUsers)  
            this.textmsj  = 'Usuario Actualizado con Éxito.'
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
    async getUserById(id) {
        this.overlay = true
        const data : any = await usersModule.getUserById(id)  
        console.log(data)
        this.usersForm.name     = data.name
        this.usersForm.email    = data.email
        this.usersForm.id       = data.id
        this.usersForm.role_id  = data.roles.id
        this.getIdRole(data.roles.id);
        this.usersForm.customer_id  = (data.customers) ? data.customers.id : ''
        this.overlay = false
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
        this.getUserById(this.$route.params.id);       
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
