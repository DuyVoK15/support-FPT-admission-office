import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  ViewRegistrationReportResponse,
  ViewReportResponse,
} from '../../dtos/collaborator/response/viewReport.dto';
import { reportService } from '../../services/collaborator/report.service';
import { FilterReportParam } from '../../dtos/collaborator/parameter/filterReport.dto';
import { DataReport } from '../../models/collaborator/report.mode';

interface ReportState {
  report: ViewReportResponse | null;
  totalSalary: number | null;
  reportRegistration: ViewRegistrationReportResponse | null;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: ReportState = {
  report: null,
  totalSalary: 0,
  reportRegistration: null,
  loading: false,
  error: '',
};

export const getAllReport = createAsyncThunk(
  'report/getAll',
  async (params: FilterReportParam, { rejectWithValue }) => {
    try {
      console.log('Có vô post');
      const response = await reportService.getAllReport(params);

      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getRegistrationByReport = createAsyncThunk(
  'report/registrationByReportId',
  async (
    params: {
      accountReportId: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await reportService.getRegistrationByReport(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
        const data = action.payload.data as DataReport[];
        state.totalSalary = data.reduce(
          (accumulator: number, currentValue: DataReport) =>
            accumulator + currentValue.salary,
          0
        );
      })
      .addCase(getAllReport.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(getRegistrationByReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getRegistrationByReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reportRegistration = action.payload;
      })
      .addCase(getRegistrationByReport.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});

export default reportSlice.reducer;
