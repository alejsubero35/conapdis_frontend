<template>
  <v-dialog v-model="dialogPayment" max-width="500" content-class="modern-dialog">
    <v-card class="modern-card">
      <v-card-title class="modern-title">
        <v-icon color="#1976d2" left>mdi-credit-card-outline</v-icon>
        <span>Pagos en Línea</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close')">
          <v-icon color="#d54949">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="modern-section">
        <div class="modern-note">
          <v-icon color="#ff9800" left small>mdi-alert-circle-outline</v-icon>
          <span class="modern-note-text">Debe cancelar el monto exacto indicado en el campo <b>Monto (Bs.)</b> para procesar su pago correctamente.</span>
        </div>
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
      <v-card-actions class="modern-actions">
      <div class="modern-euro-chip">
        <span class="modern-euro-label">MMV-BCV</span>
        <span class="modern-euro-value">{{ valoreuro }}</span>
      </div>
      <v-spacer></v-spacer>
      <!-- <v-btn color="error" class="modern-btn" @click="$emit('close')">
        <v-icon left small>mdi-close</v-icon>
        Cerrar
      </v-btn> -->
      <v-btn color="primary" class="modern-btn" @click="submitPayment">
        <v-icon left small>mdi-check-circle-outline</v-icon>
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
        const isValid = (this.$refs.paymentForm as any).validate();
        if (!isValid) return;
        if (this.valid) {
            this.formPayment.mmv = this.valoreuro;
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
<style scoped>
.modern-dialog {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
.modern-card {
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  padding: 0;
}
.modern-title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  color: #1c3969;
  padding: 18px 24px 8px 24px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}
.modern-section {
  padding: 18px 24px 24px 24px;
}
.modern-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 16px 24px;
}
.modern-euro-chip {
  display: flex;
  align-items: center;
  background: #e3f2fd;
  border-radius: 24px;
  box-shadow: 0 2px 8px -4px #c3cfe2;
  padding: 8px 18px;
  font-weight: 600;
  font-size: 16px;
  color: #1976d2;
  margin-right: 12px;
  min-width: 120px;
}
.modern-euro-label {
  margin-left: 6px;
  font-weight: 500;
}
.modern-euro-value {
  margin-left: 8px;
  font-weight: 700;
  color: #1c3969;
}
.modern-btn {
  border-radius: 8px;
  font-weight: 600;
  margin-left: 8px;
  min-width: 100px;
  box-shadow: 0 2px 8px -4px #c3cfe2;
}
/* Nota moderna de advertencia */
.modern-note {
  display: flex;
  align-items: center;
  background: #fff8e1;
  border-left: 5px solid #ff9800;
  border-radius: 8px;
  padding: 10px 16px;
  margin-bottom: 18px;
  box-shadow: 0 2px 8px -4px #ffe0b2;
}
.modern-note-text {
  color: #b26a00;
  font-size: 15px;
  font-weight: 500;
  margin-left: 8px;
}
@media (max-width: 600px) {
  .modern-card {
    border-radius: 10px;
  }
  .modern-title, .modern-section, .modern-actions {
    padding-left: 10px;
    padding-right: 10px;
  }
  .modern-euro-chip {
    font-size: 14px;
    padding: 6px 10px;
    min-width: 90px;
  }
  .modern-btn {
    min-width: 80px;
    font-size: 13px;
    padding: 6px 10px;
  }
}
</style>
