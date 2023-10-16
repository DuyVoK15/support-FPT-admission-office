import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  UserInfo,
  UserInfoUpdate,
} from '../../models/collaborator/userInfo.model';
import { AccountInfoSignup } from '../../models/collaborator/account.model';
import { AxiosError } from 'axios';
import { accountService } from '../../services/collaborator/account.service';
import UpdateAvatarDto from '../../dtos/collaborator/payload/updateAvatar.dto';
import GetUserInfoDto from '../../dtos/collaborator/getUserInfo.dto';
import StatusInfo from '../../models/collaborator/statusInfo.model';
import { useState } from 'react';

interface AccountState {
  userInfo: GetUserInfoDto | null;
  loading: boolean;
  error: GetUserInfoDto | null;
  statusCode: number | null;
}

const initialState: AccountState = {
  userInfo: null,
  loading: false,
  error: null,
  statusCode: null,
};

// const [axiosErrorStatus, setAxiosErrorStatus] = useState<string>("");
export const signupAccountInformation = createAsyncThunk(
  'account/createAccountInfo',
  async (params: AccountInfoSignup, { rejectWithValue }) => {
    try {
      const response = await accountService.signupAccountInfo(params);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.status);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'account/update',
  async (params: UserInfoUpdate, { rejectWithValue }) => {
    try {
      const response = await accountService.updateProfile(params);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log('Axios: ', axiosError.response?.status);
      // console.log(JSON.stringify(axiosError, null, 2));
      return rejectWithValue(axiosError.response?.status);
    }
  }
);
export const updateAvatar = createAsyncThunk(
  'account/updateAvatar',
  async (params: UpdateAvatarDto, { rejectWithValue }) => {
    try {
      const response = await accountService.updateAvatar(params);
      console.log(JSON.stringify(response.data.data, null, 2));

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      console.log(axiosError.message);
      return rejectWithValue(axiosError.response?.status);
    }
  }
);

export const loadStatusCode = createAsyncThunk(
  'account/loadStatusCode',
  async (_, { rejectWithValue }) => {
    try {
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      console.log(axiosError.message);
      return rejectWithValue(axiosError.response?.status);
    }
  }
);
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAccountInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAccountInformation.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(signupAccountInformation.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.statusCode = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading = false;
        state.statusCode = Number(action.payload);
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.error = action.payload as GetUserInfoDto;
        state.loading = false;
      })
      .addCase(loadStatusCode.pending, (state) => {
        state.loading = true;
        state.statusCode = null;
      })
      .addCase(loadStatusCode.fulfilled, (state, action) => {
        state.statusCode = null;
        state.loading = false;
      })
      .addCase(loadStatusCode.rejected, (state, action) => {
        state.statusCode = null;
        state.loading = false;
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default accountSlice.reducer;
