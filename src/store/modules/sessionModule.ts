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
import { fetchUser } from '@/utils/utility'
import { deserialize } from 'jsonapi-fractal'
import storageData from '@/store/services/storageService'

@Module({
  namespaced: true,
  name: 'session',
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

  	@Action
	async login(userLogin: UserSubmit) {
		await http.post('users/login', userLogin)
	
		.then((payload: any) => {
			if (payload) {
			const login = deserialize(payload.data)
			userLogin.code = payload.status
		
	
			if (userLogin.code === 200) {
				const stoken: string  = login.access_token;
				const user_id: string = login.id
				const rolename: string = login.role.name
				const customer_id: string = login.customer_id
				const nameUser: string  = login.name;				
				storageData.set('_token', stoken);
				storageData.set('_user_id', user_id);
				storageData.set('_rolename', rolename);
				storageData.set('_customer_id', customer_id);
				storageData.set('_nameUser', nameUser);
				this.context.commit('setToken', stoken);
				this.context.commit('setTokens', payload.data.data);
				this.context.commit('setUserId', user_id);
				this.context.commit('setRoleName', rolename);
				this.context.commit('setCustomerId', customer_id);
				this.context.commit('setNameUser', nameUser);

			}
			} else {
			userLogin.code == 500;
			userLogin.message = 'Error grave con Servidor';
			}
		})
		.catch((e) => {
			userLogin.code = 500;
			userLogin.message = 'Error 500 grave con Servidor ';
		});
		return userLogin;
	}

	@Action
	async logout() {
		await http.post('users/logout')
		.then((payload: any) => {
			storageData.remove('_token');
			storageData.remove('_refresh_token');
			storageData.remove('filterActive');
			this.context.commit('destroyToken');
			this.context.commit('destroyTokens');
			storageData.remove('invoice_id');
			storageData.remove('invoice_item_id');
			storageData.remove('invoiceForm');
			storageData.remove('customer_id');
			storageData.remove('_user_id');
			storageData.remove('_rolename');
			storageData.remove('_nameUser');
			storageData.remove('recepcion_id');
			storageData.remove('id_nota');
			storageData.remove('_customer_id');
	

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
	
	}
export default getModule(sessionModule);
