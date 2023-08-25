import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import UserInfo from "../../models/student/userInfo.model";
import { authService } from "../../services/student/auth.service";
import { AxiosError } from "axios";
import { RootState } from "../../app/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppConstants from "../../enums/student/app";

interface AuthState {
  isAuthenticated: boolean;
  role: number,
  user: UserInfo | null;
  loading: boolean,
  error: string,

  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}
const initialState: AuthState = {
  isAuthenticated: false,
  role: -1,
  user: null,
  loading: false,
  error: ""
}

export const loginGoogle = createAsyncThunk(
  'auth/login-google',
  async (accessToken: string, { rejectWithValue }) => {
    try {
      console.log("<AuthSlice> Access Token: ", accessToken)
      const result = await authService.loginGoogle({ idToken: accessToken, fcmToken: "" })
      await AsyncStorage.setItem(AppConstants.ACCESS_TOKEN, result.data.data.access_token)
      console.log("<AuthSlice> Access Token: ", result.data.data.access_token)
      console.log("<AuthSlice> User Info: ", JSON.stringify(result.data.data))
      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(error)
      return rejectWithValue(axiosError.response?.data);
    }
  },
);
export const getUserInfo = createAsyncThunk(
  'auth/login-google',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getUserInfo();
      console.log("<AuthSlice> UserInfo: ", response.data.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);

    }
  },
)
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(login.pending, (state) => {
      //   state.loading = true;
      //   state.error = "";
      // })
      // .addCase(login.fulfilled, (state, action) => {
      //   state.isAuthenticated = true;
      //   state.loading = false;
      // })
      // .addCase(login.rejected, (state, action) => {
      //   state.error = String(action.payload);
      //   state.loading = false;
      // })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addMatcher(isAnyOf(loginGoogle.fulfilled), (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload.data
      })
  },
}); 

export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
