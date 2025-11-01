<template>
    <div class="content-section">
	    <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
            <v-form class="form_data_section" ref="dataForm"  lazy-validation >
            <TitleSection :sectiontitle="sectiontitle"/>	
            <v-row class="mt-5 p-3">
                <v-col cols="12" sm="12" md="4">
                    <v-text-field
                        label="Empresa"
                        placeholder="Empresa"
                        outlined
                        dense
                        :rules="rules"
                        v-model="empresaname"
                        :disabled="disabledHeader"
                        class="ml-2"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Vacantes"
                        placeholder="Vacantes"
                        outlined
                        dense
                        :rules="rulesNum"
                        v-model="cantidad_postula_oferta"
                        :disabled="disabledHeader"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Experiencia"
                        placeholder="Experiencia"
                        outlined
                        dense
                        v-model="experiencia_postula_oferta"
                        :disabled="disabledHeader"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <template>
                          <v-data-table
                              :headers="headers"
                              :items="desserts" 
                              :footer-props="{
                                  'items-per-page-text':'Filtro por Página'       
                              }"                     
                          >
                                                    <template v-slot:item.asistencia="{ item }">
                                                        <div class="d-flex align-center" style="gap:6px;">
                                                            <template v-if="item.cita_id">
                                                                <v-chip small color="info" text-color="white">Citado</v-chip>
                                                                <span v-if="item.fecha_cita" class="grey--text text--darken-1">{{ item.fecha_cita }}<span v-if="item.hora"> {{ item.hora }}</span></span>
                                                                <v-chip v-if="item.asistio === 1 || item.asistio === '1'" small color="success" text-color="white">Asistió</v-chip>
                                                                <v-chip v-else small color="grey" text-color="white">No asistió</v-chip>
                                                            </template>
                                                            <template v-else>
                                                                —
                                                            </template>
                                                        </div>
                                                    </template>
                                                    <template v-slot:item.status="{ item }">
                                                        <v-chip small :color="statusColor(item.status)" text-color="white">
                                                            {{ statusLabel(item.status) }}
                                                        </v-chip>
                                                    </template>
                          <template v-slot:item.actions="{ item }">

                        <div class="d-flex">
                            <v-tooltip v-if="isPending(item)" top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="success"
                                        dark
                                        @click="aprobar(item)"
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-account-check-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Aprobar Postulante</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="success"
                                        dark
                                        @click="downloadCV(item)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-file-download-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Descargar CV</span>
                            </v-tooltip>
                            <v-tooltip v-if="canManageCita(item)" top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="warning"
                                        dark
                                        @click="getCita(item)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon v-if="item.cita_id">mdi-file-eye</v-icon>
                                        <v-icon v-else> mdi-briefcase-plus</v-icon>
                                      
                                    </v-btn>
                                </template>
                                <span v-if="item.cita_id">Ver Cita</span>
                                <span v-else>Crear Cita</span>
                            </v-tooltip>
                            <v-tooltip v-if="canReject(item)" top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="error"
                                        dark
                                        @click="eliminar(item)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-account-multiple-minus</v-icon>
                                    </v-btn>
                                </template>
                                <span>No contratar</span>
                            </v-tooltip>
                            <v-tooltip v-if="canHire(item)" top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="primary"
                                        dark
                                        @click="contratar(item)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-handshake</v-icon>
                                    </v-btn>
                                </template>
                                <span>Contratar y continuar a Vincular</span>
                            </v-tooltip>
                        </div>
                    </template>
                          </v-data-table>
                      </template>
                  </v-col>
            </v-row>
        </v-form>
        <v-dialog
            v-model="dialogCita" max-width="700">
            <v-card>
                <v-overlay :value="overlayDialog">
                    <v-progress-circular
                        indeterminate
                        size="44"
                        class="laoding"
                    ></v-progress-circular>
                </v-overlay>
            <v-card-title class="text-h5">
                {{ titlecita }} 
            </v-card-title>
            <v-form class="form_data_section" ref="dataFormCita"  lazy-validation >	
                <v-row>
                <v-col cols="12" sm="12"	md="12" class="p-0">
                    <v-text-field
                        label="Empresa"
                        placeholder="Empresa"
                        outlined
                        dense
                        :rules="rules"
                        v-model="empresaname"
                        :disabled="disabledHeader"
                  
                    ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="6">
                     <v-text-field
                        label="Profesión"
                        placeholder="Profesión"
                        v-model="profesion"
                        outlined
                        dense
                        :disabled="disabledHeader"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="6">
                    <v-text-field
                        label="Cargo"
                        placeholder="Cargo"
                        v-model="cargo"
                        outlined
                        dense
                        :disabled="disabledHeader"
                    ></v-text-field>
                </v-col> -->
        
                <v-col cols="12" sm="6" md="6">
                    <v-menu
                        v-model="menu"
                        :disabled="readOnlyCita"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            label="Fecha"
                            append-icon="mdi-calendar"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            dense 
                            :disabled="readOnlyCita"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="date"
                        no-title
                        locale="es"
                        @input="menu = false"
                        @change="updateFecha()"
                
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        label="Hora Inicio"
                        placeholder="Hora Inicio"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataFormCita.hora"
                        type="time"
                        :disabled="readOnlyCita"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        label="Contacto"
                        placeholder="Contacto"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataFormCita.contacto"
                        type="text"
                        :disabled="readOnlyCita"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        label="Teléfono"
                        placeholder="Teléfono"
                        outlined
                        dense
                        :rules="rulesTel"
                        v-model="dataFormCita.telefono"
                        type="tel"
                        maxlength="14"
                        @input="onTelefonoInput"
                        :disabled="readOnlyCita"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-select
                        :items="modalidades"
                        label="Modalidad de entrevista"
                        outlined
                        dense
                        v-model="dataFormCita.modalidad"
                        :rules="rules"
                        :disabled="readOnlyCita"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-switch
                        v-model="dataFormCita.asistio"
                        :true-value="1"
                        :false-value="0"
                        inset
                        label="Asistió?"
                        :disabled="readOnlyCita"
                    ></v-switch>
                </v-col>
                <v-col cols="12" sm="12" md="12" v-if="!readOnlyCita">
                    <v-checkbox
                        v-model="notifyEmail"
                        :disabled="!!validateCita"
                        label="Notificar por correo al guardar"
                    ></v-checkbox>
                </v-col>
                </v-row>
                <!-- <v-row v-show="existCita">
                    <v-col cols="12" sm="12" md="12" class="p-0">
                        <v-textarea
                            label="Gestión"
                            placeholder="Gestión"
                            outlined
                            dense
                            v-model="dataFormCita.gestion"
                            rows="2"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="p-0">
                        <v-textarea
                            label="Acuerdos"
                            placeholder="Acuerdos"
                            outlined
                            dense
                            v-model="dataFormCita.acuerdos"
                            rows="2"
                        ></v-textarea>
                    </v-col>
                </v-row> -->
            </v-form>

            <v-card-actions v-if="readOnlyCita">
                <v-spacer></v-spacer>
                <v-btn color="danger" small @click="dialogCita = false">
                    Cerrar
                </v-btn>
            </v-card-actions>
            <v-card-actions v-else>
                <v-spacer></v-spacer>
                <v-btn color="danger" small @click="dialogCita = false">
                    Cancelar
                </v-btn>
                <v-btn color="primary" small @click="saveCita()">
                    {{ validateCita ? 'Actualizar' : 'Guardar' }}
                </v-btn>
            </v-card-actions>
            </v-card>
	    </v-dialog>
                <ModalDelete @deleteData="deleteData" :titlemodal="titlemodal" :textbody="textbody" :dialogDelete="dialogDelete" @cerrarModal="cerrarModal">
                    <template v-slot:default>
                        <v-textarea v-model="formRechazar.rejection_reason" outlined dense label="Motivo del rechazo" rows="3"></v-textarea>
                    </template>
                </ModalDelete>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color" />
        <v-dialog v-model="dialogConfirmHire" max-width="520">
            <v-card>
                <v-card-title class="text-h6">Confirmar contratación</v-card-title>
                <v-card-text>¿Está seguro de contratar a {{ hireDisplayName }}?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="grey" small @click="dialogConfirmHire = false">Cancelar</v-btn>
                    <v-btn color="primary" small @click="confirmHireProceed">Confirmar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ofertModule from '@/store/modules/ofertModule';
