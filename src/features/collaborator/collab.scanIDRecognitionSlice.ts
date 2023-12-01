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
import {
  ViewIDRecognitionBackResponse,
  ViewIDRecognitionFrontResponse,
} from '../../dtos/collaborator/response/viewIDRecognition.dto';
import { scanIDRecognitionService } from '../../services/collaborator/scanIDRecognition.service';

interface InformationIDState {
  informationFront: ViewIDRecognitionFrontResponse | null;
  informationBack: ViewIDRecognitionBackResponse | null;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: InformationIDState = {
  informationFront: null,
  informationBack: null,
  loading: false,
  error: '',
};

export const getInformationFromRecognitionFront = createAsyncThunk(
  'information/getFront',
  async (imageUri: string | null, { rejectWithValue }) => {
    try {
      const response =
        await scanIDRecognitionService.getInformationFromRecognitionFront(
          imageUri
        );

      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getInformationFromRecognitionBack = createAsyncThunk(
  'information/getBack',
  async (imageUri: string | null, { rejectWithValue }) => {
    try {
      const response =
        await scanIDRecognitionService.getInformationFromRecognitionBack(
          imageUri
        );

      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const informationSlice = createSlice({
  name: 'information',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInformationFromRecognitionFront.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(
        getInformationFromRecognitionFront.fulfilled,
        (state, action) => {
          state.loading = false;
          state.informationFront = action.payload;
        }
      )
      .addCase(getInformationFromRecognitionFront.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(getInformationFromRecognitionBack.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getInformationFromRecognitionBack.fulfilled, (state, action) => {
        state.loading = false;
        state.informationBack = action.payload;
      })
      .addCase(getInformationFromRecognitionBack.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});

export default informationSlice.reducer;
