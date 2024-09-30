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
    name: 'Cierre de Casos',
    store,
    dynamic: true,
  })
  
  class CierreModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');
    contacto: Object | null = localStorage.getItem('setContactos');
	items : any = [];
  
	get getCustomerId() {
        return sessionModule.getCustomerId; 
    }
	get getFileList() {
		return this.items
	}
	
	@Mutation
	ADD_UPLOAD_FILE(data:any) {
		console.log(data)
		this.items.push(data) 
		storageData.set('_dataFileList',this.items)
				
	}

    @Action
    async save(data: any) { 
    const response =  await http.post('/ticketclosures', data)
        if (response.status === 201){
            let cierre : any = [];
            cierre = deserialize(response.data,{changeCase:'camelCase'})
            return cierre;  
    
        }
    }  

    @Action({rawError: true})
    async update(data:any) { 
        let dataUpdate : any = deserialize(data,{changeCase:'camelCase'});
        let id = dataUpdate.id

    const response =  await http.patch(`ticketclosures/${id}`, data)
        if (response.status === 200 || response.status === 201){}
    }  
    @Action({rawError: true})
    async delete(data : any) { 
    let dataRol : any  = deserialize(data,{changeCase:'camelCase'});
    let id = dataRol.id
    const response =  await http
        .patch(`ticketclosures/${id}`, data)
        if (response.status === 200 || response.status === 201){
            return await this.getAll();
        }
    }
	@Action
	getAll(){
		return new Promise((resolve, reject) => {
			http.get(`/ticketclosures?include=ticketclosuretypes,tickets&sort=-id`)
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
    async savePhotoCloseCase(data){
        const response =  await http.post('/ticketclosurephotos', data)
        if (response.status === 201){
            let photo : any = [];
            photo = deserialize(response.data,{changeCase:'camelCase'})
            return photo;  
    
        }
    }
	@Action({rawError: true})
	async deletePhotoCloseCase(data : any) { 
	let dataEquipment : any  = deserialize(data,{changeCase:'camelCase'});
	let id = dataEquipment.id
	const response =  await http
		.patch(`ticketclosurephotos/${id}`, data)
		if (response.status === 200 || response.status === 201){
			return response
		}
	}
	@Action
	addUploadFile(data:any) {
		this.ADD_UPLOAD_FILE(data)
	} 
	@Action
	async getTicketClosureTypes(){
		const response =  await http.get(`ticketclosuretypes`)
		if (response.status === 200){
            let ticketclosuretypes : any = [];
            ticketclosuretypes = deserialize(response.data,{changeCase:'camelCase'})
            return ticketclosuretypes;  
    
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
    @Action
	getCasoById(id){
		return new Promise((resolve, reject) => {
			http.get(`/tickets/${id}?include=customers,serials,plans,errors,ticketstatuses`)
				.then(response  => {
	
				if (response.status === 200) {   
	
					let ticket : any = [];
					ticket = deserialize(response.data)
					resolve(ticket);  
			
				}
			})
			.catch(error => {
			reject(error)
			})
		})
	}
    @Action
	getTicketClosureById(id){
		return new Promise((resolve, reject) => {
			http.get(`/ticketclosures/${id}?include=tickets,ticketclosuretypes,ticketclosurephotos`)
				.then(response  => {
	
				if (response.status === 200) {   
                    let ticketClosure : any = [];
					ticketClosure = deserialize(response.data,{changeCase:'camelCase'})
					resolve(ticketClosure);   
			
				}
			})
			.catch(error => {
			reject(error)
			})
		})
	}
  } 

  export default getModule(CierreModule);