import { ValidationObserver } from 'vee-validate'
import {serialize} from 'jsonapi-fractal'
import storageData from '@/store/services/storageService'

@Component({
    components: {
        ModalDelete: () => import('@/components/ModalDelete.vue')
    }
})
export default class PostulantesOferta extends Vue {
    [x: string]: unknown;
    listPrice?: any = [];
    pricelist_id = ''
	condicionespago?: any = [];
	overlay = false;
    overlayDialog = false
	title : string = '';
	subtitle : string = ''
    textbody = ''
    titlemodal = ''
    dialogDelete : boolean = false;
	dataFormCita : any = {

    };
    formRechazar : any = {

    }
    sectiontitle = 'LISTADO DE POSTULANTES'
	date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'
    empresaname = ''
    arrayCharges = []
    arrayProfession = []
    arrayDiscapacidades = []
    arrayChk = []   
    cargo_id = ''
    profesion_id = ''
    headers = [
        {text: 'Doc.Identificación', value: 'cedula'},
        {text: 'PCD ', value: 'username'},
/*         {text: 'Grado Instrucción', value: 'desc_grado_instruccion_postula'}, */
        {text: 'Sexo', value: 'sexo'},
        {text: 'Status', value: 'status'},
        {text: 'Entrevista', value: 'asistencia'},
        {text: 'Acciones', value: 'actions'}
    ];
    snackbar = false;
    textmsj = "";
    color = "";
    timeout = 2000;
    desserts = []
    dialogCita = false
    dialogConfirmHire = false
    itemToHire: any = null
    profesion = ''
    cargo     = ''
    disabled = true
    disabledHeader = true
    cantidad_postula_oferta = ''
    experiencia_postula_oferta = ''
    // Cargo de la oferta (para prefill en Vincular)
    ofertaCargoId: any = null
    ofertaCargoName: string = ''
    existCita = false
    validateCita = 0
    titlecita = 'Realizar Cita'
    readOnlyCita = false
    notifyEmail = true
    $refs!: {
        dataFormCita: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return this.dataFormCita
    }
    get FormRequestRechazar(): any {
        return this.formRechazar
    }
        modalidades = [
            { text: 'Presencial', value: 'presencial' },
            { text: 'Por llamada', value: 'llamada' },
            { text: 'Video llamada', value: 'video_llamada' },
        ]
        statusLabel(status: string) {
            const st = (status || '').toLowerCase()
            const map: any = { pending: 'Pendiente', accepted: 'Aprobado', rejected: 'Rechazado', hired: 'Contratado' }
            return map[st] || '—'
        }
        statusColor(status: string) {
            const st = (status || '').toLowerCase()
            const map: any = { pending: 'warning', accepted: 'primary', rejected: 'error', hired: 'success' }
            return map[st] || 'grey'
        }
        isPending(item: any) {
            return (item?.status || '').toLowerCase() === 'pending'
        }
        isAccepted(item: any) {
            return (item?.status || '').toLowerCase() === 'accepted'
        }
        isRejected(item: any) {
            return (item?.status || '').toLowerCase() === 'rejected'
        }
        isHired(item: any) {
            return (item?.status || '').toLowerCase() === 'hired'
        }
        canReject(item: any) {
            const st = (item?.status || '').toLowerCase()
            return st === 'pending' || st === 'accepted'
        }
        hasCita(item: any) {
            return !!item?.cita_id
        }
        canManageCita(item: any) {
            // Se permite crear cita si está aceptado y no hay cita; ver/editar si ya hay cita
            const st = (item?.status || '').toLowerCase()
            if (st === 'accepted') return true
            if (this.hasCita(item)) return true
            return false
        }
        canHire(item: any) {
            // Solo permitir contratar si está aceptado o tiene cita, y NO está rechazado ni ya contratado
            const st = (item?.status || '').toLowerCase()
            if (st === 'rejected' || st === 'hired') return false
            return this.isAccepted(item) || this.hasCita(item)
        }
    async getPostulantesAll(id){
        const postulantes : any = await  ofertModule.getPostulantesById(id);
        this.desserts = postulantes.data.data;
        //this.desserts = postulantes

    }
    async getOferta(id){
        // No asignar 'id' aquí (id es de la cita); usar ofert_id para vincular la cita a la oferta
        this.dataFormCita.ofert_id = id
        const data : any = await ofertModule.getOfertById(id)
        this.cantidad_postula_oferta = data.data.oferts.quantity
        this.experiencia_postula_oferta = data.data.oferts.experience
        // Guardar cargo de la oferta para prefill
        this.ofertaCargoId = data.data.oferts?.ofert_position_id || null
        // Si tenemos lista de cargos, intenta derivar el nombre
        if (this.ofertaCargoId && Array.isArray(this.arrayCharges) && this.arrayCharges.length) {
            const found = this.arrayCharges.find((c:any) => String(c.id) === String(this.ofertaCargoId))
            this.ofertaCargoName = found?.nombre || ''
        }
    }

