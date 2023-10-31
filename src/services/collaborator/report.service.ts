import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import {
  ViewRegistrationReportResponse,
  ViewReportResponse,
} from '../../dtos/collaborator/response/viewReport.dto';

// report.service.ts
export const reportService = {
  getAllReport: (): Promise<AxiosResponse<ViewReportResponse>> => {
    const url = '/api/account-report/getByToken';
    return axiosClient.get(url);
  },
  getRegistrationByReport: (params: {
    accountReportId: number;
  }): Promise<AxiosResponse<ViewRegistrationReportResponse>> => {
    const url = '/api/account-report/getRegistrationByReportId';
    return axiosClient.get(url, { params });
  },
};
