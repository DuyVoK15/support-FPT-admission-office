import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostDto from '../../dtos/collaborator/post.dto';
import { postService } from '../../services/collaborator/post.service';
import DataPost from '../../models/collaborator/dataPost.model';
import { AxiosError } from 'axios';
import ViewPostCategoryResponse from '../../dtos/collaborator/response/viewPostCategory.dto';
import FilterPostPayload from '../../dtos/collaborator/parameter/filterPost.dto';
import {
  ViewRegistrationReportResponse,
  ViewReportResponse,
} from '../../dtos/collaborator/response/viewReport.dto';
import { reportService } from '../../services/collaborator/report.service';
import { ViewComplaintResponse } from '../../dtos/collaborator/response/viewComplaint.dto';
import { complaintService } from '../../services/collaborator/complaint.service';

interface ComplaintState {
  complaint: ViewComplaintResponse | null;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: ComplaintState = {
  complaint: null,
  loading: false,
  error: '',
};

export const getAllComplaint = createAsyncThunk(
  'complaint/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await complaintService.getAllComplaint();

      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const createComplaint = createAsyncThunk(
  'complaint/create',
  async (
    params: {
      problemNote: string
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await complaintService.createComplaint(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllComplaint.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllComplaint.fulfilled, (state, action) => {
        state.loading = false;
        state.complaint = action.payload;
      })
      .addCase(getAllComplaint.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
  },
});

export default complaintSlice.reducer;
