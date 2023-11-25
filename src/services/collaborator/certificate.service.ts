// certificate.service.ts
import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import PostDto from '../../dtos/collaborator/post.dto';
import ViewCertificateResponse from '../../dtos/collaborator/response/viewCertificate.dto';
import { FilterCertificateParam } from '../../dtos/collaborator/parameter/filterCertificate.dto';

export const certificateService = {
  getAllCertificate: (
    params: FilterCertificateParam
  ): Promise<AxiosResponse<ViewCertificateResponse>> => {
    const url = '/api/account-certificate/getByToken';
    console.log('Ahihi');
    return axiosClient.get(url, { params });
  },
};
