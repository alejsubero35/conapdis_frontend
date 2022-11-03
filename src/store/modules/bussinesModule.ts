import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { Bussines } from '../interfaces/Bussines';
  import { UserToken } from '../interfaces/UserToken';
  import { http,https } from '@/utils/http';
  import { deserialize } from 'jsonapi-fractal'
  
  @Module({
    namespaced: true,
    name: 'bussines',
    store,
    dynamic: true,
  })
  
  class bussinesModule extends VuexModule {
    getStates() {
      throw new Error('Method not implemented.');
    }
  
    token: string | null = localStorage.getItem('_token');
  
    @Action
	async save(data: Bussines) { 
	const response =  await http.post('busines', data)
		if (response.status === 201){
		
		}
	}  
	@Action
	async update(dataUsers:Bussines) { 
	
		let id = dataUsers.id
		await http.put(`busines/${id}`, dataUsers)
		.then((payload: any) => {
			console.log(payload)
			if(payload){
				dataUsers.code = payload.status
			} else {
				dataUsers.code = 500;
				dataUsers.message = 'Error al procesar la Solicitud';
			}
		})
		return dataUsers;
	} 
	@Action
	async delete(id:any) { 
		const response =  await http.delete(`users/${id}`)
		//if (response.status === 200 || response.status === 201){
			return await this.getAll();
		//}
	}
	@Action
	async updatePassword(dataPassword : any) {
		const response =  await https.put('users/resetPassword', dataPassword)
		if (response.status === 200 || response.status === 201){
			return response
		}
	}
	@Action
	async getUserById(id:number){
		return new Promise((resolve, reject) => {
			http.get(`users/${id}`)
			.then(response => {
				if (response.status === 200) {   
					resolve(response);
				}
			})
		})
	}				
	@Action
	getStatesAll(){
		return new Promise((resolve, reject) => {
			http.get('/states').then(response => {
	
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
	getMunicipality(id){
		return new Promise((resolve, reject) => {
			http.get(`/municipalities/for_state/${id}`).then(response => {
	
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
	getParishes(id){
		return new Promise((resolve, reject) => {
			http.get(`/parishes/for_municipality/${id}`).then(response => {
	
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
	getEconomicSectorAll(){
		return new Promise((resolve, reject) => {
			http.get(`/economic-sectors`).then(response => {
	
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
	getEconomicActiviesAll(){
		return new Promise((resolve, reject) => {
			http.get(`/economic-activies`).then(response => {
	
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
	getTypeCompanyAll(){
		return new Promise((resolve, reject) => {
			http.get(`/company-types`).then(response => {
	
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
	getAll() {
	   return new Promise((resolve, reject) => {  
			  http.get(`/users`)
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
  
  export default getModule(bussinesModule);
  