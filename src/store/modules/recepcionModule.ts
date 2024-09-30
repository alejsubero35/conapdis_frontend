import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { Roles } from '../interfaces/Roles';
  import { UserToken } from '../interfaces/UserToken';
  import { http, https, get_http } from '@/utils/http';
  import { deserialize } from 'jsonapi-fractal'
  import sessionModule from '@/store/modules/sessionModule';
  import storageData from '@/store/services/storageService'
  
  @Module({
    namespaced: true,
    name: 'Recepción de Equipos',
    store,
    dynamic: true,
  })
  
  class RecepcionModule extends VuexModule {
  
    token: string | null    = localStorage.getItem('_token');
    contacto: Object | null = localStorage.getItem('setContactos');
	items : any = [];
	init  : any = [];
  
	get getCustomerId() {
        return sessionModule.getCustomerId; 
    }
	get getFileList() {
		return this.items
	}
	get getFileListInit() {
		return this.init
	}
	
	@Mutation
	ADD_UPLOAD_FILE(data:any) {
	
		this.items.push(data) 
		console.log(this.items)
		storageData.set('_dataFileList',this.items)			
	}

    @Action
		async save(data: Roles) { 
		const response =  await http.post('/checkequipments', data)
			if (response.status === 201){
                let nota : any = [];
                nota = deserialize(response.data,{changeCase:'camelCase'})
                return nota;  
        
            }
		}  

    @Action({rawError: true})
		async update(data:any) { 
			let dataUpdate : any = deserialize(data,{changeCase:'camelCase'});
			let id = dataUpdate.id

		const response =  await http.patch(`checkequipments/${id}`, data)
			if (response.status === 200 || response.status === 201){}
		}  
    @Action({rawError: true})
		async delete(data : any) { 
		let dataRol : any  = deserialize(data,{changeCase:'camelCase'});
		let id = dataRol.id
		const response =  await http
			.patch(`deliverynotes/${id}`, data)
			if (response.status === 200 || response.status === 201){
				return await this.getAll();
			}
		}
 
	@Action
	getNotaById(id){
		return new Promise((resolve, reject) => {
			http.get(`/deliverynotes/${id}/deliverynotedetails?include=tickets`)
			//http.get(`/deliverynotedetails?filter[note_id]=${id}/tickets&include=plans,serials,errors`)
				.then(response  => {
	
				if (response.status === 200) {   
	
					let nota : any = [];
					nota = deserialize(response.data,{changeCase:'camelCase'})
					resolve(nota);  
			
				}
			})
			.catch(error => {
			reject(error)
			})
		})
	}
	@Action
	getAll(){
		return new Promise((resolve, reject) => {
			http.get(`/checkequipments?include=deliverynotedetails&sort=-id`)
				.then(response  => {
	
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
    async savePhotoEquipment(data){
        const response =  await http.post('/checkequipmentphotos', data)
        if (response.status === 201){
            let photo : any = [];
            photo = deserialize(response.data,{changeCase:'camelCase'})
            return photo;  
    
        }
    }
	@Action({rawError: true})
	async deletePhotoEquipment(data : any) { 
	let dataEquipment : any  = deserialize(data,{changeCase:'camelCase'});
	let id = dataEquipment.id
	const response =  await http
		.patch(`checkequipmentphotos/${id}`, data)
		if (response.status === 200 || response.status === 201){
			return response
		}
	}
	@Action
	addUploadFile(data:any) {
		this.ADD_UPLOAD_FILE(data)
	} 
	@Action
	async getReceptionEquipmentById(id){
		const response =  await http.get(`getserialmovements?filter[checkequipment_id]=${id}`)
		if (response.status === 200){
            let equipment : any = [];
            equipment = deserialize(response.data,{changeCase:'camelCase'})
            return equipment;  
    
        }
	}
	@Action
	async getPhotosReceptionEquipmentById(id){
		const responsePhoto =  await http.get(`checkequipmentphotos?filter[checkequipment_id]=${id}`)
		if (responsePhoto.status === 200){
            let photo : any = [];
            photo = deserialize(responsePhoto.data,{changeCase:'camelCase'})
            return photo;  
    
        }
	}
  } 

  export default getModule(RecepcionModule);
