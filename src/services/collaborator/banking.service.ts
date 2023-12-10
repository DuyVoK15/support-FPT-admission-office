// banking.service.ts

import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import { ViewBankingResponse } from '../../dtos/collaborator/response/viewBanking.dto';
import CreateBankingParam from '../../dtos/collaborator/parameter/createBanking.dto';
import UpdateBankingParam from '../../dtos/collaborator/parameter/updateBanking.dto';

export const bankingService = {
  getBankingInformation: (): Promise<AxiosResponse<ViewBankingResponse>> => {
    const url = '/api/account-banking/getByToken';
    return axiosClient.get(url);
  },
  createBankingInformation: (
    params: CreateBankingParam
  ): Promise<AxiosResponse<ViewBankingResponse>> => {
    const url = '/api/account-banking/create';
    return axiosClient.post(url, { ...params });
  },
  updateBankingInformation: (
    params: UpdateBankingParam
  ): Promise<AxiosResponse<ViewBankingResponse>> => {
    const url = '/api/account-banking/update';
    return axiosClient.put(url, { ...params });
  },
};
