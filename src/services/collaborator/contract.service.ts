// contract.service.ts

import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import { ViewContractResponse } from '../../dtos/collaborator/response/viewContract.dto';
import { FilterContract } from '../../dtos/collaborator/parameter/filterContract.dto';
import { UpdateContractParam } from '../../dtos/collaborator/parameter/updateContract.dto';

export const contractService = {
  getAllContract: (
    params: FilterContract
  ): Promise<AxiosResponse<ViewContractResponse>> => {
    const url = '/api/contract/getById';
    return axiosClient.get(url, { params });
  },
  updateContract: (
    params: UpdateContractParam
  ): Promise<AxiosResponse<ViewContractResponse>> => {
    const url = `/api/contract/confirmContract?accountContractId=${params?.accountContractId}&status=${params?.status}`;
    return axiosClient.put(url);
  },
};