	reset () {
        this.$refs.dataFormCita.reset()
    }

    back() {
        setTimeout(() => {
            this.snackbar = false
            this.$router.go(-1)
        },2000);
    }
    backError() {
        setTimeout(() => {
            this.snackbar = false
        },2000);
    }
    go() {
        this.$router.go(-1)
    }

    openView(){
        this.$router.push({ name: "crearofertalaboral"});
    }

    eliminar(item){console.log(item)
        this.dialogDelete = true;
        this.textbody = 'Confirme que desea Rechazar al Postulante'
        this.titlemodal = 'Rechazar Postulante'
        this.formRechazar.id_postula_oferta  =  item.ofert_postulation_id
        this.formRechazar.id_pcd_postula_pcd = item.id_pcd_postula_pcd
    }
    
    async aprobar(item){
        try{
            this.overlay = true
            // Abrir modal para programar entrevista opcional tras aprobar
            const res:any = await ofertModule.aprobarPostulante({ ofert_postulation_id: item.ofert_postulation_id })
            if(res.status === 200){
                this.color = 'success'
                this.textmsj = 'Postulante aprobado y vacantes actualizadas.'
                this.snackbar = true
                this.closeSnackbar()
                await this.getPostulantesAll(this.$route.params.id)
                // Prefijar datos para posible cita: contacto = nombre PCD, telefono = telefono_pcd
                this.dataFormCita = {
                  id: undefined,
                  ofert_id: this.$route.params.id,
                  personas_discapacidad_id: item.personas_discapacidad_id,
                  contacto: item.full_name || item.username,
                  telefono: item.telefono_pcd || '',
                  fecha: this.date,
                  hora: '',
                                    modalidad: '',
                                    busine_id: storageData.get('_bussines').id
                }
                this.titlecita = 'Asignar Cita de Entrevista'
                this.validateCita = 0
                this.readOnlyCita = false
                this.notifyEmail = true
                // Asegurar nombre de empresa visible en el modal
                this.empresaname = (storageData.get('_bussines').rif || '') + '-' + (storageData.get('_bussines').company_name || '')
                this.dialogCita = true
            } else {
                this.color = 'warning'
                this.textmsj = (res.data && res.data.message) ? res.data.message : 'No fue posible aprobar al postulante.'
                this.snackbar = true
                this.closeSnackbar()
            }
        }catch(e){
            this.color = 'error'
            this.textmsj = 'Error de conexión al aprobar.'
            this.snackbar = true
            this.closeSnackbar()
        } finally {
            this.overlay = false
        }
    }
    
