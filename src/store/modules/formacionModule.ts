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
    name: 'formacionModule',
    store,
    dynamic: true,
  })
  
  class formacionModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');

    @Action({rawError: true})
    async getRequestAll() { 
        const response =  await http.get(`/positions/get_request_all`)
        return response;
    }
     @Action
     getWorkshopsAll() {
        return new Promise((resolve, reject) => {  
           http.get(`/positions/get_workshops`)
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
	async save(dataRequest: any) { 
		await http.post(`positions/save_request`, dataRequest)
		.then((payload: any) => {
		if(payload){
			dataRequest.code = payload.status
		} else {
			dataRequest.code = 500;
			dataRequest.message = 'Error al procesar la Solicitud';
		}
		})
		return dataRequest;
	}
	@Action
    getRequestById(id) {
        return new Promise((resolve, reject) => {  
            http.get(`/positions/get_request_by_id/${id}`)
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
  
  export default getModule(formacionModule);
  