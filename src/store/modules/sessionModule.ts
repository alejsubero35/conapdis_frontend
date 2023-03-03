import {
	getModule,
	Module,
	MutationAction,
	Mutation,
	Action,
	VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { UserSubmit } from '../interfaces/Auth';
  import { UserToken } from '../interfaces/UserToken';
  import { http } from '@/utils/http';
  import { User } from '../interfaces/User';
  import storageData from '@/store/services/storageService'
  
  @Module({
	namespaced: true,
	name: 'InitSession',
	store,
	dynamic: true,
  })
  
  class sessionModule extends VuexModule {
  
	  	token : string = '';
	  	refresh_token: string | null = localStorage.getItem('_refresh_token');
	  	tokens: UserToken[] = [];
	  	userSesion: User[] = [];
	 	user_id : any = '';
	  	rolename : string = ''
	  	customer_id : any = '';
	  	nameuser : any = '';
		bussines: User[] = [];
		user : any = '';
  
		get getTokens() {
			return storageData.get('_token');
		}
  
		get getUserId() {
			return  storageData.get('_user_id');
		}
  
		get getRole() {
			return  storageData.get('_rolename');
		}
  
		get getCustomerId() {
			return  storageData.get('_customer_id');
		}
		get getNameUser() {
			return  storageData.get('_nameUser');
		}
		get getBussines() {
			return  storageData.get('_bussines');
		}
		@Mutation
		setTokens(tokens: UserToken[]) {
			this.tokens = tokens;
		}
		@Mutation
		setToken(token: string) {
			this.token = token;
		}
		@Mutation
		setRefresh_token(refresh_token: string) {
			this.refresh_token = refresh_token;
		}
		@Mutation
		destroyTokens() {
			this.tokens = [];
		}
		@Mutation
		destroyToken() {
			this.token = '';
			this.refresh_token = null;
		}
		@Mutation
		setUserId(user_id: any) {
			this.user_id = user_id;
		}
		@Mutation
		setRoleName(rolename: any) {
			this.rolename = rolename;
		}
		@Mutation
		setCustomerId(customer_id: any) {
			this.customer_id = customer_id;
		}
		@Mutation
		setNameUser(nameuser: any) {
			this.nameuser = nameuser;
		}
		@Mutation
		setBussines(bussines: any) {
			this.bussines = bussines;
		}
		@Mutation
		setUser(user: any) {
			this.user = user;
		}

  
		@Action
	  	async login(userLogin: UserSubmit) {
		  	await http.post('/login', userLogin)
	  
		  	.then((payload: any) => {

			
				if (payload.data) {
					const login = payload.data
					userLogin.code = payload.status
				
				if (userLogin.code == 200) {
		
					const stoken: string  = login.access_token;
					const user: string = login.user
					const user_id: string = login.user.id
					const busine: any     = login.user.busine[0]
					const full_name: string = login.user.first_name + ' ' + login.user.last_name

					storageData.set('_token', stoken);
					storageData.set('_user_id', user_id);
					storageData.set('_bussines', busine);
					storageData.set('_nameUser', full_name);
					storageData.set('_User', user);
			
					this.context.commit('setToken', stoken);
					this.context.commit('setTokens', payload.data.data);
					this.context.commit('setUserId', user_id);
					this.context.commit('setBussines', busine);
					this.context.commit('setNameUser', full_name);
					this.context.commit('setUser', user);
			
				} 
			  } else {
				userLogin.code    = payload.code;
				userLogin.message = payload.message;
			  }
		  })
	
		  return userLogin;
	  	}
  
		@Action
		async logout() {
			await http.post('/logout')
			.then((payload: any) => {
				storageData.remove('_token');
				storageData.remove('_user_id');
				storageData.remove('_bussines');
				storageData.remove('bussines_id');
				
				return payload;
			})
			.catch((e) => console.log('Error ${e}'));
		}
  
		@Action
		async getRefreshToken() {
			const stoken: string = ''
			await http
			.post('refreshtoken',
				{
				'refresh_token': this.refresh_token
				})
			.then((payload: any) => {
				if (payload) {
				if (payload.data.code === 200) {
					const stoken: string = payload.data.data.access_token;
					const srefresh_token: string = payload.data.data.refresh_token;
					storageData.set('_token', stoken);
					storageData.set('_refresh_token', srefresh_token);
					this.context.commit('setToken', stoken);
					this.context.commit('setRefresh_token', srefresh_token);
				}
				}
			})
			.catch((err) => {
				console.log(err.data.error);
				return false;
			});
			return true;
		}
		@Action
		async getPositionAll(){
			return new Promise((resolve, reject) => {
				http.get(`/positions`).then(response => {
		
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
  export default getModule(sessionModule);
  