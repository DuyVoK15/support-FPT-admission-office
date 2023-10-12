// PostService.ts
import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import CreatePostRegistrationDto from '../../dtos/collaborator/payload/createPostRegistration.dto';
import CreatePostRegistrationResponse from '../../dtos/collaborator/response/createPostRegistration.dto';
import DeletePostRegistraionResponse from '../../dtos/collaborator/response/deletePostRegistration.dto';
import UpdatePostRegistrationResponse from '../../dtos/collaborator/response/updatePostRegistration.dto';
import UpdatePostRegistrationPayload from '../../dtos/collaborator/payload/updatePostRegistration.dto';
import ViewPostRegistrationDto from '../../dtos/collaborator/response/viewPostRegistration.dto';


export const postRegistrationService = {
  getAllPostRegistration: (): Promise<AxiosResponse<ViewPostRegistrationDto>> => {
    const url = '/api/post-registration/getById';
    console.log('Ahihi');
    return axiosClient.get(url);
  },
  createPostRegistration: (payload: CreatePostRegistrationDto) : Promise<AxiosResponse<CreatePostRegistrationResponse>> => {
    const url = '/api/post-registration/create';
    console.log('Ahihi');
    return axiosClient.post(url, {...payload});
  },
  deletePostRegistration: (id: number) : Promise<AxiosResponse<DeletePostRegistraionResponse>> => {
    const url = '/api/post-registration/cancel';
    console.log('Ahihi');
    return axiosClient.delete(url, {params: {
        postRegistrationId: id
    }});
  },
  updatePostRegistration: (payload: UpdatePostRegistrationPayload) : Promise<AxiosResponse<UpdatePostRegistrationResponse>> => {
    const url = '/api/post-registration/update';
    console.log('Ahihi');
    return axiosClient.post(url, {...payload});
  }
};



