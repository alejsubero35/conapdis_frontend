import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { User } from '../interfaces/User';
  import { UpdatePassword } from '../interfaces/UpdatePassword';
  import { UserToken } from '../interfaces/UserToken';
  import { http,https } from '@/utils/http';
  import { deserialize } from 'jsonapi-fractal'
  import storageData from '@/store/services/storageService'
  
  @Module({
    namespaced: true,
    name: 'inspeccion',
    store,
    dynamic: true,
  })
  
  class inspeccionModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');

	@Action
	getAll() {
	   return new Promise((resolve, reject) => {  
			  http.get(`/inspection-requests`)
			  .then(response =>  {

				  if (response.status === 200) {     
					  resolve(response); 
				  }
			  })
			  .catch(error => {
				  reject(error)
			  })
		
	   
		  }) 
	   }
     @Action
     getSolicitudById(id) {
        return new Promise((resolve, reject) => {  
           http.get(`/inspection-requests/${id}`)
           .then(response =>  {
             if (response.status === 200) {     
               resolve(response); 
             }
           })
           .catch(error => {
             reject(error)
            })
          }) 
        }
     

  }  
  
  export default getModule(inspeccionModule);
  