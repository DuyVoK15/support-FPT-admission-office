import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import { AccountInfoSignup } from '../../models/collaborator/account.model';
import GetUserInfoDto from '../../dtos/collaborator/getUserInfo.dto';
import { UserInfoUpdate } from '../../models/collaborator/userInfo.model';
import UpdateAvatarDto from '../../dtos/collaborator/parameter/updateAvatar.dto';
import UpdateEnableAccountResponse from '../../dtos/collaborator/response/updateEnableAccount.dto';
import ViewVerifyAccountResponse from '../../dtos/collaborator/response/viewVerifyAccount.dto';
import { ViewUserInfoResponse } from '../../dtos/collaborator/response/viewUserInfo.dto';
import ViewAccountBannedResponse from '../../dtos/collaborator/response/viewAccountBanned.dto';
import { FilterAccountBannedParam } from '../../dtos/collaborator/parameter/filterAccountBanned.dto';
import { DataAccountBanned } from '../../models/collaborator/accountBanned.model';
import ViewCurrentAccountBannedResponse from '../../dtos/collaborator/response/viewCurrentAccountBanned.dto';

export const accountService = {
  collab_getUserInfo: (): Promise<AxiosResponse<ViewUserInfoResponse>> => {
    const url = '/api/account/getAccountByToken/authorization';

    return axiosClient.get(url);
  },
  collab_signupAccountInfo: (
    payload: AccountInfoSignup
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/account/updateAccountInformation';

    return axiosClient.put(url, { ...payload });
  },
  collab_updateProfile: (
    payload: UserInfoUpdate
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/account/update';

    return axiosClient.put(url, { ...payload });
  },
  collab_updateAvatar: (
    payload: UpdateAvatarDto
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/account/updateAvatar';

    return axiosClient.patch(url, { ...payload });
  },
  collab_updateFrontImage: (payload: {
    identityFrontImg: string;
  }): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/account/updateFrontImg';

    return axiosClient.patch(url, { ...payload });
  },
  collab_updateBackImage: (payload: {
    identityBackImg: string;
  }): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/account/updateBackImg';

    return axiosClient.patch(url, { ...payload });
  },
  collab_updateInformationFront: (payload: {
    identityNumber: string;
    address: string;
  }): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/account/updateFrontAccountInformationCitizen';

    return axiosClient.patch(url, { ...payload });
  },
  collab_updateInformationBack: (payload: {
    identityNumber: string;
    identityIssueDate: string;
    placeOfIssue: string;
  }): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/account/updateBackAccountInformationCitizen';

    return axiosClient.patch(url, { ...payload });
  },
  collab_enableAccount: (): Promise<
    AxiosResponse<UpdateEnableAccountResponse>
  > => {
    const url = '/api/account/enable-account';

    return axiosClient.put(url);
  },
  collab_getAccountBanned: (
    params: FilterAccountBannedParam
  ): Promise<AxiosResponse<ViewAccountBannedResponse>> => {
    const url = '/api/account-banned/getByToken';

    return axiosClient.get(url, { params });
  },
  collab_getCurrentAccountBanned: (): Promise<
    AxiosResponse<ViewCurrentAccountBannedResponse>
  > => {
    const url = '/api/account-banned/getCurrentAccountBanned';

    return axiosClient.get(url);
  },
  collab_verifyAccount: (params: {
    code: number;
  }): Promise<AxiosResponse<ViewVerifyAccountResponse>> => {
    const url = '/api/account/input-verify';

    return axiosClient.get(url, { params });
  },
  admission_signupAccountInfo: (
    payload: AccountInfoSignup
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/admission/admission-account/createAccountInformation';

    return axiosClient.post(url, { ...payload });
  },
  admission_updateProfile: (
    payload: UserInfoUpdate
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/admission/admission-account/update';

    return axiosClient.put(url, { ...payload });
  },
  admission_updateAvatar: (
    payload: UpdateAvatarDto
  ): Promise<AxiosResponse<GetUserInfoDto>> => {
    const url = '/api/admission/admission-account/updateAvatar';

    return axiosClient.patch(url, { ...payload });
  },
};
