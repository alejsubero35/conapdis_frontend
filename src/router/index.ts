import Vue from 'vue'
import Router from 'vue-router'
import storageData from '@/store/services/storageService'
import { get_http } from '@/utils/http'
// Containers
const TheContainer = () => import('@/containers/TheContainer.vue')

// Views
const Dashboard = () => import('@/views/dashboard/Dashboard.vue')
//Módulos

// Users  
const User = () => import('@/views/modulos/users/User.vue')
const CreateUser = () => import('@/views/modulos/users/CreateUser.vue')
const EditUser = () => import('@/views/modulos/users/EditUser.vue')
const Login = () => import('@/views/auth/Login.vue')
const Logout = () => import('@/views/auth/Logout.vue')
const UpdatePassword = () => import('@/views/auth/UpdatePassword.vue')
// Bussines
const Bussines = () => import('@/views/modulos/Bussines/Bussines.vue')
//requirements
const Requeriments = () => import('@/views/modulos/Requeriment/Requeriments.vue')
//Notificaciones
const Notification = () => import('@/views/modulos/Notification/Notification.vue')
const PdfNotification = () => import('@/views/modulos/Notification/PdfNotification.vue')
const PlanillaSolicitud = () => import('@/views/modulos/inspeccion/PlanillaSolicitud.vue')
//Guia de Inspeccion
const GuiaInspeccion = () => import('@/views/modulos/Guia/GuiaInspeccion.vue')
const PlanillaGuiaInspeccion = () => import('@/views/modulos/Guia/PlanillaGuiaInspeccion.vue')
//Acta de Cumplimiento
const ActaCumplimiento = () => import('@/views/modulos/Acta/ActaCumplimiento.vue')
const PlanillaActaCumplimiento = () => import('@/views/modulos/Acta/PlanillaActaCumplimiento.vue')

//Certificado ABI
const CertificadoAbi = () => import('@/views/modulos/Certificado/CertificadoAbi.vue')
const PlanillaCertificadoAbi = () => import('@/views/modulos/Certificado/PlanillaCertificadoAbi.vue')

//Solicitud de Inspeccion
const SolicitudInspeccion = () => import('@/views/modulos/inspeccion/SolicitudInspeccion.vue')

//Boleta Ordenamiento
const BoletaOrdenamiento = () => import('@/views/modulos/ordenamiento/BoletaOrdenamiento.vue')
const PlanillaBoletaOrdenamiento = () => import('@/views/modulos/ordenamiento/PlanillaBoletaOrdenamiento.vue')

//requirements Bussines
const RequerimentsBussines = () => import('@/views/modulos/RequerimentBussines/RequerimentsBussines.vue')

//vincular / desvincular
const Vincular = () => import('@/views/modulos/Vinculaciones/Vincular.vue')
// centro de pagos
const PaymentCenter = () => import('@/views/modulos/paymentCenter/PaymentCenter.vue')

//Declaraciones 
const Declaraciones = () => import('@/views/modulos/Declaraciones/Declaraciones.vue')
const PlanillaDeclaracion = () => import('@/views/modulos/Declaraciones/PlanillaDeclaracionPDF.vue')

//OfertasLaborales
const OfertasLaborales = () => import('@/views/modulos/Ofertas/OfertaLaboral.vue')
const CrearOfertaLaboral = () => import('@/views/modulos/Ofertas/CrearOfertaLaboral.vue')
const EditarOfertaLaboral = () => import('@/views/modulos/Ofertas/EditarOferta.vue')
const VerPostulantesOferta = () => import('@/views/modulos/Ofertas/PostulantesOferta.vue')
const DownloadCV = () => import('@/views/modulos/Ofertas/DownloadCV.vue')

//SolicitudFormacion
const SolicitudFormacion = () => import('@/views/modulos/SolicitudFormacion/SolicitudFormacion.vue')
const CrearSolicitudFormacion = () => import('@/views/modulos/SolicitudFormacion/CrearSolicitudFormacion.vue')
const VerSolicitudformacion = () => import('@/views/modulos/SolicitudFormacion/VerSolicitudformacion.vue')
const CrearAsistencias = () => import('@/views/modulos/SolicitudFormacion/CrearAsistencias.vue')

//Evaluación de Formación
const EvaluacionFormacion = () => import('@/views/modulos/Evaluacion/Evaluacion.vue')

//Reportes
const Reportes = () => import('@/views/modulos/reportes/Reportes.vue')

//Citas
const Citas = () => import('@/views/modulos/citas/Citas.vue')

//Boletas Sancionatorias
const Boletas = () => import('@/views/modulos/Boletas/Boletas.vue')

