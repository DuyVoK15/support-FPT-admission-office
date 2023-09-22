import { AxiosResponse } from 'axios';
import axiosClient from './../axiosClient';
import LoginGoogleDto from '../../dtos/collaborator/loginGoogle.dto';
import GetUserInfoDto from '../../dtos/collaborator/getUserInfo.dto';
import LoginUserDto from '../../dtos/collaborator/login.user.dto';

export const authService = {
  loginGoogle: (payload: LoginGoogleDto): Promise<AxiosResponse<LoginUserDto>> => {
    const url = '/api/admission/admission-account/login';

    return axiosClient.post(url, { ...payload });
  },
  getUserInfo: (): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/admission/admission-account/getAccountByToken/authorization';
    
    return axiosClient.get(url);
  },
};
