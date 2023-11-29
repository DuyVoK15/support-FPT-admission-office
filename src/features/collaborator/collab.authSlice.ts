import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authService } from '../../services/collaborator/auth.service';
import { AxiosError } from 'axios';
import { RootState } from '../../app/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from '../../enums/collaborator/app';
import auth from '@react-native-firebase/auth';
import { UserInfo } from '../../models/collaborator/userInfo.model';
import UserInfoLogin from '../../models/collaborator/userInfoLogin.model';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LoadAuthStateResponse from '../../dtos/collaborator/response/loadAuthState.dto';
import LoginGoogleParams from '../../dtos/collaborator/loginGoogle.dto';

GoogleSignin.configure({});

interface AuthState {
  isAuthenticated: boolean;
  role: number;
  userInfoLogin: UserInfoLogin | null;
  userInfo: UserInfo | null;
  user_loading: boolean;
  auth_loading: boolean;
  load_auth_state_loading: boolean;
  loading: boolean;
  error: string;
}
const initialState: AuthState = {
  isAuthenticated: false,
  role: -1,
  userInfoLogin: null,
  userInfo: null,
  user_loading: true,
  auth_loading: false,
  load_auth_state_loading: true,
  loading: false,
  error: '',
};

export const collab_loginGoogle = createAsyncThunk(
  'auth/login-google',
  async (idToken: string, { rejectWithValue }) => {
    try {
      console.log('<AuthSlice> JWT: ', idToken);
      const expoPushToken = await AsyncStorage.getItem(
        AppConstants.EXPO_PUSH_TOKEN
      );
      console.log('<AuthSlice> ExpoPushToken: ', expoPushToken);
      let expoPushTokenCheck = '';
      if (expoPushToken) {
        expoPushTokenCheck = expoPushToken;
      }
      const result = await authService.collab_loginGoogle({
        idToken,
        expoPushToken: expoPushTokenCheck,
      });
      await AsyncStorage.setItem(
        AppConstants.ACCESS_TOKEN,
        result.data.data.access_token
      );
      await AsyncStorage.setItem(AppConstants.ID_TOKEN, idToken);
      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError?.response?.data);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const collab_getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Có vô getUserInfo');
      const response = await authService.collab_getUserInfo();
      return response.data.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const resetUserLoading = createAsyncThunk(
  'auth/resetUserLoading',
  async (_, { rejectWithValue }) => {
    try {
      return true;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const collab_reloadGetUserInfo = createAsyncThunk(
  'auth/reloadGetUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Có vô reload Get User Info');
      const response = await authService.collab_getUserInfo();
      return response.data.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const collab_logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const expoPushToken = await AsyncStorage.getItem(
        AppConstants.EXPO_PUSH_TOKEN
      );
      console.log('<AuthSlice> ExpoPushToken: ', expoPushToken);
      let expoPushTokenCheck = '';
      if (expoPushToken) {
        expoPushTokenCheck = expoPushToken;
      }
      await authService.collab_logout({
        expoPushToken: expoPushTokenCheck,
      });
      // Remove AsyncStorage
      await auth()
        .signOut()
        .then(() => console.log('Current user signed out!'));
      await AsyncStorage.removeItem(AppConstants.ACCESS_TOKEN);
      await AsyncStorage.removeItem(AppConstants.ID_TOKEN);
      await AsyncStorage.removeItem(AppConstants.USER_INFO);
      await AsyncStorage.removeItem(AppConstants.EXPO_PUSH_TOKEN);
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut().then(() => {
        console.log('Google sign out!');
      });

      return true;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log('<Collab_logout>: ', error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const collab_loadAuthState = createAsyncThunk(
  'auth/loadAuthState',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN);
      const roleId = await AsyncStorage.getItem(AppConstants.ROLE_ID);
      if (accessToken) {
        return {
          isAuthenticated: true,
          roleId: roleId,
        } as LoadAuthStateResponse;
      }
      return {
        isAuthenticated: false,
        roleId: -1,
      } as LoadAuthStateResponse;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const admission_loginGoogle = createAsyncThunk(
  'auth-admission/login-google',
  async (JWT: string, { rejectWithValue }) => {
    try {
      console.log('<AuthSlice> JWT: ', JWT);
      const result = await authService.admission_loginGoogle({
        idToken: JWT,
        expoPushToken: '',
      });
      console.log('<AuthSlice> ResData: ', JSON.stringify(result.data.data));
      await AsyncStorage.setItem(
        AppConstants.ACCESS_TOKEN,
        result.data.data.access_token
      );
      await AsyncStorage.setItem(AppConstants.ID_TOKEN, JWT);
      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const admission_getUserInfo = createAsyncThunk(
  'auth-admission/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Có vô getUserInfo');
      const response = await authService.admission_getUserInfo();
      return response.data.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const admission_logout = createAsyncThunk(
  'auth-admission/logout',
  async (params: { expoToken: string }, { rejectWithValue }) => {
    try {
      console.log('Có vô logout');
      await auth()
        .signOut()
        .then(() => console.log('Current user signed out!'));
      await AsyncStorage.removeItem(AppConstants.ACCESS_TOKEN);
      await AsyncStorage.removeItem(AppConstants.ID_TOKEN);
      await AsyncStorage.removeItem(AppConstants.USER_INFO);
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut().then(() => {
        console.log('Google sign out!');
      });
      // const response = await authService.collab_logout(params);

      return true;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(error);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(collab_loginGoogle.pending, (state) => {
        state.auth_loading = true;
        state.error = '';
      })
      .addCase(collab_loginGoogle.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.role = action.payload.data.account.roleId;
        state.auth_loading = false;
      })
      .addCase(collab_loginGoogle.rejected, (state, action) => {
        state.error = String(action.payload);
        state.auth_loading = false;
      })
      .addCase(collab_getUserInfo.pending, (state) => {
        state.user_loading = true;
        state.error = '';
      })
      .addCase(collab_getUserInfo.fulfilled, (state, action) => {
        state.user_loading = false;
        state.userInfo = action.payload;
      })
      .addCase(collab_getUserInfo.rejected, (state, action) => {
        state.error = String(action.payload);
        state.user_loading = false;
      })
      .addCase(resetUserLoading.pending, (state) => {
        state.user_loading = true;
        state.error = '';
      })
      .addCase(resetUserLoading.fulfilled, (state, action) => {
        state.user_loading = false;
      })
      .addCase(resetUserLoading.rejected, (state, action) => {
        state.error = String(action.payload);
        state.user_loading = false;
      })
      .addCase(collab_logout.pending, (state) => {
        console.log('pending out');
        state.loading = true;
        state.error = '';
      })
      .addCase(collab_logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.role = -1;
        state.loading = false;
        state.userInfoLogin = null;
      })
      .addCase(collab_logout.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(collab_reloadGetUserInfo.pending, (state) => {
        // state.user_loading = true;
        state.error = '';
      })
      .addCase(collab_reloadGetUserInfo.fulfilled, (state, action) => {
        // state.user_loading = false;
        state.userInfo = action.payload;
      })
      .addCase(collab_reloadGetUserInfo.rejected, (state, action) => {
        state.error = String(action.payload);
        // state.user_loading = false;
      })
      .addCase(collab_loadAuthState.pending, (state) => {
        state.load_auth_state_loading = true;
        state.error = '';
      })
      .addCase(collab_loadAuthState.fulfilled, (state, action) => {
        action.payload.isAuthenticated === true
          ? (state.isAuthenticated = true)
          : (state.isAuthenticated = false);
        state.role = Number(action.payload.roleId);
        state.load_auth_state_loading = false;
      })
      .addCase(collab_loadAuthState.rejected, (state, action) => {
        state.error = String(action.payload);
        state.isAuthenticated = false;
        state.load_auth_state_loading = false;
      })
      .addCase(admission_loginGoogle.pending, (state) => {
        state.auth_loading = true;
        state.error = '';
      })
      .addCase(admission_loginGoogle.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.role = action.payload.data.account.roleId;
        state.auth_loading = false;
      })
      .addCase(admission_loginGoogle.rejected, (state, action) => {
        state.error = String(action.payload);
        state.auth_loading = false;
      })
      .addCase(admission_getUserInfo.pending, (state) => {
        state.user_loading = true;
        state.error = '';
      })
      .addCase(admission_getUserInfo.fulfilled, (state, action) => {
        state.user_loading = false;
        state.userInfo = action.payload;
      })
      .addCase(admission_getUserInfo.rejected, (state, action) => {
        state.error = String(action.payload);
        state.user_loading = false;
      })
      .addCase(admission_logout.pending, (state) => {
        console.log('pending out');
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
      });
    // .addMatcher(isAnyOf(collab_loginGoogle.fulfilled), (state, action) => {
    //   state.isAuthenticated = true;
    //   state.role = action.payload.data.account.roleId;
    //   state.loading = false;
    //   state.userInfoLogin = action.payload.data;
    // });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
