import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { authService } from '../../services/collaborator/auth.service';
import { AxiosError } from 'axios';
import { RootState } from '../../app/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from '../../enums/student/app';
import auth from '@react-native-firebase/auth';
import { UserInfo } from '../../models/collaborator/userInfo.model';
import UserInfoLogin from '../../models/collaborator/userInfoLogin.model';

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

export const loginGoogle = createAsyncThunk(
    'auth/login-google',
    async (JWT: string, { rejectWithValue }) => {
        try {
            console.log('<AuthSlice> JWT: ', JWT);
            const result = await authService.loginGoogle({
                idToken: JWT,
                fcmToken: '',
            });
            await AsyncStorage.setItem(
                AppConstants.ACCESS_TOKEN,
                result.data.data.access_token
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
export const getUserInfo = createAsyncThunk(
    'auth/getUserInfo',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Có vô getUserInfo');
            const response = await authService.getUserInfo();
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
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Có vô logout');
            auth()
                .signOut()
                .then(() => console.log('User signed out!'));
            await AsyncStorage.removeItem(AppConstants.ACCESS_TOKEN);
            return true;
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
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.role = -1;
                state.loading = false;
                state.userInfoLogin = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = String(action.payload);
                state.loading = false;
            })
            .addCase(loginGoogle.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(loginGoogle.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.role = action.payload.data.account.roleId;
                state.loading = false;
            })
            .addCase(loginGoogle.rejected, (state, action) => {
                state.error = String(action.payload);
                state.loading = false;
            })
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.error = String(action.payload);
                state.loading = false;
            })
            .addMatcher(isAnyOf(loginGoogle.fulfilled), (state, action) => {
                state.isAuthenticated = true;
                state.role = action.payload.data.account.roleId;
                state.loading = false;
                state.userInfoLogin = action.payload.data;
            });
    },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
