import { postRegistrationService } from '../../services/collaborator/postRegistration.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import ViewPostRegistrationResponse from '../../dtos/collaborator/response/viewPostRegistration.dto';
import CreatePostRegistrationResponse from '../../dtos/collaborator/response/createPostRegistration.dto';
import DeletePostRegistraionResponse from '../../dtos/collaborator/response/cancelPostRegistration.dto';
import UpdatePostRegistrationResponse from '../../dtos/collaborator/response/updatePostRegistration.dto';
import CreatePostRegistrationParam from '../../dtos/collaborator/parameter/createPostRegistration.dto';
import UpdatePostRegistrationPayload from '../../dtos/collaborator/parameter/updatePostRegistration.dto';
import { FilterPostRegistration } from '../../dtos/collaborator/parameter/filterPostRegistration.dto';
import { CancelPostRegistrationParam } from '../../dtos/collaborator/parameter/cancelPostRegistration.dto';
import { ViewUpdateRequest } from '../../dtos/collaborator/response/viewUpdateRequest.dto';
import { RegistrationStatus } from '../../enums/collaborator/RegistrationStatus';

interface PostRegistrationState {
  postRegistration: ViewPostRegistrationResponse | null;
  postRegistrationPending: ViewPostRegistrationResponse | null;
  postRegistrationConfirm: ViewPostRegistrationResponse | null;
  postRegistrationCompleted: ViewPostRegistrationResponse | null;
  createPostRegistration: CreatePostRegistrationResponse | null;
  deletePostRegistraion: DeletePostRegistraionResponse | null;
  updatePostRegistration: UpdatePostRegistrationResponse | null;
  updateRequest: ViewUpdateRequest | null;
  checkInPostRegistration: ViewPostRegistrationResponse | null;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: PostRegistrationState = {
  postRegistration: {
    data: [],
  },
  postRegistrationPending: null,
  postRegistrationConfirm: null,
  postRegistrationCompleted: null,
  createPostRegistration: null,
  deletePostRegistraion: null,
  updatePostRegistration: null,
  updateRequest: null,
  checkInPostRegistration: null,
  loading: false,
  error: '',
};

export const getAllPostRegistration = createAsyncThunk(
  'postRegistration/getAll',
  async (params: FilterPostRegistration, { rejectWithValue }) => {
    try {
      const response =
        await postRegistrationService.getAllPostRegistration(params);
      return {
        response_data: response.data,
        query_data: params,
      };
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError.status);
      return rejectWithValue(axiosError.response?.status);
    }
  }
);
export const createPostRegistration = createAsyncThunk(
  'postRegistration/create',
  async (params: CreatePostRegistrationParam, { rejectWithValue }) => {
    try {
      const response =
        await postRegistrationService.createPostRegistration(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      // console.log(axiosError.status);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const cancelPostRegistration = createAsyncThunk(
  'postRegistration/cancel',
  async (params: CancelPostRegistrationParam, { rejectWithValue }) => {
    try {
      const response =
        await postRegistrationService.cancelPostRegistration(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError.status);
      return rejectWithValue(axiosError.response?.status);
    }
  }
);
export const updatePostRegistration = createAsyncThunk(
  'postRegistration/update',
  async (params: UpdatePostRegistrationPayload, { rejectWithValue }) => {
    try {
      const response =
        await postRegistrationService.updatePostRegistration(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError.status);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getAllUpdateRequest = createAsyncThunk(
  'postRegistration/updateRequest/getAll',
  async (params: FilterPostRegistration, { rejectWithValue }) => {
    try {
      const response =
        await postRegistrationService.getAllUpdateRequest(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError.status);
      return rejectWithValue(axiosError.response?.status);
    }
  }
);

export const getAllCheckInPostRegistration = createAsyncThunk(
  'postRegistration/checkIn/getAll',
  async (params: FilterPostRegistration, { rejectWithValue }) => {
    try {
      const response =
        await postRegistrationService.getAllCheckInPostRegistration(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError.status);
      return rejectWithValue(axiosError.response?.status);
    }
  }
);

export const postRegistrationSlice = createSlice({
  name: 'postRegistration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostRegistration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllPostRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.postRegistration = action.payload.response_data;
        switch (action.payload.query_data.Status) {
          case RegistrationStatus.PENDING:
            state.postRegistrationPending = action.payload.response_data;
            break;
          case RegistrationStatus.CONFIRM:
            state.postRegistrationConfirm = action.payload.response_data;
            break;
          case RegistrationStatus.COMPLETED:
            state.postRegistrationCompleted = action.payload.response_data;
            break;
          case RegistrationStatus.CHECKIN:
            state.postRegistrationConfirm = action.payload.response_data;
            break;
          case RegistrationStatus.CHECKOUT:
            state.postRegistrationConfirm = action.payload.response_data;
            break;
          default:
            console.log('No status');
        }
      })
      .addCase(getAllPostRegistration.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(createPostRegistration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createPostRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.createPostRegistration = action.payload;
      })
      .addCase(createPostRegistration.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(cancelPostRegistration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(cancelPostRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.deletePostRegistraion = action.payload;
      })
      .addCase(cancelPostRegistration.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(updatePostRegistration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updatePostRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.updatePostRegistration = action.payload;
      })
      .addCase(updatePostRegistration.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(getAllUpdateRequest.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllUpdateRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.updateRequest = action.payload;
      })
      .addCase(getAllUpdateRequest.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(getAllCheckInPostRegistration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllCheckInPostRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.checkInPostRegistration = action.payload;
      })
      .addCase(getAllCheckInPostRegistration.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});
export default postRegistrationSlice.reducer;
