import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostDto from '../../dtos/collaborator/post.dto';
import { postService } from '../../services/collaborator/post.service';
import DataPost from '../../models/collaborator/dataPost.model';
import { AxiosError } from 'axios';
import ViewPostCategoryResponse from '../../dtos/collaborator/response/viewPostCategory.dto';
import FilterPostPayload from '../../dtos/collaborator/payload/filterPost.dto';
import {
  ViewRegistrationReportResponse,
  ViewReportResponse,
} from '../../dtos/collaborator/response/viewReport.dto';
import { reportService } from '../../services/collaborator/report.service';

interface ReportState {
  report: ViewReportResponse | null;
  reportRegistration: ViewRegistrationReportResponse | null;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: ReportState = {
  report: null,
  reportRegistration: null,
  loading: false,
  error: '',
};

export const getAllReport = createAsyncThunk(
  'report/getAll',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Có vô post');
      const response = await reportService.getAllReport();

      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getRegistrationByReport = createAsyncThunk(
  'report/registrationByReportId/',
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
