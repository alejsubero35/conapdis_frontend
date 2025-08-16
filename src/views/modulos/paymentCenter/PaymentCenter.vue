<template>
  <v-container fluid>
    <!-- Overlay moved to end for z-index above dialogs -->
    <PaymentDialog
      :dialogPayment="dialogPayment"
      :formPayment="selectedPayment"
      :valoreuro="valoreuro"
      @close="dialogPayment = false"
      @pay="processPayment"
    />
    <v-overlay :value="overlay" z-index="3000">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color" />
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center justify-space-between" style="background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%); color: #fff; border-radius: 8px 8px 0 0; min-height: 64px;">
            <v-icon color="white" size="32" class="mr-3">mdi-credit-card-outline</v-icon>
            <span class="font-weight-bold" style="font-size: 1.6rem; letter-spacing: 1px;">Pagos Pendientes de la Empresa</span>
            <v-spacer></v-spacer>
            <v-chip color="white" text-color="#1976d2" class="font-weight-bold" style="font-size: 1rem;">Centro de Pagos</v-chip>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="pendingPayments"
              :loading="loading"
              loading-text="Cargando pagos..."
              class="elevation-1"
              no-data-text="No hay pagos pendientes"
              :footer-props="{ 'items-per-page-options': [5, 10, 20], 'items-per-page-text': 'Pagos por página' }"
            >
              <!-- Monto column custom rendering -->
              <template v-slot:item.amount="{ item }">
                <span v-if="item.remaining_times && Number(item.remaining_times) > 0">
                  {{ Number(item.remaining_times).toFixed(0) }} <span class="grey--text text--darken-2" style="font-size: 0.9em;"> (MMV-BCV)</span>
                </span>
                <span v-else>
                  {{ Number(item.amount).toFixed(0) }} <span class="grey--text text--darken-2" style="font-size: 0.9em;"> (MMV-BCV)</span>
                </span>
              </template>
              <!-- Estado column custom rendering -->
              <template v-slot:item.status="{ item }">
                <span v-if="item.status === 'pending'">
                  <v-badge color="warning" dot>
                    <span class="font-weight-bold" style="color:#856404">Pendiente</span>
                  </v-badge>
                </span>
                <span v-else-if="item.status === 'paid'">
                  <v-badge color="success" dot>
                    <span class="font-weight-bold" style="color:#155724">Pagado</span>
                  </v-badge>
                </span>
                <span v-else-if="item.status === 'partial'">
                  <v-badge color="info" dot>
                    <span class="font-weight-bold" style="color:#0c5460">Parcialmente Pagado</span>
                  </v-badge>
                </span>
                <span v-else>
                  {{ item.status }}
                </span>
              </template>
              <!-- Acciones column custom rendering -->
              <template v-slot:item.actions="{ item }">
                <v-btn small v-if="item.status === 'pending' || item.status === 'partial'" color="primary" @click="openPaymentDialog(item)">
                  <v-icon left>mdi-credit-card</v-icon> Pagar
                </v-btn>
                <v-btn small v-else-if="item.status === 'paid'" color="success">
                  <v-icon left>mdi-check-circle</v-icon> Procesada
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import PaymentDialog from '@/components/PaymentDialog.vue';
import storageData from "@/store/services/storageService";
import paymentModule from "@/store/modules/paymentModule";
import { mapState, mapActions } from 'vuex';
@Component({
  components: { PaymentDialog },

})
export default class PaymentCenter extends Vue {
    loading: boolean = false;
    pendingPayments: any[] = [];
    selectedPayment: any = {};
    dialogPayment: boolean = false;
    headers = [
        { text: 'Monto', value: 'amount' },
        { text: 'Descripción', value: 'description' },
        { text: 'Estado', value: 'status' },
        { text: 'Acciones', value: 'actions', sortable: false },
    ];
    overlay: boolean = false;
    snackbar = false;
    textmsj = "";
    color = "";
    timeout = 2000;
    valoreuro: number = 0;
    mounted() {
        this.fetchPendingPayments();
        this.getvalorEuro();
    }
    async getvalorEuro() {
         const valormmv: any = await paymentModule.getValueMMV();
         if(valormmv.status == 200) {
            this.valoreuro = valormmv.data.value;
         } else {
            this.valoreuro = 0; // Valor por defecto si falla la obtención
         }   
    }
    async fetchPendingPayments() {
        this.overlay = true;
        const bussines = storageData.get("_bussines");

        const pendingPayments: any = await paymentModule.getPendingPayments(bussines.id);
        this.pendingPayments = pendingPayments.data.data;
        this.overlay = false;
    
    }

   openPaymentDialog(item: any) {
    let montoConvertido;
    if (item.remaining_times && Number(item.remaining_times) > 0) {
      montoConvertido = Number(item.remaining_times * this.valoreuro).toFixed(2);
    } else {
      montoConvertido = Number(item.amount * this.valoreuro).toFixed(2);
    }
    this.selectedPayment = { 
        ...item, 
        amount: montoConvertido, // Solo en el modal
        amount_payment: montoConvertido, 
        pending_payment_id: item.id 
    };
    this.dialogPayment = true;
}

   /*  openPaymentDialog(item: any) {
        // Asignar amount_payment y pending_payment_id
        this.selectedPayment = { ...item, amount_payment: item.amount, pending_payment_id: item.id };
        this.dialogPayment = true;
    } */
    async processPayment(paymentData: any) {
        this.overlay = true;
        const process: any = await paymentModule.processPayment(paymentData);
        console.log(process)
        if(process.code === 200){
            this.textmsj = process.message || "Pago Procesado con Éxito.";
            this.color = "success";
            this.snackbar = true;
            this.back();
            this.overlay = false;
            this.dialogPayment = false;
            this.selectedPayment = {}; // Limpiar formulario modal
            this.fetchPendingPayments();
        } else {
            this.textmsj = process.message || "Error al procesar el pago.";
            this.color = "error";
            this.snackbar = true;
            this.back();
            this.selectedPayment = {}; // Limpiar formulario modal
            this.overlay = false;
            this.dialogPayment = false;
          
        }
    }
    back() {
    setTimeout(() => {
      this.snackbar = false;
      //this.$router.go(-1);
    }, 2000);
  }
}
</script>
<style scoped>
.v-card-title {
  background: #f5f5f5;
}
.v-btn {
  min-width: 120px;
}
</style>
