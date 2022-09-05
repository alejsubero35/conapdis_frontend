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
    name: 'users',
    store,
    dynamic: true,
  })
  
  class usersModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');
  
    @Action
	async save(data: Usuarios) { 
	const response =  await http.post('users', data)
		if (response.status === 201){
		
		}
	}  
	@Action
	async update(dataUsers:any) { 
		let data : any = deserialize(dataUsers,{changeCase:'camelCase'});
		let id = data.id

		const response =  await http.patch(`users/${id}`, dataUsers)
		if (response.status === 200 || response.status === 201){
		
		}
	} 
	@Action
	async updatePassword(dataPassword : any) {
		const response =  await https.post('users/resetPassword', dataPassword)
		if (response.status === 200 || response.status === 201){
			return response
		}
	}
	@Action
	async getUserById(id:number){
		return new Promise((resolve, reject) => {
			http.get(`users/${id}?include=customers,roles`)
			.then(response => {
				if (response.status === 200) {   
					let userById : any = [];
					userById = deserialize(response.data)
					resolve(userById);
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
	getCustomers() {
		return new Promise((resolve, reject) => {
			http.get('/customers?sort=-id').then(response => {
	
				if (response.status === 200) {      
				let customers : any = [];
				customers = deserialize(response.data,{changeCase:'camelCase'})
		
				resolve(customers);
				
				}
		})
		.catch(error => {
			reject(error)
		})
		})
	}

  }  
  
  export default getModule(usersModule);
  