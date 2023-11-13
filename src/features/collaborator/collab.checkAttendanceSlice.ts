import { postRegistrationService } from '../../services/collaborator/postRegistration.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  CheckInParam,
  CheckOutParam,
} from '../../dtos/collaborator/parameter/checkAttendance.dto';
import { attendanceService } from '../../services/collaborator/attendance.service';
import { CheckAttendanceResponse } from '../../dtos/collaborator/response/checkAttendance.dto';

interface CheckAttendanceState {
  dataCheckIn: CheckAttendanceResponse;
  dataCheckOut: CheckAttendanceResponse;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: CheckAttendanceState = {
  dataCheckIn: {
    status: {
      success: false,
      message: null,
      errorCode: null,
    },
    data: null,
  },
  dataCheckOut: {
    status: {
      success: false,
      message: null,
      errorCode: null,
    },
    data: null,
  },
  loading: false,
  error: '',
};

export const checkInPostRegistration = createAsyncThunk(
  'check-attendance/checkIn',
  async (params: CheckInParam, { rejectWithValue }) => {
    try {
      const response = await attendanceService.checkInPostRegistration(params);
      return {
        response_data: response.data,
        query_data: params,
      };
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const checkOutPostRegistration = createAsyncThunk(
  'check-attendance/checkOut',
  async (params: CheckOutParam, { rejectWithValue }) => {
    try {
      const response = await attendanceService.checkOutPostRegistration(params);
      return {
        response_data: response.data,
        query_data: params,
      };
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const checkAttendanceSlice = createSlice({
  name: 'checkAttendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check in
      .addCase(checkInPostRegistration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(checkInPostRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.dataCheckIn = action.payload.response_data;
      })
      .addCase(checkInPostRegistration.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      // Check out
      .addCase(checkOutPostRegistration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(checkOutPostRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.dataCheckOut = action.payload.response_data;
      })
      .addCase(checkOutPostRegistration.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});
export default checkAttendanceSlice.reducer;
