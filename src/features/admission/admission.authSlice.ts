
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { RootState } from '../../app/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from '../../enums/collaborator/app';
import auth from '@react-native-firebase/auth';
import { UserInfo } from '../../models/collaborator/userInfo.model';
import UserInfoLogin from '../../models/collaborator/userInfoLogin.model';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { authService } from '../../services/admission/auth.service';

interface AuthState {
  isAuthenticated: boolean;
  role: number;
  userInfoLogin: UserInfoLogin | null;
  userInfo: UserInfo | null;
  loading: boolean;
  error: string;
}
const initialState: AuthState = {
  isAuthenticated: false,
  role: -1,
  userInfoLogin: null,
  userInfo: null,
  loading: false, 
  error: '',
};

export const admission_loginGoogle = createAsyncThunk(
  'admission/auth/login-google',
  async (JWT: string, { rejectWithValue }) => {
    try {
      console.log('<AuthSlice> JWT: ', JWT);
      const result = await authService.admission_loginGoogle({
        idToken: JWT,
        fcmToken: '',
      });
      console.log("<AuthSlice> ResData: ", JSON.stringify(result.data.data))
      await AsyncStorage.setItem(
        AppConstants.ACCESS_TOKEN,
        result.data.data.access_token
      );
      await AsyncStorage.setItem(
        AppConstants.ID_TOKEN,
        JWT
      );
      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      console.error(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const admission_loadAuthState = createAsyncThunk(
  'admission/auth/loadAuthState',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN);
      if (accessToken) {
        return true;
      }
      return false;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      console.error(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const admission_getUserInfo = createAsyncThunk(
  'admission/auth/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Có vô getUserInfo');
      const response = await authService.admission_getUserInfo();
      // console.log(
      //     '<AuthSlice> User Info: ' +
      //         JSON.stringify(response.data.data, null, 2)
      // );
      return response.data.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
); 
export const admission_logout = createAsyncThunk(
  'admission/auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Có vô logout');
      await auth()
        .signOut()
        .then(() => console.log('Current user signed out!'));
      await AsyncStorage.removeItem(AppConstants.ACCESS_TOKEN);
      await AsyncStorage.removeItem(AppConstants.ID_TOKEN);
      await AsyncStorage.removeItem("userInfo");
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut().then(() => {
        console.log("Google sign out!")
      }); 
      
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message); 
    }
  }
);
export const admission_authSlice = createSlice({
  name: 'admission/auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(admission_logout.pending, (state) => {
        console.log("pending out")
        state.loading = true;
        state.error = '';
      })
      .addCase(admission_logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.role = -1;
        state.loading = false;
        state.userInfoLogin = null; 
      }) 
      .addCase(admission_logout.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(admission_loginGoogle.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(admission_loginGoogle.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.role = action.payload.data.account.roleId;
        state.loading = false;
      })
      .addCase(admission_loginGoogle.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(admission_getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(admission_getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(admission_getUserInfo.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(admission_loadAuthState.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(admission_loadAuthState.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;     
      })
      .addCase(admission_loadAuthState.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addMatcher(isAnyOf(admission_loginGoogle.fulfilled), (state, action) => {
        state.isAuthenticated = true;
        state.role = action.payload.data.account.roleId;
        state.loading = false;
        state.userInfoLogin = action.payload.data;
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default admission_authSlice.reducer;
