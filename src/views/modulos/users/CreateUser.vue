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
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field   :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"   :type="show ? 'text' : 'password'"  label="Password" placeholder="Password" outlined dense :rules="rules" v-model="usersForm.password"  @click:append="show = !show">
                        </v-text-field>
                    </v-col>
                </v-layout>
            </v-container>
            <div class="mt-5 d-flex justify-end">
                <v-btn small @click="saveUsers" color="success"  >Guardar</v-btn> 
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
    value = ''
    label = 'prueba'
    overlay = false;
    show : Boolean =  false;
    usersForm = {
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


    get FormRequestUser(): any {
        return this.usersForm;
    } 
 

    $refs!: {
        usersForm: InstanceType<typeof ValidationObserver>;
    };
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
    async getRoles(){
        const roles : any = await  usersModule.getRoles();
        this.roles = roles;
    }

    reset () {
        if (!this.$refs.usersForm.validate()) {
            this.$refs.usersForm.reset()
        }  
    };
    back() {
        setTimeout(() => {
            this.$router.push({ name: 'bussines' });
            this.snackbar = false
        },2000);
    }
    mounted() {
        /* this.getRoles();
        this.getCustomers(); */
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
.v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--full-width > .v-input__control > .v-input__slot, .v-text-field--outlined > .v-input__control > .v-input__slot {
    align-items: stretch;
    min-height: 0px !important;
}
.text{
     align-items: stretch;
    min-height: 0px !important;
}
</style>
