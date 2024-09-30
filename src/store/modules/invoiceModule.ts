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
  import { http } from '@/utils/http';
  import { deserialize } from 'jsonapi-fractal'
  import storageData from '@/store/services/storageService'
  
  @Module({
    namespaced: true,
    name: 'Invoices',
    store,
    dynamic: true,
  })
  
  class InvoicesModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');  
	invoice_id : string = ''
	invoice_item_id :string = ''

	get getInvoiceId() {
		return  storageData.get('_invoice_id');
	}
	get getInvoiceItemId() {
		return  storageData.get('_invoice_item_id');
	}

	@Mutation
	setInvoiceId(invoice_id: any) {
		this.invoice_id = invoice_id;
	}
	
	@Mutation
	setInvoiceItemId(invoice_id: any) {
		this.invoice_id = invoice_id;
	}


    @Action
		async saveInvoices(data: Roles) { 
		const response =  await http.post('/invoices',data)
			let invoice : any = [];
			if (response.status === 201){
                invoice = deserialize(response.data,{changeCase:'camelCase'})
				const invoice_id: string = invoice.id
				storageData.set('invoice_id', invoice_id);
				this.context.commit('setInvoiceId', invoice_id);
			}
			return invoice
		} 
	@Action
	async updateInvoices(data){
		let id = ''
		if (storageData.get('invoice_id')) {
			id = storageData.get('invoice_id')
		} else {
			let dataFactura : any  = deserialize(data,{changeCase:'camelCase'});
			id = dataFactura.id
		}
		const response =  await http.patch(`invoices/${id}`, data)
		if (response.status === 200 || response.status === 201){
			//return await this.getListaPreciosAll();
		}
		
	} 
    @Action
		async saveInvoicesItems(data: Roles) { 
		const response =  await http.post('/invoiceitems', data)
		let invoiceItem : any = [];
			if (response.status === 201){
               
                invoiceItem = deserialize(response.data,{changeCase:'camelCase'})
				/* const invoice_item_id: string = invoiceItem.id
				storageData.set('invoice_item_id', invoice_item_id);
				this.context.commit('setInvoiceItemId', invoice_item_id); */
				
			}
			return invoiceItem
		}
	@Action
	async updateInvoicesItems(data){
		let id = storageData.get('invoice_item_id')
		const response =  await http.patch(`invoiceitems/${id}`, data)
		if (response.status === 200 || response.status === 201){
			//return await this.getListaPreciosAll();
		}	
	} 	
	
	@Action
	getInvoiceById(id:number) {
		return new Promise((resolve, reject) => {
		http.get(`/invoices/${id}?include=customers`)
			.then(response  => {

			if (response.status === 200) {   

				let invoice : any = [];
				invoice = deserialize(response.data,{changeCase:'camelCase'})
				resolve(invoice);  
		
			}
		})
		.catch(error => {
		reject(error)
		})
	})
	}
    @Action
      	getInvoiceItems(id:number) {
          	return new Promise((resolve, reject) => {
            http.get(`/invoices/${id}/invoiceitems?include=products`)
          		.then(response  => {
      
                if (response.status === 200) {   

					let invoiceitem : any = [];
					invoiceitem = deserialize(response.data,{changeCase:'camelCase'})
					resolve(invoiceitem);  
             
                }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
    @Action
    	getFiltersCustomers(query:any) {
			return new Promise((resolve, reject) => {
			http.get(`/customers?filter[name_legal]=${query}`)
			.then(response =>  {
	
				if (response.status === 200) {      
					let search : any = [];
					search = deserialize(response.data,{changeCase:'camelCase'})
					resolve(search);
				}
			})
			.catch(error => {
				reject(error)
			})
		})
	}
    @Action
    getFiltersProducts(query:any) {
        return new Promise((resolve, reject) => {
        http.get(`/products?filter[co_product]=${query}`)
        .then(response =>  {

            if (response.status === 200) {      
                let search : any = [];
                search = deserialize(response.data,{changeCase:'camelCase'})
                resolve(search);
            }
        })
        .catch(error => {
            reject(error)
        })
    })
}
    @Action({rawError: true})
		async update(data:Roles) { 
			let dataRol : Roles = deserialize(data,{changeCase:'camelCase'});
			let id = dataRol.id

		const response =  await http.patch(`roles/${id}`, data)
			if (response.status === 200 || response.status === 201){
				//return await this.getListaPreciosAll();
			}
		}  
    @Action({rawError: true})
		async delete(data : any) { 
		let dataFactura : any  = deserialize(data,{changeCase:'camelCase'});
		let id = dataFactura.id
		const response =  await http.patch(`invoices/${id}`, data)
			if (response.status === 200 || response.status === 201){
				return await this.getAll();
			}
		} 
	@Action({rawError: true})
		async deleteInvoiceItem(data : any) { 
		let dataFactura : any  = deserialize(data,{changeCase:'camelCase'});
		let id = dataFactura.id
		const response =  await http.patch(`invoiceitems/${id}`, data)
			if (response.status === 200 || response.status === 201){
				
			}
		}
		
	@Action
	getAll(){
		  return new Promise((resolve, reject) => {
		  http.get('/invoices?include=customers&page[number]=1&sort=-id')
		  .then(response => {
	  
			  if (response.status === 200 || response.status === 201) {      
	  
					resolve(response);
			  
			  }
		  })
		  .catch(error => {
		  reject(error)
		  })
	  })
	} 
	@Action
    validateSerialExist(data:any) {
      	return new Promise((resolve, reject) => {
            http.post('/serials/-actions/validate-bulk-import', data)
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
	async saveSerials(data:any){
		const response =  await http.post('/serials/-actions/bulk-import', data)

		if (response.status === 201){
			return response
		}
	}
	@Action
	getInvoiceItemWithSerials(id:number) {
		return new Promise((resolve, reject) => {
			http.get(`invoiceitems/${id}?include=serials,products,invoices`)
			.then(response => {
				if (response.status === 200) {   
					let editInvoiceItem : any = [];
					editInvoiceItem = deserialize(response.data)
					resolve(editInvoiceItem);
				}
			})
		})
	}
	@Action
	getCustomersById(id) {
		return new Promise((resolve, reject) => {
		http.get(`/customers/${id}`)
		.then(response =>  {

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
	@Action
	getProductById(id) {
		return new Promise((resolve, reject) => {
		http.get(`/products/${id}`)
		.then(response =>  {

			if (response.status === 200) {      
				let search : any = [];
				search = deserialize(response.data,{changeCase:'camelCase'})
				resolve(search);
			}
		})
		.catch(error => {
			reject(error)
		})
		})
	}
	@Action
	async deleteSerials(data:any) {
		const response =  await http.post('/serials/-actions/bulk-delete', data)

		if (response.status === 201){
			return response
		}
	}

  }  
  
  export default getModule(InvoicesModule);
  