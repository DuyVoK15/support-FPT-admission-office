import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import {
  ViewRegistrationReportResponse,
  ViewReportResponse,
} from '../../dtos/collaborator/response/viewReport.dto';
import { FilterReportParam } from '../../dtos/collaborator/parameter/filterReport.dto';

// report.service.ts
export const reportService = {
  getAllReport: (
    params: FilterReportParam
  ): Promise<AxiosResponse<ViewReportResponse>> => {
    const url = '/api/account-report/getByToken';
    return axiosClient.get(url, { params });
  },
  getRegistrationByReport: (params: {
    accountReportId: number;
  }): Promise<AxiosResponse<ViewRegistrationReportResponse>> => {
    const url = '/api/account-report/getRegistrationByReportId';
    return axiosClient.get(url, { params });
  },
};
