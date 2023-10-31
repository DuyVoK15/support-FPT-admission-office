// contract.service.ts

import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import { ViewContractResponse } from '../../dtos/collaborator/response/viewContract.dto';

export const contractService = {
  getAllContract: (): Promise<AxiosResponse<ViewContractResponse>> => {
    const url = '/api/contract/getById';
    return axiosClient.get(url);
  },
};
