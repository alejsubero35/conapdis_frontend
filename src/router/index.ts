import Vue from 'vue'
import Router from 'vue-router'
// Containers
const TheContainer            = () => import('@/containers/TheContainer.vue')

// Views
const Dashboard               = () => import('@/views/dashboard/Dashboard.vue')
//Módulos

// Users  
const User                    = () => import('@/views/modulos/users/User.vue')
const CreateUser              = () => import('@/views/modulos/users/CreateUser.vue')
const EditUser                = () => import('@/views/modulos/users/EditUser.vue')
const Login                   = () => import('@/views/auth/Login.vue')
const Logout                  = () => import('@/views/auth/Logout.vue')
const UpdatePassword          = () => import('@/views/auth/UpdatePassword.vue')
// Bussines
const Bussines                = () => import('@/views/modulos/Bussines/Bussines.vue')
//requirements
const Requeriments            = () => import('@/views/modulos/Requeriment/Requeriments.vue')
//Notificaciones
const Notification            = () => import('@/views/modulos/Notification/Notification.vue')
const PdfNotification         = () => import('@/views/modulos/Notification/PdfNotification.vue')
const PlanillaSolicitud       = () => import('@/views/modulos/Notification/PlanillaSolicitud.vue')
//Acta de Cumplimiento
const ActaCumplimiento        = () => import('@/views/modulos/Acta/ActaCumplimiento.vue')
//Certificado ABI
const CertificadoAbi          = () => import('@/views/modulos/Certificado/CertificadoAbi.vue')




//requirements Bussines
const RequerimentsBussines            = () => import('@/views/modulos/RequerimentBussines/RequerimentsBussines.vue')
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
          meta: { Auth: true, title: 'Bussines' },
     
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
        {
          path: 'pdfnotification/:id',
          name: 'pdfnotification',
          component: PdfNotification,
          meta: { Auth: true, title: 'PdfNotification' },
     
        },   
        {
          path: 'solicitudinspeccion',
          name: 'solicitudinspeccion',
          component: PlanillaSolicitud,
          meta: { Auth: true, title: 'PlanillaSolicitud' },
     
        },   
        {
          path: 'actacumplimiento',
          name: 'actacumplimiento',
          component: ActaCumplimiento,
          meta: { Auth: true, title: 'ActaCumplimiento' },
     
        },      
        {
          path: 'requerimentsbussines',
          name: 'requerimentsbussines',
          component: RequerimentsBussines,
          meta: { Auth: true, title: 'RequerimentsBussines' },
     
        },   
        {        
          path: 'certificadoabi',
          name: 'certificadoabi',
          component: CertificadoAbi,
          meta: { Auth: true, title: 'CertificadoAbi' },
     
        },       
      ]
      
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


router.beforeEach((to?:any, from?:any, next?:any) => {
 document.title = to.meta.title;
 ///console.log(!!http.defaults.headers.common['Authorization'])
  if (to.meta.Auth && !window.localStorage.getItem('_token')) {
    
    next({ path: '/login' });
  } else {
   
    next();
  }

  
});
export default router;