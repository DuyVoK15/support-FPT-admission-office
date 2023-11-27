// contract.service.ts

import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import { ViewContractResponse } from '../../dtos/collaborator/response/viewContract.dto';
import { FilterContract } from '../../dtos/collaborator/parameter/filterContract.dto';

export const contractService = {
  getAllContract: (
    params: FilterContract
  ): Promise<AxiosResponse<ViewContractResponse>> => {
    const url = '/api/contract/getById';
    return axiosClient.get(url, { params });
  },
};