    getCita(item){console.log(item)
    this.dataFormCita = {}
        const st = (item?.status || '').toLowerCase()
        // Solo ver cita cuando está rechazado o contratado
        this.readOnlyCita = (st === 'rejected' || st === 'hired')
        this.dataFormCita.ofert_id = this.$route.params.id
        this.dataFormCita.personas_discapacidad_id = item.personas_discapacidad_id
    this.dataFormCita.busine_id = storageData.get('_bussines').id
        // Refrescar nombre de empresa para evitar que aparezca vacío al abrir "Ver Cita"
        this.empresaname = (storageData.get('_bussines').rif || '') + '-' + (storageData.get('_bussines').company_name || '')
        // Si no hay cita y no está aceptado, no abrir (no se puede crear/editar)
        if (!item.cita_id && st !== 'accepted') {
            return
        }
        this.dialogCita = true 
        this.validateCita = item.cita_id    
        console.log(this.validateCita);
        if(item.cita_id > 0){
            this.titlecita = 'Ver Cita'
            this.existCita = true
            this.notifyEmail = false
            this.dataFormCita.id = item.cita_id
            this.dataFormCita.hora = item.hora
            this.dataFormCita.contacto = item.contacto || item.full_name || item.username
            this.dataFormCita.telefono = item.telefono || item.telefono_pcd || ''
            // Prefijar modalidad guardada para que el select la muestre seleccionada
            this.dataFormCita.modalidad = item.modalidad || ''
            // Prefijar asistencia guardada (1/0)
            this.dataFormCita.asistio = (item.asistio === 1 || item.asistio === '1') ? 1 : 0
            this.date = item.fecha_cita
            this.dataFormCita.fecha = item.fecha_cita
        }else{
            this.titlecita = 'Crear Cita'
            this.existCita = false
            this.notifyEmail = true
            this.dataFormCita.hora = ''
            this.dataFormCita.contacto = item.full_name || item.username
            this.dataFormCita.telefono = item.telefono_pcd || ''
            this.dataFormCita.modalidad = ''
            this.dataFormCita.asistio = 0
            // Mantener la fecha actual por defecto cuando no existe en el item
            this.dataFormCita.fecha = this.date
            // Si estamos creando (sin cita), aseguramos edición habilitada
            this.readOnlyCita = false
        }
    }

