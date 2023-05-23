import 'core-js/stable'
import Vue from 'vue'
import _Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from '@/assets/icons/icons'
import store from './store'
import '@/pwa/register-service-worker'
import { ValidationProvider, ValidationObserver } from '@/vee-validate'
import responseError                          from '@/components/responseError.vue';
import UploadFileMultiple                   from '@/components/UploadFileMultiple.vue';
import Camera                             from '@/components/CapturePhoto.vue';
import Notificacion                   from '@/components/Notificaciones.vue';
import TitleSection                 from '@/components/TituloSection.vue'
import ModalDelete                from '@/components/ModalDelete.vue';
import DataTable                from '@/components/MainDataTable.vue'
import ButtonOpen             from '@/components/ButtonOpen.vue';
import Filtro               from '@/components/BuscadorGeneral.vue';
//import Filtro               from '@/components/BuscadorGeneralOriginal.vue';
import Alertas          from '@/components/Alertas.vue';
import vuetify        from './plugins/vuetify'
import FormWizard   from 'vue-form-wizard'
import VueSweetalert2 from 'vue-sweetalert2';
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import VueMask from 'v-mask'
import CKEditor from 'ckeditor4-vue';


Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('UploadFileMultiple', UploadFileMultiple);
Vue.component('responseError',   responseError);
Vue.component('Notificacion',   Notificacion);
Vue.component('TitleSection', TitleSection);
Vue.component('ModalDelete', ModalDelete);
Vue.component('ButtonOpen', ButtonOpen);
Vue.component('DataTable', DataTable);
Vue.component('Alertas',  Alertas);
Vue.component('Camera',  Camera);
Vue.component('Filtro', Filtro);

Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.use(FormWizard);
Vue.use(VueSweetalert2);
Vue.use(VueMask);
Vue.use(CKEditor);
//Vue.config.productionTip = false;


Vue.prototype.$log = console.log.bind(console)



new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  vuetify,
  render: h => h(App)
})


