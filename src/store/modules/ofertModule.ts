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
import { http, https } from '@/utils/http';
import { deserialize } from 'jsonapi-fractal'
import storageData from '@/store/services/storageService'

@Module({
    namespaced: true,
    name: 'ofertModule',
    store,
    dynamic: true,
})

class ofertModule extends VuexModule {

    token: string | null = localStorage.getItem('_token');

    @Action({ rawError: true })
    async getAll() {
        const response = await http.get(`/positions/get_ofert_all`)
        return response;
    }
    @Action
    async save(dataOfert: any) {
        await http.post(`positions/save_ofert`, dataOfert)
            .then((payload: any) => {
                if (payload) {
                    dataOfert.code = payload.status
                } else {
                    dataOfert.code = 500;
                    dataOfert.message = 'Error al procesar la Solicitud';
                }
            })
        return dataOfert;
    }
    @Action
    async update(dataOfert: any) {
        await http.post(`positions/unlinked`, dataOfert)
            .then((payload: any) => {
                if (payload) {
                    dataOfert.code = payload.status
                } else {
                    dataOfert.code = 500;
                    dataOfert.message = 'Error al procesar la Solicitud';
                }
            })
        return dataOfert;
    }
    @Action
    delete(id) {
        return new Promise((resolve, reject) => {
            http.post(`/positions/delete_ofert/${id}`)
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
    cerrarOferta(id) {
        return new Promise((resolve, reject) => {
            http.post(`/positions/cerrar_ofert/${id}`)
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
    getCharges() {
        return new Promise((resolve, reject) => {
            http.get(`/positions/get_charges`)
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
    getprofession() {
        return new Promise((resolve, reject) => {
            http.get(`/positions/get_profession`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    @Action
    getDiscapacidades() {
        return new Promise((resolve, reject) => {
            http.get(`/positions/get_discapacidades`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    @Action
    getOfertById(id) {
        return new Promise((resolve, reject) => {
            http.get(`/positions/get_ofert_by_id/${id}`)
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
    getPostulantesById(id) {
        return new Promise((resolve, reject) => {
            http.get(`/positions/get_postulantes_by_id/${id}`)
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
    getSexosAll() {
        return new Promise((resolve, reject) => {
            http.get(`/positions/get_sex_all`)
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
    getDiscapacidadesAll() {
        return new Promise((resolve, reject) => {
            http.get(`/positions/get_discapacidades`)
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
    getDataCV(id) {
        return new Promise((resolve, reject) => {
            http.get(`/oferta/get_data_curriculo/${id}`)
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
    saveCita(data) {
        return new Promise((resolve, reject) => {
            http.post(`/oferta/oferta_cita_pcd`, data)
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
    rechazarPostulante(data) {
        return new Promise((resolve, reject) => {
            http.post(`/oferta/rechazar_postulante`, data)
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


}

export default getModule(ofertModule);
