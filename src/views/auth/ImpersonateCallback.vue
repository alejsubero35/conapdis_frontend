<template>
  <div class="impersonate-container">
    <div class="impersonate-card">
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Cargando...</span>
        </div>
        <p class="mt-3">Iniciando sesión como empresa...</p>
      </div>
      <div v-else-if="error" class="text-center text-danger">
        <i class="fa fa-exclamation-triangle fa-3x mb-3"></i>
        <p>{{ error }}</p>
        <button class="btn btn-primary mt-2" @click="goToLogin">Ir al Login</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import storageData from '@/store/services/storageService';
import { URLBASE } from '@/utils/http';

@Component
export default class ImpersonateCallback extends Vue {
  loading = true;
  error = '';

  async mounted() {
    const code = this.$route.query.code as string;

    if (!code) {
      this.error = 'Código de impersonación no proporcionado.';
      this.loading = false;
      return;
    }

    try {
      const resp = await axios.get(
        `${URLBASE}/api/v1/impersonate/exchange`,
        { params: { code } }
      );

      const data = resp.data;

      if (!data || !data.access_token || !data.user) {
        this.error = 'Respuesta inválida del servidor.';
        this.loading = false;
        return;
      }

      // Limpiar sesión anterior
      localStorage.clear();

      // Guardar exactamente igual que el login normal
      const user = data.user;
      const fullName = (user.first_name || '') + ' ' + (user.last_name || '');

      storageData.set('_token', data.access_token);
      storageData.set('_user_id', user.id);
      storageData.set('_nameUser', fullName.trim());
      storageData.set('_User', user);
      storageData.set('_bussines', user.busine || null);
      storageData.set('_bussines_id', user.empresa_id || null);

      // Marcar como sesión impersonada y guardar URL de retorno al admin
      storageData.set('_impersonated', true);
      storageData.set('_impersonate_admin_url', data.admin_url || '');

      // Redirigir al dashboard
      this.$router.push('/dashboard');
    } catch (e: any) {
      const msg =
        e.response && e.response.data && e.response.data.message
          ? e.response.data.message
          : 'Error al procesar la impersonación.';
      this.error = msg;
      this.loading = false;
    }
  }

  goToLogin() {
    this.$router.push('/login');
  }
}
</script>

<style scoped>
.impersonate-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f7fa;
}
.impersonate-card {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  min-width: 320px;
}
</style>
