import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { DocumentReq } from '../interfaces/DocumentRequired';
  import { UserToken } from '../interfaces/UserToken';
  import { http,https } from '@/utils/http';
  import { deserialize } from 'jsonapi-fractal'
  import storageData from '@/store/services/storageService'
  
  @Module({
    namespaced: true,
    name: 'Documents Bussines',
    store,
    dynamic: true,
  })
  
  class DocumentRequired extends VuexModule {
    getStates() {
      throw new Error('Method not implemented.');
    }
  
    token: string | null = localStorage.getItem('_token');
	bussines: DocumentReq[] = [];
	get getBussines() {
		return  storageData.get('_bussines');
	}

	@Mutation
	setBussines(bussines: any) {
		this.bussines = bussines;
	}



    @Action
    getDocumentsAll() {
        return new Promise((resolve, reject) => {  
                http.get(`/document-requirements`)
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
    async saveDocuments(dataDocuments: DocumentReq) { 

        await http.post(`document-bussines/store_documents`, dataDocuments)
            .then((payload: any) => {

            if(payload){
                dataDocuments.code = payload.status
              /*   const busine: any     = payload.data.data
                storageData.set('_bussines', busine);
                this.context.commit('setBussines', busine); */
            } else {
                dataDocuments.code = 500;
                dataDocuments.message = 'Error al procesar la Solicitud';
            }
        })
        return dataDocuments;
    }  
		

  }  


  
  export default getModule(DocumentRequired);
  