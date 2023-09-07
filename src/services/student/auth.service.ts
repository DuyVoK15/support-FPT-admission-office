// AuthService.ts
import { AxiosResponse } from 'axios';

// import LoginDto from '../dtos/login.dto';
// import LoginUserToken from '../dtos/login.userToken.model';
import axiosClient from './axiosClient';
import LoginGoogleDto from '../../dtos/student/loginGoogle.dto';
import LoginUser from '../../dtos/student/login.user.dto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from '../../enums/student/app';
import auth from '@react-native-firebase/auth';
import GetUserInfo from '../../dtos/student/getUserInfo.dto';

export const authService = {
  loginGoogle: (payload: LoginGoogleDto): Promise<AxiosResponse<LoginUser>> => {
    console.log('HIHI ', payload);
    const url = '/api/account/login';

    return axiosClient.post(url, { ...payload });
  },
  getUserInfo: (): Promise<AxiosResponse<GetUserInfo>> => {
    const url =
      '/api/account/getAccountByToken/authorization';
    return axiosClient.get(url);
  }
};