    cerrarModal(event){
        this.dialogDelete = event;
    } 
    async deleteData(event){
      
        this.overlay = true
        if (!this.formRechazar.rejection_reason || this.formRechazar.rejection_reason.trim().length === 0) {
            this.overlay = false
            this.color = 'warning'
            this.textmsj = 'Debe indicar un motivo de rechazo.'
            this.snackbar = true
            this.closeSnackbar()
            return
        }
        const res : any = await ofertModule.rechazarPostulante(this.FormRequestRechazar);
        if(res.status == 200){
            this.dialogDelete = event;
            this.getPostulantesAll(this.$route.params.id); 
            this.color = 'success'
            this.textmsj = 'Postulante Rechazado con Éxito.'
            this.snackbar = true
            this.closeSnackbar()
            this.overlay = false
        }
    }
    closeSnackbar(){
        setTimeout(() => {
            this.snackbar = false
        },2000);
    }
    handleDataUser(event){
        this.desserts = event;
        this.loadTable = false;
    }
    currentDate() {
        var date = new Date();
        return  date.toISOString();
    }

    async downloadCV(item) {
        const data : any = await ofertModule.downloadCV(item.personas_discapacidad_id);
    }
   
    get hireDisplayName(){
        const it:any = this.itemToHire || {}
        return it.full_name || it.username || 'este postulante'
    }
    contratar(item){
        // Guardia adicional: si fue rechazado o ya contratado, no permitir continuar
        const st = (item?.status || '').toLowerCase()
        if (st === 'rejected') {
            this.color = 'warning'
            this.textmsj = 'Este postulante fue rechazado. No es posible contratar.'
            this.snackbar = true
            this.closeSnackbar()
            return
        }
        if (st === 'hired') {
            this.color = 'info'
            this.textmsj = 'Este postulante ya está contratado.'
            this.snackbar = true
            this.closeSnackbar()
            return
        }
        this.itemToHire = item
        this.dialogConfirmHire = true
        return
    }
    async confirmHireProceed(){
        const item:any = this.itemToHire
        if (!item) { this.dialogConfirmHire = false; return }
        this.dialogConfirmHire = false
        try {
            // Prefill mínimo no invasivo: guardar en storage para uso opcional futuro
            const prefill = {
                personas_discapacidad_id: item.personas_discapacidad_id,
                ofert_id: this.$route.params.id,
                empresa_id: storageData.get('_bussines')?.id,
                full_name: item.full_name || item.username || '',
                telefono: item.telefono_pcd || '',
                cedula: item.cedula || '',
                // Prefill de cargo (id de la oferta)
                cargo_id: this.ofertaCargoId || null,
                cargo_nombre: this.ofertaCargoName || ''
            }
            storageData.set('_vincular_prefill', prefill)
            // Marcar como contratado en backend
            await ofertModule.contratarPostulante({ ofert_postulation_id: item.ofert_postulation_id })
            // Refrescar listado
            await this.getPostulantesAll(this.$route.params.id)
            this.color = 'success'
            this.textmsj = 'Postulante contratado.'
            this.snackbar = true
            this.closeSnackbar()
        } catch (e) {}
        // Navegar a Vincular; si la pantalla soporta prefill por storage, lo tomará, si no, no rompe
        this.$router.push({ name: 'vincular', query: { from: 'oferta', ofertId: String(this.$route.params.id || '') } })
    }
   
