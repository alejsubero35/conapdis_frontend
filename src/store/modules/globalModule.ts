	import {getModule, Module, Action, VuexModule,  Mutation,} from 'vuex-module-decorators';
  	import store from '@/store';
  	import { http } from '@/utils/http';
  	import { deserialize } from 'jsonapi-fractal'
  	import sessionModule from '@/store/modules/sessionModule';
	import storageData from '@/store/services/storageService'
  
	@Module({
		namespaced: true,
		name: 'global',
		store,
		dynamic: true,
	})
  
  	class globalModule extends VuexModule {
  
    token = sessionModule.getTokens;

	get getCustomerId() {
        return sessionModule.getCustomerId; 
    }

	get getUserId() {
        return sessionModule.getUserId; 
    }


	@Action({rawError: true})
	async searchFilter(query) { 
		const response =  await http.post(`/positions/get_search_filter`,query)
		return response;
		
	}
	@Action({rawError: true})
	async getGenerateReport(dataReport:any) { 
	let data : any = deserialize(dataReport,{changeCase:'camelCase'});
	let format = data.format
	let id =   storageData.get('report_id') 
	const response =  await http.post(`reports/${id}/-actions/generate`,dataReport,{
		responseType: 'arraybuffer'
	})
		if (response.status === 200 || response.status === 201){
			if(format == 'pdf'){
				let blob = new Blob([response.data], {
					type: 'application/pdf'
				})
				let link = document.createElement('a')
				link.href = window.URL.createObjectURL(blob)
				link.download = 'Reporte-'+id+'.pdf'
				link.click()
			}else{
				const fileURL = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement("a");
				link.href = fileURL;
				link.setAttribute("download", 'Reporte-'+id+'.xlsx');
				document.body.appendChild(link);
				link.click();
			}
  
		}else{
			dataReport.code = 500;
			dataReport.message = 'No hay datos para mostrar el reporte'; 
			return dataReport
		}
	 
	}  
	@Action
	getFilterSearch(data:any) {
		return new Promise((resolve, reject) => {

		  http.get(`/${data.endpoint}?filter[${data.filter}]=${data.query}&sort=-id`)
		  .then(response =>  {
	
			if (response.status === 200) {      
				let search : any = [];
				search = deserialize(response.data)
				resolve(search);
			}
		  })
		  .catch(error => {
		reject(error)
	  })
	

	})
  }
    @Action
    getSearchContacByclient(data:any) {
      	return new Promise((resolve, reject) => {
          http.get(`contactos?filter[id_cliente]=${data.query}`)
          .then(response =>  {
        
				if (response.status === 200) {      
					let search : any = [];
					search = deserialize(response.data)
					resolve(search);
				}
          })
          .catch(error => {
            reject(error)
          })
        })
    }
	  @Action
	  dataPaginate(endpoint:any) {
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
		 
		 @Action
		 searchPlan(query:any){
			return new Promise((resolve, reject) => {
          	http.get(`plans?filter[name]=${query}`)
          	.then(response =>  {
				if (response.status === 200) {      
					let search : any = [];
					search = deserialize(response.data)
					resolve(search);
				}
			})
			.catch(error => {
				reject(error)
			})
			})
		 }
		 @Action
		 searchErrors(query:any){
			return new Promise((resolve, reject) => {
          	http.get(`errors?filter[name]=${query}`)
          	.then(response =>  {
				if (response.status === 200) {      
					let search : any = [];
					search = deserialize(response.data)
					resolve(search);
				}
			})
			.catch(error => {
				reject(error)
			})
			})	
		 }
		 @Action
		 searchSerials(query:any){
			return new Promise((resolve, reject) => {
          	http.get(`serials?filter[serial]=${query}`)
          	.then(response =>  {
				if (response.status === 200) {      
					let search : any = [];
					search = deserialize(response.data)
					resolve(search);
				}
			})
			.catch(error => {
				reject(error)
			})
			})	
		}
		@Action
		searchTicketClosure(query:any){
		   return new Promise((resolve, reject) => {
			 http.get(`ticketclosuretypes?filter[name]=${query}`)
			 .then(response =>  {
			   if (response.status === 200) {      
				   let search : any = [];
				   search = deserialize(response.data)
				   resolve(search);
			   }
		   })
		   .catch(error => {
			   reject(error)
		   })
		   })	
	   }
		@Action
		searchByRelation(data:any){
			return new Promise((resolve, reject) => {
				if (data.endpoint == 'tickets') {
					http.get(`/${data.endpoint}?filter[${data.filterBy}]=${data.id}&filter[customer_id]=${this.getCustomerId}&include=customers,serials,plans,errors,ticketstatuses`)
					.then(response  => {
		
						if (response.status === 200) {   
							
							resolve(response);  
					
						}
					})
					.catch(error => {
					reject(error)
					})
				} else if (data.endpoint == 'deviceplans') {
					http.get(`/${data.endpoint}?filter[${data.filterBy}]=${data.id}&filter[customer_id]=${this.getCustomerId}&include=serials,plans`)
					.then(response  => {
		
						if (response.status === 200) {   
							
							resolve(response);  
					
						}
					})
					.catch(error => {
					reject(error)
					})
				} else if (data.endpoint == 'invoices') {
					http.get(`/${data.endpoint}?filter[${data.filterBy}]=${data.id}&include=customers`)
					.then(response  => {
		
						if (response.status === 200) {   
							
							resolve(response);  
					
						}
					})
					.catch(error => {
					reject(error)
					})
				} else if (data.endpoint == 'ticketclosures') {
					http.get(`/${data.endpoint}?filter[${data.filterBy}]=${data.id}&include=ticketclosuretypes,tickets`)
					.then(response  => {
		
						if (response.status === 200) {   
							
							resolve(response);  
					
						}
					})
					.catch(error => {
					reject(error)
					})
				}
	
			})
		}
		@Action
		getNotificationsAll() {
			return new Promise((resolve, reject) => {  
				http.get(`/notifications`)
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
		getNotificationsById(id) {
			return new Promise((resolve, reject) => {  
				http.get(`/notifications/${id}/markNotification`)
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
		getNotificationsByIdModel(id) {
			return new Promise((resolve, reject) => {  
				http.get(`/notifications/${id}/markNotification`)
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
  
  export default getModule(globalModule);
  