<template>
  <v-dialog v-model="dialogPayment" width="700">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Pagos en Línea
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="paymentForm" v-model="valid" lazy-validation>
            <input type="hidden" v-model="formPayment.id" >
            <input type="hidden" v-model="formPayment.pending_payment_id" readonly>
          <v-row>
            <v-col cols="4">
              <v-subheader>Banco Emisor</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-select
                :items="bankArray"
                item-text="nombre"
                item-value="codigo"
                outlined
                dense
                required
                :rules="[v => !!v || 'Banco requerido']"
                label="Banco Emisor"
                @change="getBankData($event)"
                return-object
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="4">
              <v-subheader>Monto (Bs.)</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                dense
                outlined
                v-model="formPayment.amount_payment"
                type="number"
                min="0"
                :rules="[v => !!v || 'Monto requerido', v => v > 0 || 'Monto debe ser mayor a 0']"
                label="Monto"
                required
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
         <!--  <v-row class="mt-0">
            <v-col cols="4">
              <v-subheader>Nombres y Apellidos</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                dense
                outlined
                v-model="formPayment.fullname"
                :rules="[v => !!v || 'Nombre requerido']"
                label="Nombres y Apellidos"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="4">
              <v-subheader>Cédula</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                dense
                outlined
                type="number"
                min="0"
                v-model="formPayment.identity_card"
                :rules="[v => !!v || 'Cédula requerida', v => v > 0 || 'Cédula inválida']"
                label="Cédula"
                required
              ></v-text-field>
            </v-col>
          </v-row> -->
          <v-row class="mt-0">
            <v-col cols="4">
              <v-subheader>Teléfono</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                dense
                outlined
                v-model="formPayment.phone_orig"
                v-mask="'###########'"
                :rules="[v => !!v || 'Teléfono requerido', v => /^(\d{4}\d{7})$/.test(v) || 'Teléfono inválido']"
                label="Teléfono"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="4">
              <v-subheader>Referencia</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                dense
                outlined
                type="number"
                v-model="formPayment.nro_referencia"
                :rules="[v => !!v || 'Referencia requerida']"
                label="Referencia"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn class="ml-0" style="margin-right:auto;">
          <span>MMV-BCV = {{ valoreuro }}</span>
        </v-btn>
        <v-btn color="error" text @click="$emit('close')">
          Cerrar
        </v-btn>
        <v-btn color="primary" text @click="submitPayment">
          Pagar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class PaymentDialog extends Vue {
    @Prop({ default: false }) dialogPayment!: boolean;
    @Prop({ default: () => ({}) }) valoreuro!: number;
    @Prop({ default: () => ({}) }) formPayment!: any;
    valid: boolean = false;
    bankArray = [
        {
        codigo: "0001",
        nombre: "Banco Central de Venezuela",
        rif: "G200001100",
        },
        {
        codigo: "0102",
        nombre: "Banco de Venezuela",
        rif: "G200099976",
        },
        {
        codigo: "0104",
        nombre: "Banco Venezolano de Crédito",
        rif: "J000029709",
        },
        {
        codigo: "0105",
        nombre: "Banco Mercantil",
        rif: "J000029610",
        },
        {
        codigo: "0108",
        nombre: "BBVA Provincial",
        rif: "J000029679",
        },
        {
        codigo: "0114",
        nombre: "Bancaribe",
        rif: "J000029490",
        },
        {
        codigo: "0115",
        nombre: "Banco Exterior",
        rif: "J000029504",
        },
        {
        codigo: "0128",
        nombre: "Banco Caroní",
        rif: "J095048551",
        },
        {
        codigo: "0134",
        nombre: "Banesco",
        rif: "J070133805",
        },
        {
        codigo: "0137",
        nombre: "Banco Sofitasa",
        rif: "J090283846",
        },
        {
        codigo: "0138",
        nombre: "Banco Plaza",
        rif: "J002970553",
        },
        {
        codigo: "0146",
        nombre: "Bangente",
        rif: "J301442040",
        },
        {
        codigo: "0151",
        nombre: "BFC Banco Fondo Común",
        rif: "J000723060",
        },
        {
        codigo: "0156",
        nombre: "100% Banco",
        rif: "J085007768",
        },
        {
        codigo: "0157",
        nombre: "DELSUR Banco Universal",
        rif: "J000797234",
        },
        {
        codigo: "0163",
        nombre: "Banco Del Tesoro",
        rif: "G200051876",
        },
        {
        codigo: "0166",
        nombre: "Banco Agrícola de Venezuela",
        rif: "G200057955",
        },
        {
        codigo: "0168",
        nombre: "Bancrecer",
        rif: "G200068973",
        },
        {
        codigo: "0169",
        nombre: "Mi Banco",
        rif: "J315941023",
        },
        {
        codigo: "0171",
        nombre: "Banco Activo",
        rif: "J080066227",
        },
        {
        codigo: "0172",
        nombre: "Bancamiga",
        rif: "J316287599",
        },
        {
        codigo: "0173",
        nombre: "Banco Internacional de Desarrollo",
        rif: "J294640109",
        },
        {
        codigo: "0174",
        nombre: "Banplus",
        rif: "J000423032",
        },
        {
        codigo: "0175",
        nombre: "Banco Bicentenario del Pueblo",
        rif: "G200091487",
        },
        {
        codigo: "0177",
        nombre: "Banfanb",
        rif: "G200106573",
        },
        {
        codigo: "0191",
        nombre: "Banco Nacional de Crédito (BNC)",
        rif: "J309841327",
        },
        {
        codigo: "0601",
        nombre: "Instituto Municipal de Crédito Popular",
        rif: "G200068973",
        },
    ];
  
    submitPayment() {
        (this.$refs.paymentForm as any).validate();
        if (this.valid) {
        this.$emit('pay', this.formPayment);
        }
    }
    getBankData(event: any) {
        if (event) {
            this.formPayment.bank_name = event.nombre;
            this.formPayment.banco_orig = event.codigo;
        } else {
            this.formPayment.bank_name = '';
        }
    }
}
</script>
