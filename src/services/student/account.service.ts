import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { AccountInfoSignup } from "../../models/student/account.model";
import GetUserInfo from "../../dtos/student/getUserInfo.dto";
import { UserInfoUpdate } from "../../models/student/userInfo.model";

export const accountService = {
  signupAccountInfo: (payload: AccountInfoSignup): Promise<AxiosResponse<GetUserInfo>> => {
    console.log('HIHI ', payload);
    const url = '/api/account/createAccountInformation';
    
    return axiosClient.post(url, { ...payload });
  },
  updateProfile: (payload: UserInfoUpdate): Promise<AxiosResponse<GetUserInfo>> => {
    console.log('HIHI ', payload);
    const url = '/api/account/update';
    
    return axiosClient.put(url, { ...payload });
  },
}