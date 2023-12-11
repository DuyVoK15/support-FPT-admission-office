import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  UserInfo,
  UserInfoUpdate,
} from '../../models/collaborator/userInfo.model';
import { AccountInfoSignup } from '../../models/collaborator/account.model';
import { AxiosError } from 'axios';
import { accountService } from '../../services/collaborator/account.service';
import UpdateAvatarDto from '../../dtos/collaborator/parameter/updateAvatar.dto';
import GetUserInfoDto from '../../dtos/collaborator/getUserInfo.dto';
import StatusInfo from '../../models/collaborator/statusInfo.model';
import { useState } from 'react';
import UpdateEnableAccountResponse from '../../dtos/collaborator/response/updateEnableAccount.dto';
import ViewVerifyAccountResponse from '../../dtos/collaborator/response/viewVerifyAccount.dto';

interface AccountState {
  userInfo: GetUserInfoDto | null;
  userInfoSignup: GetUserInfoDto | null;
  enableResponse: UpdateEnableAccountResponse | null;
  verifyResponse: ViewVerifyAccountResponse | null;
  loading: boolean;
  loading_signup_accinfo: boolean;
  loading_update: boolean;
  error: GetUserInfoDto | null;
  statusCode: number | null;
}

const initialState: AccountState = {
  userInfo: null,
  userInfoSignup: null,
  enableResponse: null,
  verifyResponse: null,
  loading: false,
  loading_signup_accinfo: false,
  loading_update: false,
  error: null,
  statusCode: null,
};

