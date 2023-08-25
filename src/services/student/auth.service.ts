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

export const authService = {
  loginGoogle: (payload: LoginGoogleDto): Promise<AxiosResponse<LoginUser>> => {
    console.log("HIHI ", payload)
    const url = '/api/admission/admission-account/login';

    return axiosClient.post(url, { ...payload });
  },
  getUserInfo: (): Promise<AxiosResponse<LoginUser>> => {
    const url = '/api/admission/admission-account/getAccountByToken/authorization';
    console.log("Ahihi")
    return axiosClient.get(url);
  },  
  logout: async () => {
    // Xử lý đăng xuất ở đây (nếu cần) 
    // Gọi action logout để cập nhật trạng thái đăng nhập
    await AsyncStorage.removeItem(AppConstants.ACCESS_TOKEN);
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
      
  },
};