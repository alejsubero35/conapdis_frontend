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
                        v-model="usersForm.roles"
                        outlined
                        dense
                        :rules="rules"
                        required
                        @change="getIdRole($event)"
                        ></v-select>
                    </v-col>
  
                </v-layout>
            </v-container>
            <div class="mt-5 d-flex justify-end ">
                <v-btn small @click="updateUsers" color="success"  >Actualizar</v-btn> 
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
[x: string]: unknown;

    overlay = false;
    show : Boolean =  false;
   usersForm = {
        id:'',
        name:'',
        email:'',
        password:'',
        roles:''
 
    }
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

    get FormRequestUser(): any {
        return this.usersForm;
    } 


    $refs!: {
        usersForm: InstanceType<typeof ValidationObserver>;
    };
    getIdRole(event) {
        this.usersForm.roles = event
    }

    async updateUsers() {
        const valid = await this.$refs.usersForm.validate();
        if (valid) {
            this.overlay  = true
            const data    = await usersModule.update(this.FormRequestUser)  
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

    async getUserById(id) {
        this.overlay = true
        const {data} : any = await usersModule.getUserById(id)  
        console.log(data)
        this.usersForm.name     = data.data.name
        this.usersForm.email    = data.data.email
        this.usersForm.id       = data.data.id
        console.log(data.data.roles[0].id)
        this.getIdRole(data.data.roles[0].id);

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
        //this.getRoles();
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
