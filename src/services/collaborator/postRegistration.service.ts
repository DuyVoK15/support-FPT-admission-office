// PostService.ts
import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import CreatePostRegistrationDto from '../../dtos/collaborator/parameter/createPostRegistration.dto';
import CreatePostRegistrationResponse from '../../dtos/collaborator/response/createPostRegistration.dto';
import CancelPostRegistraionResponse from '../../dtos/collaborator/response/cancelPostRegistration.dto';
import UpdatePostRegistrationResponse from '../../dtos/collaborator/response/updatePostRegistration.dto';
import UpdatePostRegistrationPayload from '../../dtos/collaborator/parameter/updatePostRegistration.dto';
import ViewPostRegistrationDto from '../../dtos/collaborator/response/viewPostRegistration.dto';
import { FilterPostRegistration } from '../../dtos/collaborator/parameter/filterPostRegistration.dto';
import { CancelPostRegistrationParam } from '../../dtos/collaborator/parameter/cancelPostRegistration.dto';
import { ViewUpdateRequest } from '../../dtos/collaborator/response/viewUpdateRequest.dto';

export const postRegistrationService = {
  getAllPostRegistration: (
    params: FilterPostRegistration
  ): Promise<AxiosResponse<ViewPostRegistrationDto>> => {
    const url = '/api/post-registration/getById';
    return axiosClient.get(url, {
      params,
      paramsSerializer: {
        indexes: null,
      },
    });
  },
  createPostRegistration: (
    params: CreatePostRegistrationDto
  ): Promise<AxiosResponse<CreatePostRegistrationResponse>> => {
    const url = '/api/post-registration/create';
    return axiosClient.post(url, { ...params });
  },
  cancelPostRegistration: (
    params: CancelPostRegistrationParam
  ): Promise<AxiosResponse<CancelPostRegistraionResponse>> => {
    const url = '/api/post-registration/cancel';
    return axiosClient.delete(url, { params });
  },
  updatePostRegistration: (
    params: UpdatePostRegistrationPayload
  ): Promise<AxiosResponse<UpdatePostRegistrationResponse>> => {
    const url = '/api/post-registration/update';
    return axiosClient.post(url, { ...params });
  },
  getAllUpdateRequest: (
    params: FilterPostRegistration
  ): Promise<AxiosResponse<ViewUpdateRequest>> => {
    const url = '/api/post-registration/get-update-request';
    return axiosClient.get(url, { params });
  },
  getAllCheckInPostRegistration: (
    params: FilterPostRegistration
  ): Promise<AxiosResponse<ViewPostRegistrationDto>> => {
    const url = '/api/post-registration/getCheckInPostRegistration';
    return axiosClient.get(url, { params });
  },
};
