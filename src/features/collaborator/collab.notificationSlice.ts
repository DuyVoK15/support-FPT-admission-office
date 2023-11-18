import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ViewNotificationResponse } from '../../dtos/collaborator/response/viewNotification.dto';
import { notificationService } from '../../services/collaborator/notification.service';
import { FilterNotificationByTokenParam } from '../../dtos/collaborator/parameter/filterNotification.dto';
import { AxiosError } from 'axios';

interface ContractState {
  notificationByToken: ViewNotificationResponse;
  loading: boolean;
  error: string;
}

const initialState: ContractState = {
  notificationByToken: {
    metadata: {
      page: 1,
      size: 100,
      total: 0,
    },
    data: [],
    isError: false,
    message: '',
  },
  loading: false,
  error: '',
};

export const getAllNotificationByToken = createAsyncThunk(
  'notification/getAll/byToken',
  async (params: FilterNotificationByTokenParam, { rejectWithValue }) => {
    try {
      const response =
        await notificationService.getAllNotificationByToken(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotificationByToken.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllNotificationByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationByToken = action.payload;
      })
      .addCase(getAllNotificationByToken.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});

export default notificationSlice.reducer;
