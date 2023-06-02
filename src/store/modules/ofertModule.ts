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
    name: 'ofertModule',
    store,
    dynamic: true,
  })
  
  class ofertModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');

    @Action({rawError: true})
    async getAll() { 
        const response =  await http.get(`/positions/get_ofert_all`)
        return response;
    }
    @Action
	async save(dataOfert: any) { 
		await http.post(`positions/save_ofert`, dataOfert)
		.then((payload: any) => {
			if(payload){
				dataOfert.code = payload.status
			} else {
				dataOfert.code = 500;
				dataOfert.message = 'Error al procesar la Solicitud';
			}
		})
		return dataOfert;
	}
    @Action
	async update(dataOfert: any) { 
		await http.post(`positions/unlinked`, dataOfert)
		.then((payload: any) => {console.log(payload)
			if(payload){
				dataOfert.code = payload.status
			} else {
				dataOfert.code = 500;
				dataOfert.message = 'Error al procesar la Solicitud';
			}
		})
		return dataOfert;
	}
    @Action
    getCharges() {
        return new Promise((resolve, reject) => {  
        http.get(`/positions/get_charges`)
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
    getprofession() {
        return new Promise((resolve, reject) => {  
        http.get(`/positions/get_profession`)
            .then(response =>  {
            resolve(response); 
        })
        .catch(error => {
            reject(error)
        })
            }) 
    }
    @Action
    getDiscapacidades() {
        return new Promise((resolve, reject) => {  
        http.get(`/positions/get_discapacidades`)
            .then(response =>  {
            resolve(response); 
        })
        .catch(error => {
            reject(error)
        })
            }) 
    }
    @Action
    getOfertById(id) {
       return new Promise((resolve, reject) => {  
          http.get(`/positions/get_ofert_by_id/${id}`)
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
  
  export default getModule(ofertModule);
  