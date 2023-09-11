import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { AccountInfoSignup } from "../../models/collaborator/account.model";
import GetUserInfo from "../../dtos/collaborator/getUserInfo.dto";
import { UserInfoUpdate } from "../../models/collaborator/userInfo.model";

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