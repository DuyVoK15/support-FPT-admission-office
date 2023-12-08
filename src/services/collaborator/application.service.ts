import { AxiosResponse } from 'axios';
import { ViewApplicationResponse } from '../../dtos/collaborator/response/viewApplication.dto';
import axiosClient from '../axiosClient';
import { FilterApplicationParam } from '../../dtos/collaborator/parameter/filterApplication.dto';
// application.service.ts

export const applicationService = {
  getAllApplication: (
    params: FilterApplicationParam
  ): Promise<AxiosResponse<ViewApplicationResponse>> => {
    const url = '/api/application/getAll';
    console.log('Ahihi');
    return axiosClient.get(url, { params });
  },
  createAppication: (params: {
    problemNote: string;
  }): Promise<AxiosResponse<ViewApplicationResponse>> => {
    const url = '/api/application/create';
    console.log('Ahihi');
    return axiosClient.post(url, { ...params });
  },
};
