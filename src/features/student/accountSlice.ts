import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserInfo, UserInfoUpdate } from '../../models/student/userInfo.model';
import { AccountInfoSignup } from '../../models/student/account.model';
import { AxiosError } from 'axios';
import { accountService } from '../../services/student/account.service';

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
        updateAccountInformation: {
          identityNumber: account.updateAccountInformation.identityNumber,
          idStudent: account.updateAccountInformation.idStudent,
          fbUrl: account.updateAccountInformation.fbUrl,
          address: account.updateAccountInformation.address,
          personalIdDate: account.updateAccountInformation.personalIdDate,
          placeOfIssue: account.updateAccountInformation.placeOfIssue,
          identityFrontImg: account.updateAccountInformation.identityFrontImg,
          identityBackImg: account.updateAccountInformation.identityBackImg,
          taxNumber: account.updateAccountInformation.taxNumber,
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
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default accountSlice.reducer;
