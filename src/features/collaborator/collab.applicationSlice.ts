import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostDto from '../../dtos/collaborator/post.dto';
import { postService } from '../../services/collaborator/post.service';
import { AxiosError } from 'axios';
import ViewPostCategoryResponse from '../../dtos/collaborator/response/viewPostCategory.dto';
import FilterPostPayload from '../../dtos/collaborator/parameter/filterPost.dto';
import {
  ViewRegistrationReportResponse,
  ViewReportResponse,
} from '../../dtos/collaborator/response/viewReport.dto';
import { reportService } from '../../services/collaborator/report.service';
import { ViewApplicationResponse } from '../../dtos/collaborator/response/viewApplication.dto';
import { applicationService } from '../../services/collaborator/application.service';
import { FilterApplicationParam } from '../../dtos/collaborator/parameter/filterApplication.dto';

interface ApplicationState {
  application: ViewApplicationResponse | null;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: ApplicationState = {
  application: null,
  loading: false,
  error: '',
};

export const getAllApplication = createAsyncThunk(
  'application/getAll',
  async (params: FilterApplicationParam, { rejectWithValue }) => {
    try {
      const response = await applicationService.getAllApplication(params);

      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const createApplication = createAsyncThunk(
  'application/create',
  async (
    params: {
      problemNote: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await applicationService.createAppication(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllApplication.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.application = action.payload;
      })
      .addCase(getAllApplication.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(createApplication.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.loading = false;
        // state.application = action.payload;
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});

export default applicationSlice.reducer;
