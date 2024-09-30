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
    name: 'linkedModule',
    store,
    dynamic: true,
  })
  
  class linkedModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');

    @Action({rawError: true})
    async searchCertificatePerson(query) { 
        const response =  await http.get(`/certifications/search_person_certificate/${query}`)
        return response;
    }
    @Action({rawError: true})
    async getPositionAll() { 
        const response =  await http.get(`/positions/get_all`)
        return response;
    }
    
/*     @Action
    searchCertificatePerson(query) {
		return new Promise((resolve, reject) => {
			http.get(`/positions/search_person_certificate/${query}`)
			.then(response =>  {
				resolve(response);
			})
			.catch(error => {
				reject(error)
			})
		})
    } */
    @Action
	async save(dataLinked: any) { 
		await http.post(`positions/linked`, dataLinked)
		.then((payload: any) => {console.log(payload)
			if(payload){
				dataLinked.code = payload.status
			} else {
				dataLinked.code = 500;
				dataLinked.message = 'Error al procesar la Solicitud';
			}
		})
		return dataLinked;
	}
    @Action
	async update(dataLinked: any) { 
		await http.post(`positions/unlinked`, dataLinked)
		.then((payload: any) => {console.log(payload)
			if(payload){
				dataLinked.code = payload.status
			} else {
				dataLinked.code = 500;
				dataLinked.message = 'Error al procesar la Solicitud';
			}
		})
		return dataLinked;
	}
    @Action
    getPersonLinkedByBussine(id) {
        return new Promise((resolve, reject) => {  
        http.get(`/positions/get_linked_by_bussines/${id}`)
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
	async validateStatement(dataLinked: any) { 
		await http.post(`positions/validate_statement`, dataLinked)
		.then((payload: any) => {
			if(payload){
				dataLinked.code = payload.status
                dataLinked      = payload.data
			} else {
				dataLinked.code = 500;
				dataLinked.message = 'Error al procesar la Solicitud';
			}
		})
		return dataLinked;
	}  
    @Action
    getStatementByBussine(id) {
        return new Promise((resolve, reject) => {  
        http.get(`/positions/get_statement_by_bussines/${id}`)
            .then(response =>  {
            resolve(response); 
        })
        .catch(error => {
            reject(error)
        })
            }) 
        }
 
  }  
  
  export default getModule(linkedModule);
  