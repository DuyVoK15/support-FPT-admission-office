import { AxiosResponse } from 'axios';
import { ViewApplicationResponse } from '../../dtos/collaborator/response/viewApplication.dto';
import axiosClient from '../axiosClient';
// application.service.ts

export const applicationService = {
  getAllApplication: (): Promise<AxiosResponse<ViewApplicationResponse>> => {
    const url = '/api/application/getAll';
    console.log('Ahihi');
    return axiosClient.get(url);
  },
  createAppication: (params: {
    problemNote: string;
  }): Promise<AxiosResponse<ViewApplicationResponse>> => {
    const url = '/api/application/create';
    console.log('Ahihi');
    return axiosClient.post(url, { ...params });
  },
};
