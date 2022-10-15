import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { Usuarios } from '../interfaces/Usuarios';
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
  
    token: string | null = localStorage.getItem('_token');
  
    @Action
	async save(data: Usuarios) { 
	const response =  await http.post('users', data)
		if (response.status === 201){
		
		}
	}  
	@Action
	async update(dataUsers:any) { 
	
		let id = dataUsers.id

		const response =  await http.put(`users/${id}`, dataUsers)
		if (response.status === 200 || response.status === 201){
		
		}
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
	getRoles() {
		return new Promise((resolve, reject) => {
			http.get('/roles?sort=-id').then(response => {
	
				if (response.status === 200) {      
				let roles : any = [];
				roles = deserialize(response.data,{changeCase:'camelCase'})
		
				resolve(roles);
				
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
  