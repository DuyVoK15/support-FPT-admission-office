import { AxiosResponse } from 'axios';
import { ViewComplaintResponse } from '../../dtos/collaborator/response/viewComplaint.dto';
import axiosClient from '../axiosClient';
// complaint.service.ts

export const complaintService = {
  getAllComplaint: (): Promise<AxiosResponse<ViewComplaintResponse>> => {
    const url = '/api/complaint/getAll';
    console.log('Ahihi');
    return axiosClient.get(url);
  },
  createComplaint: (params: {
    problemNote: string;
  }): Promise<AxiosResponse<ViewComplaintResponse>> => {
    const url = '/api/complaint/create';
    console.log('Ahihi');
    return axiosClient.post(url, { params });
  },
};
