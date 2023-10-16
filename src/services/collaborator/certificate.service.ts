// PostService.ts
import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import PostDto from '../../dtos/collaborator/post.dto';
import ViewCertificateResponse from '../../dtos/collaborator/response/viewCertificate.dto';

export const certificateService = {
  getAllCertificate: (): Promise<AxiosResponse<ViewCertificateResponse>> => {
    const url = '/api/account-certificate/getByToken';
    console.log('Ahihi');
    return axiosClient.get(url);
  },
  
};
