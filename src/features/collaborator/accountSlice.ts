import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  UserInfo,
  UserInfoUpdate,
} from '../../models/collaborator/userInfo.model';
import { AccountInfoSignup } from '../../models/collaborator/account.model';
import { AxiosError } from 'axios';
import { accountService } from '../../services/collaborator/account.service';
import UpdateAvatarDto from '../../dtos/collaborator/payload/updateAvatar.dto';

interface AccountState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string;
}

const initialState: AccountState = {
  userInfo: null,
  loading: false,
  error: '',
};

export const signupAccountInformation = createAsyncThunk(
  'account/createAccountInfo',
  async (accountInfo: AccountInfoSignup, { rejectWithValue }) => {
    try {
      const result = await accountService.signupAccountInfo({
        identityNumber: accountInfo.identityNumber,
        idStudent: accountInfo.idStudent,
        fbUrl: accountInfo.fbUrl,
        address: accountInfo.address,
        personalIdDate: accountInfo.personalIdDate,
        placeOfIssue: accountInfo.placeOfIssue,
        identityFrontImg: accountInfo.identityFrontImg,
        identityBackImg: accountInfo.identityFrontImg,
        taxNumber: accountInfo.taxNumber,
      });
      return result.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'account/update',
  async (account: UserInfoUpdate, { rejectWithValue }) => {
    try {
      const result = await accountService.updateProfile({
        name: account.name,
        phone: account.phone,
        dateOfBirth: account.dateOfBirth,
        imgUrl: account.imgUrl,
        accountInformation: {
          identityNumber: account.accountInformation.identityNumber,
          idStudent: account.accountInformation.idStudent,
          fbUrl: account.accountInformation.fbUrl,
          address: account.accountInformation.address,
          personalIdDate: account.accountInformation.personalIdDate,
          placeOfIssue: account.accountInformation.placeOfIssue,
          identityFrontImg: account.accountInformation.identityFrontImg,
          identityBackImg: account.accountInformation.identityBackImg,
          taxNumber: account.accountInformation.taxNumber,
        },
      });
      return result.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const updateAvatar = createAsyncThunk(
  'account/updateAvatar',
  async (imgUrl: string, { rejectWithValue }) => {
    try {
      const result = await accountService.updateAvatar({
        imgUrl,
      });
      return result.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
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
      .addCase(signupAccountInformation.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(signupAccountInformation.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(signupAccountInformation.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default accountSlice.reducer;
