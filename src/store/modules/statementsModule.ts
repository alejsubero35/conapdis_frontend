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
    name: 'solicitudformacion',
    store,
    dynamic: true,
  })
  
  class formacionModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');

	@Action
	getAll() {
        return new Promise((resolve, reject) => {  
                http.get(`/guide-inspections`)
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
    getPeriodsAll() {
        return new Promise((resolve, reject) => {  
            http.get(`/positions/get_periods`)
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
    getPeopleLinkedByBussinesId(id) {
        return new Promise((resolve, reject) => {  
            http.get(`/positions/get_people_linked/${id}`)
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
	async save(dataStatement: any) { 
		await http.post(`positions/save_statement`, dataStatement)
		.then((payload: any) => {
			if(payload){
				dataStatement.code = payload.status
				const busine: any     = payload.data.data
				storageData.set('_bussines', busine);
				this.context.commit('setBussines', busine);

				//this.changeActive()
			} else {
				dataStatement.code = 500;
				dataStatement.message = 'Error al procesar la Solicitud';
			}
		})
		return dataStatement;
	}  
    @Action
	async validateStatement(dataStatement: any) { 
		await http.post(`positions/validate_statement`, dataStatement)
		.then((payload: any) => {
			if(payload){
				dataStatement.code = payload.status
                dataStatement      = payload.data
			} else {
				dataStatement.code = 500;
				dataStatement.message = 'Error al procesar la Solicitud';
			}
		})
		return dataStatement;
	}  
    @Action
    getStatementByBussine(id) {
        return new Promise((resolve, reject) => {  
        http.get(`/positions/get_statement_by_bussines/${id}`)
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
  