//centros educativos
const EducationalCenter = () => import('@/views/modulos/EducationalCenter/EducationalCenter.vue')
const CreateEducationalCenter = () => import('@/views/modulos/EducationalCenter/Create.vue')
//Hospital Center
const HospitalCenter = () => import('@/views/modulos/HospitalCenter/HospitalCenter.vue')
const CreateHospitalCenter = () => import('@/views/modulos/HospitalCenter/Create.vue')
//Ortesis y Protesis
const OrtesisProtesis = () => import('@/views/modulos/OrtesisProtesis/OrtesisProtesis.vue')
const CreateOrtesisProtesis = () => import('@/views/modulos/OrtesisProtesis/Create.vue')
//Laboratorios de Órtesis
const OrtesisLaboratories = () => import('@/views/modulos/OrtesisLaboratories/OrtesisLaboratories.vue')
const CreateOrtesisLaboratories = () => import('@/views/modulos/OrtesisLaboratories/Create.vue')
//Mantenimiento y Reparación
const MantenimientoReparacion = () => import('@/views/modulos/MantenimientoReparacion/MantenimientoReparacion.vue')
const CreateMantenimientoReparacion = () => import('@/views/modulos/MantenimientoReparacion/Create.vue')
//Interpretes
const Interpretes = () => import('@/views/modulos/Interpretes/Interpretes.vue')
const CreateInterpretes = () => import('@/views/modulos/Interpretes/Create.vue')




