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
import { http, https } from '@/utils/http';
import { deserialize } from 'jsonapi-fractal'
import storageData from '@/store/services/storageService'

@Module({
	namespaced: true,
	name: 'Bussines',
	store,
	dynamic: true,
})

class bussinesModule extends VuexModule {
	getStates() {
		throw new Error('Method not implemented.');
	}

	token: string | null = localStorage.getItem('_token');
	bussines: Bussines[] = [];
	active: ''
	get getBussines() {
		return storageData.get('_bussines');
	}

	get bussinesActive() {
		return this.active
	}

	@Mutation
	setBussines(bussines: any) {
		this.bussines = bussines;
	}
	@Mutation
	setBussinesActive(active: any) {
		console.log(active)
		this.active = active;
	}

	@Action
	async changeActive(valor) {
		this.setBussinesActive(valor);
	}

	@Action
	async save(dataUsers: Bussines) {
		await http.post(`busines`, dataUsers)
			.then((payload: any) => {

				if (payload) {
					dataUsers.code = payload.status
				} else {
					dataUsers.code = 500;
					dataUsers.message = 'Error al procesar la Solicitud';
				}
			})
		return dataUsers;
	}
	@Action
	async update(dataUsers: Bussines) {

		let id = dataUsers.id
		await http.put(`busines/${id}`, dataUsers)
			.then((payload: any) => {

				if (payload) {
					dataUsers.code = payload.status
					const busine: any = payload.data.data
					storageData.remove('_bussines');
					storageData.set('_bussines', busine);
					//this.context.commit('setBussines', busine);
					this.context.commit('setBussinesActive', 1);

				} else {
					dataUsers.code = 500;
					dataUsers.message = 'Error al procesar la Solicitud';
				}
			})
		return dataUsers;
	}
	@Action
	async delete(id: any) {
		const response = await http.delete(`users/${id}`)
		//if (response.status === 200 || response.status === 201){
		return await this.getAll();
		//}
	}
	@Action
	async updatePassword(dataPassword: any) {
		const response = await https.put('users/resetPassword', dataPassword)
		if (response.status === 200 || response.status === 201) {
			return response
		}
	}
	@Action
	async getUserById(id: number) {
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
	getStatesAll() {
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
	getUserTypeAll() {
		return new Promise((resolve, reject) => {
			http.get('/user-types').then(response => {

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
	getMunicipality(id) {
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
	getParishes(id) {
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
	getSectores(id) {
		return new Promise((resolve, reject) => {
			http.get(`/parishes/sectror_for_parishes/${id}`).then(response => {

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
	getEconomicSectorAll() {
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
	getEconomicActiviesAll() {
		return new Promise((resolve, reject) => {
			http.get(`positions/economic-activies`).then(response => {

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
	getTypeCompanyAll() {
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
	getTyperifAll() {
		return new Promise((resolve, reject) => {
			http.get(`/training/get_typerif`).then(response => {

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
	getTypeDocumentAll() {
		return new Promise((resolve, reject) => {
			http.get(`/training/get_typeDocument`).then(response => {

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
			http.get(`/busines`)
				.then(response => {

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
	getDocumentsAll() {
		return new Promise((resolve, reject) => {
			http.get(`/document-requirements`)
				.then(response => {

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
	async saveDocuments(dataDocuments: any) {

		await http.post(`document-bussines/store_documents`, dataDocuments).then((payload: any) => {

			if (payload) {
				dataDocuments.code = payload.status
			} else {
				dataDocuments.code = 500;
				dataDocuments.message = 'Error al procesar la Solicitud';
			}
		})
		return dataDocuments;
	}
	@Action
	existRif(value) {
		return new Promise((resolve, reject) => {
			http.get(`/busines/validate_rif/${value}`)
				.then(response => {

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
	validateEmailRL(value) {
		return new Promise((resolve, reject) => {
			http.get(`/busines/validate_email/${value}`)
				.then(response => {

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
	async getPositionAll() {
		return new Promise((resolve, reject) => {
			http.get(`/positions/position_representative_legal`).then(response => {
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
