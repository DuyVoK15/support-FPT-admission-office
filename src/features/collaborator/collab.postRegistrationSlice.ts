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
  postRegistrationConfirmed: ViewPostRegistrationResponse | null;
  postRegistrationCompleted: ViewPostRegistrationResponse | null;
  postRegistrationCancelled: ViewPostRegistrationResponse | null;
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
  postRegistrationConfirmed: null,
  postRegistrationCompleted: null,
  postRegistrationCancelled: null,
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

      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getAllPostRegistration_Pending = createAsyncThunk(
  'postRegistration/getAll/pending',
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

      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getAllPostRegistration_Confirmed = createAsyncThunk(
  'postRegistration/getAll/confirmed',
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

      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const getAllPostRegistration_Completed = createAsyncThunk(
  'postRegistration/getAll/completed',
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

      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const getAllPostRegistration_Cancelled = createAsyncThunk(
  'postRegistration/getAll/cancelled',
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

      return rejectWithValue(axiosError.response?.data);
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

      return rejectWithValue(axiosError.response?.data);
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

      return rejectWithValue(axiosError.response?.data);
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

      return rejectWithValue(axiosError.response?.data);
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
        let result = action.payload.query_data.RegistrationStatus?.join('-');
        switch (result) {
          case RegistrationStatus.PENDING.toString():
            state.postRegistrationPending = action.payload.response_data;
            break;
          case RegistrationStatus.CONFIRM + '-' + RegistrationStatus.CHECKIN:
            state.postRegistrationConfirmed = action.payload.response_data;
            break;
          case RegistrationStatus.CHECKOUT.toString():
            state.postRegistrationCompleted = action.payload.response_data;
            break;
          case RegistrationStatus.CANCEL.toString():
            state.postRegistrationCancelled = action.payload.response_data;
            break;
          default:
            console.log('No status');
        }
      })
      .addCase(getAllPostRegistration.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      // Pending
      .addCase(getAllPostRegistration_Pending.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllPostRegistration_Pending.fulfilled, (state, action) => {
        state.loading = false;
        state.postRegistrationPending = action.payload.response_data;
      })
      .addCase(getAllPostRegistration_Pending.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      // Confirmed
      .addCase(getAllPostRegistration_Confirmed.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllPostRegistration_Confirmed.fulfilled, (state, action) => {
        state.loading = false;
        state.postRegistrationConfirmed = action.payload.response_data;
      })
      .addCase(getAllPostRegistration_Confirmed.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      // Completed
      .addCase(getAllPostRegistration_Completed.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllPostRegistration_Completed.fulfilled, (state, action) => {
        state.loading = false;
        state.postRegistrationCompleted = action.payload.response_data;
      })
      .addCase(getAllPostRegistration_Completed.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      // Canncelled
      .addCase(getAllPostRegistration_Cancelled.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllPostRegistration_Cancelled.fulfilled, (state, action) => {
        state.loading = false;
        state.postRegistrationCancelled = action.payload.response_data;
      })
      .addCase(getAllPostRegistration_Cancelled.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      // Create
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
      // Delete
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
      // Update
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
