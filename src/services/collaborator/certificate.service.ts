// certificate.service.ts
import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import PostDto from '../../dtos/collaborator/post.dto';
import ViewCertificateResponse from '../../dtos/collaborator/response/viewCertificate.dto';
import { FilterCertificateParam } from '../../dtos/collaborator/parameter/filterCertificate.dto';
import { CancelTrainingCertificateRegistrationParam } from '../../dtos/collaborator/parameter/cancelTrainingCertificateRegistration.dto';
import { CreateTrainingCertificateRegistrationParam } from '../../dtos/collaborator/parameter/createTrainingCertificateRegistration.dto';
import ViewCertificateAdmissionResponse from '../../dtos/collaborator/response/viewCertificateFromAdmisstion.dto';
import CancelTrainingCertificateRegistrationResponse from '../../dtos/collaborator/response/cancelTrainingCertificateRegistration.dto';
import ViewTrainingCertificateRegistrationResponse from '../../dtos/collaborator/response/viewTrainingCertificateRegistration.dto';

export const certificateService = {
  getAllCertificate: (
    params: FilterCertificateParam
  ): Promise<AxiosResponse<ViewCertificateResponse>> => {
    const url = '/api/account-certificate/getByToken';
    console.log('Ahihi');
    return axiosClient.get(url, { params });
  },
  getTrainingCertificateRegistration: (
    params: FilterCertificateParam
  ): Promise<AxiosResponse<ViewTrainingCertificateRegistrationResponse>> => {
    const url = '/api/account-certificate/collab-view-registration';
    console.log('Ahihi');
    return axiosClient.get(url, { params });
  },
  cancelTrainingCertificateRegistration: (
    params: CancelTrainingCertificateRegistrationParam
  ): Promise<AxiosResponse<CancelTrainingCertificateRegistrationResponse>> => {
    const url = '/api/account-certificate/cancel-registration-collab';
    console.log('Ahihi');
    return axiosClient.delete(url, { params });
  },
  createCertificateRegistration: (
    params: CreateTrainingCertificateRegistrationParam
  ): Promise<AxiosResponse<ViewTrainingCertificateRegistrationResponse>> => {
    const url = '/api/account-certificate/register-certificate-interview';
    console.log('Ahihi');
    return axiosClient.post(url, { ...params });
  },
  getAllCertificateFromAdmission: (
    params: FilterCertificateParam
  ): Promise<AxiosResponse<ViewCertificateAdmissionResponse>> => {
    const url = '/api/account-certificate/getAllCertificateFromAdmission';
    console.log('Ahihi');
    return axiosClient.get(url, { params });
  },
};