// const [axiosErrorStatus, setAxiosErrorStatus] = useState<string>("");
export const collab_getUserInfo = createAsyncThunk(
  'account/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      console.log('tôi vô đây');
      const response = await accountService.collab_getUserInfo();
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const collab_signupAccountInformation = createAsyncThunk(
  'account/createAccountInfo',
  async (params: AccountInfoSignup, { rejectWithValue }) => {
    try {
      const response = await accountService.collab_signupAccountInfo(params);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const collab_updateProfile = createAsyncThunk(
  'account/update',
  async (params: UserInfoUpdate, { rejectWithValue }) => {
    try {
      const response = await accountService.collab_updateProfile(params);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log('Axios: ', axiosError.response?.data);

      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const collab_updateAvatar = createAsyncThunk(
  'account/updateAvatar',
  async (params: UpdateAvatarDto, { rejectWithValue }) => {
    try {
      const response = await accountService.collab_updateAvatar(params);
      console.log(JSON.stringify(response.data.data, null, 2));

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const collab_updateFrontImage = createAsyncThunk(
  'account/updateFrontImage',
  async (params: { identityFrontImg: string }, { rejectWithValue }) => {
    try {
      const response = await accountService.collab_updateFrontImage(params);
      console.log(JSON.stringify(response.data.data, null, 2));

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const collab_updateBackImage = createAsyncThunk(
  'account/updateBackImage',
  async (params: { identityBackImg: string }, { rejectWithValue }) => {
    try {
      const response = await accountService.collab_updateBackImage(params);
      console.log(JSON.stringify(response.data.data, null, 2));

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const collab_updateInformationFront = createAsyncThunk(
  'account/updateInformationFront',
  async (
    params: {
      identityNumber: string;
      address: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response =
        await accountService.collab_updateInformationFront(params);
      console.log(JSON.stringify(response.data.data, null, 2));

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const collab_updateInformationBack = createAsyncThunk(
  'account/updateInformationBack',
  async (
    params: {
      identityNumber: string;
      identityIssueDate: string;
      placeOfIssue: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response =
        await accountService.collab_updateInformationBack(params);
      console.log(JSON.stringify(response.data.data, null, 2));

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const collab_enableAccount = createAsyncThunk(
  'account/enable-account',
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountService.collab_enableAccount();
      console.log(JSON.stringify(response.data.data, null, 2));

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      console.log(axiosError.message);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const collab_verifyAccount = createAsyncThunk(
  'account/verify-account',
  async (params: { code: number }, { rejectWithValue }) => {
    try {
      const response = await accountService.collab_verifyAccount(params);
      console.log(JSON.stringify(response.data.data, null, 2));

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      console.log(axiosError.message);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const admission_signupAccountInformation = createAsyncThunk(
  'account-admission/createAccountInfo',
  async (params: AccountInfoSignup, { rejectWithValue }) => {
    try {
      const response = await accountService.admission_signupAccountInfo(params);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const admission_updateProfile = createAsyncThunk(
  'account-admission/update',
  async (params: UserInfoUpdate, { rejectWithValue }) => {
    try {
      const response = await accountService.admission_updateProfile(params);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log('Axios: ', axiosError.response?.data);
      // console.log(JSON.stringify(axiosError, null, 2));
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const admission_updateAvatar = createAsyncThunk(
  'account-admission/updateAvatar',
  async (params: UpdateAvatarDto, { rejectWithValue }) => {
    try {
      const response = await accountService.admission_updateAvatar(params);
      console.log(JSON.stringify(response.data.data, null, 2));

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      console.log(axiosError.message);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const collab_loadStatusCode = createAsyncThunk(
  'account/loadStatusCode',
  async (_, { rejectWithValue }) => {
    try {
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      console.log(axiosError.message);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(collab_getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(collab_getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(collab_getUserInfo.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading_signup_accinfo = false;
      })
      .addCase(collab_signupAccountInformation.pending, (state) => {
        state.loading_signup_accinfo = true;
        state.error = null;
      })
      .addCase(collab_signupAccountInformation.fulfilled, (state, action) => {
        state.userInfoSignup = action.payload;
        state.loading_signup_accinfo = false;
      })
      .addCase(collab_signupAccountInformation.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading = false;
      })
      .addCase(collab_updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(collab_updateProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(collab_updateProfile.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading = false;
      })
      .addCase(collab_updateAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(collab_updateAvatar.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(collab_updateAvatar.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading = false;
      })

      .addCase(collab_updateFrontImage.pending, (state) => {
        state.loading_update = true;
        state.error = null;
      })
      .addCase(collab_updateFrontImage.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading_update = false;
      })
      .addCase(collab_updateFrontImage.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading_update = false;
      })

      .addCase(collab_updateBackImage.pending, (state) => {
        state.loading_update = true;
        state.error = null;
      })
      .addCase(collab_updateBackImage.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading_update = false;
      })
      .addCase(collab_updateBackImage.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading_update = false;
      })

      .addCase(collab_updateInformationFront.pending, (state) => {
        state.loading_update = true;
        state.error = null;
      })
      .addCase(collab_updateInformationFront.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading_update = false;
      })
      .addCase(collab_updateInformationFront.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading_update = false;
      })

      .addCase(collab_updateInformationBack.pending, (state) => {
        state.loading_update = true;
        state.error = null;
      })
      .addCase(collab_updateInformationBack.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading_update = false;
      })
      .addCase(collab_updateInformationBack.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading_update = false;
      })

      .addCase(collab_loadStatusCode.pending, (state) => {
        state.loading = true;
        state.statusCode = null;
      })
      .addCase(collab_loadStatusCode.fulfilled, (state, action) => {
        state.statusCode = null;
        state.loading = false;
      })
      .addCase(collab_loadStatusCode.rejected, (state, action) => {
        state.statusCode = null;
        state.loading = false;
      })
      .addCase(collab_enableAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(collab_enableAccount.fulfilled, (state, action) => {
        state.enableResponse = action.payload;
        state.loading = false;
      })
      .addCase(collab_enableAccount.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading = false;
      })
      .addCase(collab_verifyAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(collab_verifyAccount.fulfilled, (state, action) => {
        state.verifyResponse = action.payload;
        state.loading = false;
      })
      .addCase(collab_verifyAccount.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading = false;
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default accountSlice.reducer;
