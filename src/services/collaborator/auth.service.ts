import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import GetUserInfoDto from '../../dtos/collaborator/getUserInfo.dto';
import LoginUserDto from '../../dtos/collaborator/login.user.dto';
import LoginGoogleParams from '../../dtos/collaborator/loginGoogle.dto';

export const authService = {
  collab_loginGoogle: (
    payload: LoginGoogleParams
  ): Promise<AxiosResponse<LoginUserDto>> => {
    const url = '/api/account/login';

    return axiosClient.post(url, { ...payload });
  },
  collab_getUserInfo: (): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/account/getAccountByToken/authorization';

    return axiosClient.get(url);
  },
  collab_logout: (params: {
    expoToken: string;
  }): Promise<AxiosResponse<null>> => {
    const url = '/api/account/logout';

    return axiosClient.put(url, { params });
  },
  admission_loginGoogle: (
    payload: LoginGoogleParams
  ): Promise<AxiosResponse<LoginUserDto>> => {
    const url = '/api/admission/admission-account/login';

    return axiosClient.post(url, { ...payload });
  },
  admission_getUserInfo: (): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url =
      '/api/admission/admission-account/getAccountByToken/authorization';

    return axiosClient.get(url);
  },
  admission_logout: (params: {
    expoToken: string;
  }): Promise<AxiosResponse<null>> => {
    const url = '/api/admission/admission-account/logout';

    return axiosClient.put(url, { params });
  },
};
