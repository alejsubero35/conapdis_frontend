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
    name: 'ordering',
    store,
    dynamic: true,
  })
  
  class orderingModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');

	@Action
	getAll() {
	   return new Promise((resolve, reject) => {  
			  http.get(`/ordering-ballots`)
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

     /* @Action
     getOrderingBallotById(id) {
        return new Promise((resolve, reject) => {  
           http.get(`/ordering-ballots/${id}`)
           .then(response =>  {
             if (response.status === 200) {     
               resolve(response); 
             }
           })
           .catch(error => {
             reject(error)
            })
          }) 
        } */

        @Action({rawError: true})
        async getOrderingBallotById(id:any) { 
        const response =  await http.get(`/ordering-ballots/${id}`,{
          responseType: 'arraybuffer'
        })
          if (response.status === 200 || response.status === 201){
            let blob = new Blob([response.data], {
              type: 'application/pdf'
            })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'BoletaOrdenamiento -'+id+'.pdf'
            link.click()
          }
		    }
  }  
  
  export default getModule(orderingModule);
  