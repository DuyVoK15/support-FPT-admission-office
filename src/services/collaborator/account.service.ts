import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import { AccountInfoSignup } from '../../models/collaborator/account.model';
import GetUserInfoDto from '../../dtos/collaborator/getUserInfo.dto';
import { UserInfoUpdate } from '../../models/collaborator/userInfo.model';
import UpdateAvatarDto from '../../dtos/collaborator/parameter/updateAvatar.dto';
import UpdateEnableAccountResponse from '../../dtos/collaborator/response/updateEnableAccount.dto';
import ViewVerifyAccountResponse from '../../dtos/collaborator/response/viewVerifyAccount.dto';

export const accountService = {
  collab_signupAccountInfo: (
    payload: AccountInfoSignup
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/account/createAccountInformation';

    return axiosClient.post(url, { ...payload });
  },
  collab_updateProfile: (
    payload: UserInfoUpdate
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    console.log('HIHI ', payload);
    const url = '/api/account/update';

    return axiosClient.put(url, { ...payload });
  },
  collab_updateAvatar: (
    payload: UpdateAvatarDto
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    console.log('HIHI ', payload);
    const url = '/api/account/updateAvatar';

    return axiosClient.patch(url, { ...payload });
  },
  collab_enableAccount: (): Promise<
    AxiosResponse<UpdateEnableAccountResponse>
  > => {
    console.log('HIHI');
    const url = '/api/account/enable-account';

    return axiosClient.put(url);
  },
  collab_verifyAccount: (params: {
    code: number;
  }): Promise<AxiosResponse<ViewVerifyAccountResponse>> => {
    console.log('HIHI ', params);
    const url = '/api/account/input-verify';

    return axiosClient.get(url, { params });
  },
  admission_signupAccountInfo: (
    payload: AccountInfoSignup
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    console.log('HIHI ', payload);
    const url = '/api/admission/admission-account/createAccountInformation';

    return axiosClient.post(url, { ...payload });
  },
  admission_updateProfile: (
    payload: UserInfoUpdate
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    console.log('HIHI ', payload);
    const url = '/api/admission/admission-account/update';

    return axiosClient.put(url, { ...payload });
  },
  admission_updateAvatar: (
    payload: UpdateAvatarDto
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    console.log('HIHI ', payload);
    const url = '/api/admission/admission-account/updateAvatar';

    return axiosClient.patch(url, { ...payload });
  },
};