// Errors
const Page404 = () => import('@/views/errors/Page404.vue')
const Page500 = () => import('@/views/errors/Page500.vue')

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,


      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { Auth: true, title: 'Dashboard' },
        },
        {
          path: 'users',
          name: 'users',
          component: User,
          meta: { Auth: true, title: 'User' },

        },
        {
          path: 'createuser',
          name: 'createuser',
          component: CreateUser,
          meta: { Auth: false, title: 'CreateUser' },

        },
        {
          path: 'edituser/:id',
          name: 'edituser',
          component: EditUser,
          meta: { Auth: true, title: 'EditUser' },

        },
        {
          path: 'updatepassword',
          name: 'updatepassword',
          component: UpdatePassword,
          meta: { Auth: true, title: 'UpdatePassword' },

        },
        {
          path: 'bussines',
          name: 'bussines',
          component: Bussines,
          meta: { Auth: false, title: 'Bussines' },

        },
        {
          path: 'requeriments',
          name: 'requeriments',
          component: Requeriments,
          meta: { Auth: true, title: 'Requeriments' },
        },
        {
          path: 'notification',
          name: 'notification',
          component: Notification,
          meta: { Auth: true, title: 'Notification' },

        },
        /*         {
                  path: 'pdfnotification/:id',
                  name: 'pdfnotification',
                  component: PdfNotification,
                  meta: { Auth: true, title: 'PdfNotification' },
             
                },   */
        {
          path: 'pdfnotification',
          name: 'pdfnotification',
          component: PdfNotification,
          meta: { Auth: true, title: 'PdfNotification' },

        },
        {
          path: 'solicitudinspeccion',
          name: 'solicitudinspeccion',
          component: SolicitudInspeccion,
          meta: { Auth: true, title: 'SolicitudInspeccion' },

        },
        {
          path: 'requerimentsbussines',
          name: 'requerimentsbussines',
          component: RequerimentsBussines,
          meta: { Auth: true, title: 'RequerimentsBussines' },

        },
        {
          path: 'guiainspeccion',
          name: 'guiainspeccion',
          component: GuiaInspeccion,
          meta: { Auth: true, title: 'GuiaInspeccion' },

        },
        {
          path: 'planillaguiainspeccion/:id',
          name: 'planillaguiainspeccion',
          component: PlanillaGuiaInspeccion,
          meta: { Auth: true, title: 'PlanillaGuiaInspeccion' },

        },
        {
          path: 'actacumplimiento',
          name: 'actacumplimiento',
          component: ActaCumplimiento,
          meta: { Auth: true, title: 'ActaCumplimiento' },

        },
        {
          path: 'planillactacumplimiento/:id',
          name: 'planillactacumplimiento',
          component: PlanillaActaCumplimiento,
          meta: { Auth: true, title: 'PlanillaActaCumplimiento' },

        },
        {
          path: 'certificadoabi',
          name: 'certificadoabi',
          component: CertificadoAbi,
          meta: { Auth: true, title: 'CertificadoAbi' },

        },
        {
          path: 'planillacertificadoabi/:id',
          name: 'planillacertificadoabi',
          component: PlanillaCertificadoAbi,
          meta: { Auth: true, title: 'PlanillaCertificadoAbi' },

        },
        {
          path: 'planillasolicitud/:id',
          name: 'planillasolicitud',
          component: PlanillaSolicitud,
          meta: { Auth: true, title: 'PlanillaSolicitud' },

        },
        {
          path: 'boletaordenamiento',
          name: 'boletaordenamiento',
          component: BoletaOrdenamiento,
          meta: { Auth: true, title: 'BoletaOrdenamiento' },

        },
        {
          path: 'planillaboletaordenamiento/:id',
          name: 'planillaboletaordenamiento',
          component: PlanillaBoletaOrdenamiento,
          meta: { Auth: true, title: 'PlanillaBoletaOrdenamiento' },

        },
        {
          path: 'vincular',
          name: 'vincular',
          component: Vincular,
          meta: { Auth: true, title: 'VincularDesvincular' },

        },
        {
          path: 'paymentcenter',
          name: 'paymentcenter',
          component: PaymentCenter,
          meta: { Auth: true, title: 'Centro de Pagos' },
        },
        {
          path: 'declaraciones',
          name: 'declaraciones',
          component: Declaraciones,
          meta: { Auth: true, title: 'Declaraciones' },

        },
        {
          path: 'planilladeclaracion',
          name: 'planilladeclaracion',
          component: PlanillaDeclaracion,
          meta: { Auth: true, title: 'PlanillaDeclaracion' },

        },
        {
          path: 'solicitudformacion',
          name: 'solicitudformacion',
          component: SolicitudFormacion,
          meta: { Auth: true, title: 'SolicitudFormacion' },

        },
        {
          path: 'crearsolicitudformacion',
          name: 'crearsolicitudformacion',
          component: CrearSolicitudFormacion,
          meta: { Auth: true, title: 'CrearSolicitudFormacion' },

        },
        {
          path: 'trainingevaluation/:id',
          name: 'trainingevaluation',
          component: EvaluacionFormacion,
          meta: { Auth: true, title: 'EvaluacionFormacion' },

        },

        {
          path: 'ofertaslaborales',
          name: 'ofertaslaborales',
          component: OfertasLaborales,
          meta: { Auth: true, title: 'OfertasLaborales' },

        },
        {
          path: 'crearofertalaboral',
          name: 'crearofertalaboral',
          component: CrearOfertaLaboral,
          meta: { Auth: true, title: 'CrearOfertaLaboral' },

        },
        {
          path: 'editarofertalaboral/:id',
          name: 'editarofertalaboral',
          component: EditarOfertaLaboral,
          meta: { Auth: true, title: 'EditarOfertaLaboral' },

        },
        {
          path: 'editarsolicitudformacion/:id',
          name: 'editarsolicitudformacion',
          component: VerSolicitudformacion,
          meta: { Auth: true, title: 'EditarSolicitudformacion' },

        },
        {
          path: 'reportes',
          name: 'reportes',
          component: Reportes,
          meta: { Auth: false, title: 'Reportes' },

        },
        {
          path: 'verpostulantesoferta/:id',
          name: 'verpostulantesoferta',
          component: VerPostulantesOferta,
          meta: { Auth: true, title: 'VerPostulantesOferta' },

        },
        {
          path: 'crearasistencia/:id',
          name: 'crearasistencia',
          component: CrearAsistencias,
          meta: { Auth: true, title: 'CrearAsistencias' },

        },
        {
          path: 'citas',
          name: 'citas',
          component: Citas,
          meta: { Auth: true, title: 'Citas' },

        },
        {
          path: 'downloadcv/:id',
          name: 'downloadcv',
          component: DownloadCV,
          meta: { Auth: true, title: 'DownloadCV' },
        },
        {
          path: 'sanctioning_tickets',
          name: 'sanctioning_tickets',
          component: Boletas,
          meta: { Auth: true, title: 'Boletas' },

        },
        {
          path: 'hospitalcenter',
          name: 'hospitalcenter',
          component: HospitalCenter,
          meta: { Auth: true, title: 'HospitalCenter' },
        },
        {
          path: 'createchildren',
          name: 'createchildren',
          component: CreateHospitalCenter,
          meta: { Auth: true, title: 'CrearHospitalCenter' },
        },
        {
          path: 'educationalcenter',
          name: 'educationalcenter',
          component: EducationalCenter,
          meta: { Auth: true, title: 'EducationalCenter' },
        },
        {
          path: 'createstudents',
          name: 'createstudents',
          component: CreateEducationalCenter,
          meta: { Auth: true, title: 'CrearEducationalCenter' },
        },
        {
          path: 'ortesisprotesis',
          name: 'ortesisprotesis',
          component: OrtesisProtesis,
          meta: { Auth: true, title: 'OrtesisProtesis' },
        },
        {
          path: 'createortesis',
          name: 'createortesis',
          component: CreateOrtesisProtesis,
          meta: { Auth: true, title: 'CrearOrtesisProtesis' },
        },
        {
          path: 'ortesislaboratories',
          name: 'ortesislaboratories',
          component: OrtesisLaboratories,
          meta: { Auth: true, title: 'OrtesisLaboratories' },
        },
        {
          path: 'createortesislaboratories',
          name: 'createortesislaboratories',
          component: CreateOrtesisLaboratories,
          meta: { Auth: true, title: 'CrearOrtesisLaboratories' },
        },
        {
          path: 'mantenimientoandreparacion',
          name: 'mantenimientoandreparacion',
          component: MantenimientoReparacion,
          meta: { Auth: true, title: 'MantenimientoReparacion' },
        },
        {
          path: 'createtechnicalhelp',
          name: 'createtechnicalhelp',
          component: CreateMantenimientoReparacion,
          meta: { Auth: true, title: 'CreateMantenimientoReparacion' },
        },
        {
          path: 'interpretes',
          name: 'interpretes',
          component: Interpretes,
          meta: { Auth: true, title: 'Interpretes' },
        },
        {
          path: 'createtelsvinterpreter',
          name: 'createtelsvinterpreter',
          component: CreateInterpretes,
          meta: { Auth: true, title: 'CrearInterpretes' },
        },

      ]
      //
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { Auth: false, title: 'Login' },
      beforeEnter: (to?: any, from?: any, next?: any) => {
        // Si existe un token, la sesion existe, por lo cual, redirecciona a home
        if (!!window.localStorage.getItem('_token')) {
          next({ path: '/' });
        } else {
          next();
        }
      },
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      props: true,
      meta: { Auth: true, title: 'Logout' },
    },





  ]
})


