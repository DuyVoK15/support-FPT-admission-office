import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";
import { AccountInfoSignup } from "../../models/collaborator/account.model";
import GetUserInfoDto from "../../dtos/collaborator/getUserInfo.dto";
import { UserInfoUpdate } from "../../models/collaborator/userInfo.model";
import UpdateAvatarDto from "../../dtos/collaborator/payload/updateAvatar.dto";

export const accountService = {
  signupAccountInfo: (payload: AccountInfoSignup): Promise<AxiosResponse<GetUserInfoDto>> => {
    console.log('HIHI ', payload);
    const url = '/api/account/createAccountInformation';
    
    return axiosClient.post(url, { ...payload });
  },
  updateProfile: (payload: UserInfoUpdate): Promise<AxiosResponse<GetUserInfoDto>> => {
    console.log('HIHI ', payload);
    const url = '/api/account/update';
    
    return axiosClient.put(url, { ...payload });
  },
  updateAvatar: (payload: UpdateAvatarDto): Promise<AxiosResponse<GetUserInfoDto>> => {
    console.log('HIHI ', payload);
    const url = '/api/account/updateAvatar';
    
    return axiosClient.patch(url, { ...payload });
  },
}