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
import { http, https } from '@/utils/http';
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
        return storageData.get('_bussines');
    }

    @Mutation
    setBussines(bussines: any) {
        this.bussines = bussines;
    }



    @Action
    getDocumentsAll(bussinesId: number) {
        return new Promise((resolve, reject) => {
            http.get(`/required-documents/${bussinesId}`)
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
    getAllDocuments() {
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
    async saveDocuments(dataDocuments: DocumentReq) {
        try {
            const payload: any = await http.post(`document-bussines/store_documents`, dataDocuments);
            // Return full axios response so callers can react immediately
            return payload;
        } catch (error) {
            return { status: 500, data: null, error };
        }
    }

    @Action
    async getDocumentsByBussines(bussinesId: number) {console.log('bussinesId', bussinesId)
        return await http.get(`/required-documents-busines/${bussinesId}`)
            .then((payload: any) => {
                return payload;
            })
            .catch(() => {
                return { data: null };
            });
    }
    @Action
    async getRequiredDocuments(bussinesId: number) {
        return await http.get(`/required-documents/${bussinesId}`)
          .then((payload: any) => {
                return payload;
            })
            .catch(() => {
                return { data: null };
            });
    }

    @Action
    async deleteDocument(documentId: number) {
        // Attempts to delete a required document by id. Adjust endpoint if your API differs.
        return await http.delete(`/required-documents/${documentId}`)
            .then((payload: any) => {
                return payload;
            })
            .catch((error) => {
                return { data: null, error };
            });
    }



}



export default getModule(DocumentRequired);