// Rutas permitidas cuando el registro está pendiente (permitimos pagar y salir)
const allowWhenPending = new Set(['paymentcenter', 'Logout', 'Login']);

async function isRegistrationPending(): Promise<boolean> {
  try {
    const bussines = storageData.get('_bussines');
    if (!bussines || !bussines.id) return false; // si no hay empresa cargada, no bloqueamos
    const url = `/payments/pending/${bussines.id}`;
    const resp = await get_http.get(url);
    // Intentamos interpretar múltiples formatos de respuesta
  const data = resp && (resp as any).data ? (resp as any).data : {};
    // Formatos admitidos: { pending: true/false } o { status: 'pending'|'approved' }
    if (typeof data?.pending === 'boolean') return data.pending;
    if (typeof data?.status === 'string') return data.status.toLowerCase() === 'pending';
    // Si el endpoint retorna una lista de pagos, considerar 'paid' como NO pendiente
    const isArrayPending = (arr: any[]): boolean => {
      const paidSet = new Set(['paid', 'pagado', 'processed', 'procesada', 'completed', 'completado']);
      // pendiente si existe algún item cuyo status NO esté en el set de pagado
      return arr.some((it: any) => {
        const st = (it?.status || '').toString().toLowerCase();
        return !paidSet.has(st);
      });
    };
    if (Array.isArray(data)) return isArrayPending(data);
    if (Array.isArray((data as any)?.data)) return isArrayPending((data as any).data);
    // fallback: si no hay señal clara, asumimos PENDING para no abrir acceso indebidamente
    return true;
  } catch (e) {
    // En caso de error de red o 4xx/5xx, asumimos PENDING para no abrir acceso indebidamente
    return true;
  }
}

router.beforeEach(async (to?: any, from?: any, next?: any) => {
  document.title = to.meta.title;
  ///console.log(!!http.defaults.headers.common['Authorization'])
  if (to.meta.Auth && !window.localStorage.getItem('_token')) {

    next({ path: '/login' });
  } else {
    // Verificación de registro pendiente para usuarios autenticados
    const hasToken = !!window.localStorage.getItem('_token');
    if (hasToken) {
      // Si localmente sabemos que NO está pendiente (tras pago exitoso), permitimos navegar sin bloquear
      const localPendingFlag = storageData.get('_pending_registration');
      if (localPendingFlag === false) {
        return next();
      }
      // Si aún no hay empresa en storage, asumimos pendiente por seguridad y redirigimos a pagos
      const bussines = storageData.get('_bussines');
      if (!bussines || !bussines.id) {
        storageData.set('_pending_registration', true);
        if (!allowWhenPending.has(to.name)) {
          return next({ name: 'paymentcenter', query: { notice: 'pending' } });
        }
        return next();
      }
      // Consultar servidor tras login para evitar estados obsoletos
      const pending = await isRegistrationPending();
      storageData.set('_pending_registration', pending);
      if (pending && !allowWhenPending.has(to.name)) {
        return next({ name: 'paymentcenter', query: { notice: 'pending' } });
      }
    }
    next();
  }


});
export default router;