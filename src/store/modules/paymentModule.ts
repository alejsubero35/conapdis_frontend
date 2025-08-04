
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
import { http, https, URLBASE } from '@/utils/http';
import { deserialize } from 'jsonapi-fractal'
import storageData from '@/store/services/storageService'

@Module({
    namespaced: true,
    name: 'payment',
    store,
    dynamic: true,
})

class paymentModule extends VuexModule {
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
    async getAll(endpoint) {
        return await http.get(endpoint)
            .then((payload: any) => {
                return payload;
            })
            .catch(() => {
                return { data: [] };
            });
    }
    @Action
    async getById(dataStudent: any) {
        return await http.get(`${dataStudent.endpoint}/${dataStudent.id}`)
            .then((payload: any) => {
                return payload;
            })
            .catch(() => {
                return { data: null };
            });
    }
    @Action
    async update(dataStudent: any) {

        await http.put(`${dataStudent.endpoint}/${dataStudent.id}`, dataStudent)
            .then((payload: any) => {
                if (payload) {
                    console.log(payload);
                    dataStudent.code = payload.status;
                    dataStudent.message = payload.data?.message || '';
                } else {
                    dataStudent.code = 500;
                    dataStudent.message = 'Error al procesar la Solicitud';
                }
            })
        return dataStudent;
    }

    @Action
    async delete(dataStudent: any) {
        return await http.delete(`${dataStudent.endpoint}/${dataStudent.id}`)
            .then((payload: any) => {
                return payload;
            })
            .catch(() => {
                return { data: null };
            });
    }


    @Action
    async getPendingPayments(busine_id: number) {
        return await http.get(`/payments/pending/${busine_id}`)
            .then((payload: any) => {
                return payload;
            })
            .catch(() => {
                return { data: null };
            });
    }
    @Action
    async processPayment(dataPayment: any) {
        await http.post(`/payments/pay/${dataPayment.pending_payment_id}`, dataPayment)
            .then((payload: any) => {
                if (payload) {
                    dataPayment.code = payload.status;
                    dataPayment.message = payload.data?.message || '';
                } else {
                    dataPayment.code = 500;
                    dataPayment.message = 'Error al procesar la Solicitud';
                }
            })
        return dataPayment;
    }
    @Action
    async getValueMMV() {
        return await http.get(`${URLBASE}/bcv-currency?currency=euro`)
            .then((payload: any) => {
                return payload;
            })
            .catch(() => {
                return { data: null };
            });
    }
    

}

export default getModule(paymentModule);
