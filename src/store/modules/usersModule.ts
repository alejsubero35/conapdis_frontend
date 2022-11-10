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
    name: 'users',
    store,
    dynamic: true,
  })
  
  class usersModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');
  
    @Action
	async save(dataUsers: User) { 
		await http.post(`users/store_bussiness`, dataUsers)
		.then((payload: any) => {

			if(payload){
				dataUsers.code = payload.status
				const stoken: string  = payload.data.data.access_token;
				storageData.set('_token', stoken);
			} else {
				dataUsers.code = 500;
				dataUsers.message = 'Error al procesar la Solicitud';
			}
		})
		return dataUsers;
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
	async updatePassword(dataPassword : UpdatePassword) {
		const payload : any =  await http.post('change-password', dataPassword)
		console.log(payload)
		if (payload.data) {console.log(1)
			dataPassword.code = payload.status
		} else {console.log(2)
			dataPassword.code    = payload.code;
			dataPassword.message = payload.message;
		}

		return dataPassword;
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
  
  export default getModule(usersModule);
  