    async dataIndex(){  
        this.overlay = true
            let paginateData : any = [];
            const data : any = await ofertModule.getAll()  
            this.desserts = data.data
        this.overlay = false 
    }
    async comboboxAll(){
        const charges : any = await  ofertModule.getCharges();
        this.arrayCharges = charges.data
        // Si ya conocemos el cargo de la oferta, intenta obtener su nombre ahora
        if (this.ofertaCargoId && Array.isArray(this.arrayCharges) && this.arrayCharges.length) {
            const found = this.arrayCharges.find((c:any) => String(c.id) === String(this.ofertaCargoId))
            this.ofertaCargoName = found?.nombre || ''
        }
        const profession : any = await ofertModule.getprofession();
        this.arrayProfession = profession.data
    }
    async updateFecha(){
        this.dataFormCita.fecha = this.date
    }
    onTelefonoInput(val:any){
        const digits = String(val || '').replace(/\D/g, '').slice(0, 10)
        const a = digits.substring(0, 3)
        const b = digits.substring(3, 6)
        const c = digits.substring(6, 10)
        let formatted = ''
        if (a) {
            formatted = `(${a}`
            if (a.length === 3) {
                formatted += ')'
            }
        }
        if (b) {
            formatted += (a.length === 3 ? ' ' : '') + b
        }
        if (c) {
            formatted += (b.length ? '-' : '') + c
        }
        this.dataFormCita.telefono = formatted
    }
    async saveCita(){
        try {
            const valid = await this.$refs.dataFormCita.validate();
            if (!valid) return;

            this.overlayDialog = true;
            const payload = { ...this.FormRequest } as any;

            // Asegurar claves mínimas SIEMPRE
            payload.ofert_id = Number(this.$route.params.id || this.dataFormCita.ofert_id || 0);
            payload.personas_discapacidad_id = Number(payload.personas_discapacidad_id || this.dataFormCita.personas_discapacidad_id || 0);

            // Validar requeridos localmente antes de llamar API
            if (!payload.ofert_id || !payload.personas_discapacidad_id) {
                this.color = 'warning';
                this.textmsj = 'Faltan datos obligatorios: ofert_id y persona.';
                this.snackbar = true;
                this.closeSnackbar();
                return;
            }

            // Asegurar busine_id
            if (!payload.busine_id) {
                payload.busine_id = storageData.get('_bussines').id
            }
            // Enviar flag de notificación solo en creación
            if (!this.validateCita) {
                payload.notify = !!this.notifyEmail;
            }

            const data : any = await ofertModule.saveCita(payload);
            if(data.status === 200){
                this.color = 'success';
                this.textmsj = (!this.validateCita && this.notifyEmail)
                  ? 'Cita guardada y notificación enviada al postulante.'
                  : (this.validateCita ? 'Cita actualizada con éxito.' : 'Cita guardada con éxito.');
                this.snackbar = true;
                this.closeSnackbar();
                this.reset();
                await this.getPostulantesAll(this.$route.params.id);
                this.dialogCita = false;
            } else {
                this.color = 'warning';
                this.textmsj = (data.data && data.data.message) ? data.data.message : 'No fue posible guardar la cita.';
                this.snackbar = true;
                this.closeSnackbar();
            }
        } catch (error) {
            const anyErr: any = error;
            const msg = anyErr?.response?.data?.message || 'Error al guardar la cita.';
            this.color = 'error';
            this.textmsj = msg;
            this.snackbar = true;
            this.closeSnackbar();
        } finally {
            this.overlayDialog = false;
        }
    }
    data(){
        return{
            rules: [
                (v:any) => !!v || 'Campo requerido'
            ],
            rulesTel: [
                (v:any) => !!v || 'Campo requerido',
                (v:any) => (/^\(\d{3}\)\s?\d{3}-\d{4}$/.test(String(v || ''))) || 'Formato: (412) 016-9750',
            ],
            emailRules: [
                (v:any) => !!v || 'E-mail is requerido',
                (v:any) => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            rulesNum: [
                (v:any) => v >= 0  || 'Campo Requerido',
            ],
            textRules: [
                (v:any) => !!v || 'Campo Requerido',
                (v:any) => /^[A-Za-z-0-9]+$/.test(v) || 'Campo No acepta caracteres especiales',
                (v:any) => (v && v.length <= 10) || 'Debe ingresar máximo 10 caracteres'
            ],
        }
    }
    mounted(){
        this.getPostulantesAll(this.$route.params.id); 
        this.getOferta(this.$route.params.id)
        this.comboboxAll(); 
        this.empresaname = storageData.get('_bussines').rif + '-' + storageData.get('_bussines').company_name
        this.dataFormCita.fecha = this.date
        this.dataFormCita.ofert_id = Number(this.$route.params.id || 0)
        this.dataFormCita.busine_id = storageData.get('_bussines').id
    }
}
</script>
<style lang="scss" scoped>
    .form_data_section{
        background: white;
        border-radius: 8px;
        width: 100%;
        padding: 20px;
    }
    .content-section{
        display: flex;
        justify-content: center;
    }
    .col-md-6{
        padding: 2px;
    }
    @media screen and (max-width:374px){
        .form_data_section{
           width: 100%;
        }
    }    
    @media screen and (min-width:375px) and (max-width:424px){
        .form_data_section{
        width: 100%;
        }   
    }   
    @media screen and (min-width:425px) and (max-width:830px){
        .form_data_section{
            width: 100%;
        }  
    }
</style>
