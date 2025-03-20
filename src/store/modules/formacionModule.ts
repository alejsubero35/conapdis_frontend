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
    name: 'formacionModule',
    store,
    dynamic: true,
})

class formacionModule extends VuexModule {

    token: string | null = localStorage.getItem('_token');

    @Action({ rawError: true })
    async getRequestAll(id) {
        const response = await http.get(`/training/get_request_all/${id}`)
        return response;
    }
    @Action
    getWorkshopsAll() {
        return new Promise((resolve, reject) => {
            http.get(`/training/get_workshops`)
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
    async save(dataRequest: any) {
        await http.post(`training/save_request`, dataRequest)
            .then((payload: any) => {
                if (payload) {
                    dataRequest.code = payload.status
                } else {
                    dataRequest.code = 500;
                    dataRequest.message = 'Error al procesar la Solicitud';
                }
            })
        return dataRequest;
    }
    @Action
    getRequestById(id) {
        return new Promise((resolve, reject) => {
            http.get(`/training/get_request_by_id/${id}`)
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
    async saveAttendance(dataRequest: any) {
        await http.post(`training/save_attendance`, dataRequest)
            .then((payload: any) => {
                if (payload) {
                    dataRequest.code = payload.status
                } else {
                    dataRequest.code = 500;
                    dataRequest.message = 'Error al procesar la Solicitud';
                }
            })
        return dataRequest;
    }
    @Action
    getAttendancesByIdRequest(id) {
        return new Promise((resolve, reject) => {
            http.get(`/training/get_attendance_by_request_id/${id}`)
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
    deleteAttendances(id) {
        return new Promise((resolve, reject) => {
            http.get(`/training/delete_attendance/${id}`)
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
    getCitasByBussinesId(id) {
        return new Promise((resolve, reject) => {
            http.get(`/training/get_citas_by_bussine_id/${id}`)
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
    async saveTraining(dataRequest: any) {
        await http.post(`training/save_training`, dataRequest)
            .then((payload: any) => {
                if (payload) {
                    dataRequest.code = payload.status
                } else {
                    dataRequest.code = 500;
                    dataRequest.message = 'Error al procesar la Solicitud';
                }
            })
        return dataRequest;
    }
    @Action
    getEvaluationTrainig(id) {
        return new Promise((resolve, reject) => {
            http.get(`/training/get_evaluation_training_by_id/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.data);
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    @Action
    getRequirementTrainigAll() {
        return new Promise((resolve, reject) => {
            http.get(`/training/get_requirements_training`)
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.data);
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
            http.get(`/training/get_sex_all`)
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.data);
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
            http.get(`/training/get_discapacidades`)
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
    getGradoDiscapacidadesAll() {
        return new Promise((resolve, reject) => {
            http.get(`/training/get_grados_discapacidades`)
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
    @Action({ rawError: true })
    async downloadCertificate(id: any) {
        const response = await http.get(`/training/download_certificates/${id}`, {
            responseType: 'arraybuffer'
        })
        if (response.status === 200 || response.status === 201) {
            let blob = new Blob([response.data], {
                type: 'application/pdf'
            })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'Certificados.pdf'
            link.click()
        }
    }



}

export default getModule(formacionModule);
