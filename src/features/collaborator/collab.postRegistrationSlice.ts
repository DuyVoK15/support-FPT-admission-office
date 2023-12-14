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
import { ViewRequestUpdateHistory } from '../../dtos/collaborator/response/viewUpdateRequest.dto';
import { REGISTRATION_STATUS_ENUM } from '../../enums/collaborator/RegistrationStatus';

interface PostRegistrationState {
  postRegistration: ViewPostRegistrationResponse | null;
  postRegistrationPendingById: ViewPostRegistrationResponse | null;
  postRegistrationPending: ViewPostRegistrationResponse | null;
  postRegistrationConfirmed: ViewPostRegistrationResponse | null;
  postRegistrationConfirmedById: ViewPostRegistrationResponse | null;
  postRegistrationCompleted: ViewPostRegistrationResponse | null;
  postRegistrationCancelled: ViewPostRegistrationResponse | null;
  postRegistrationRejected: ViewPostRegistrationResponse | null;
  postRegistrationConfirmedOnMap: ViewPostRegistrationResponse | null;
  createPostRegistration: CreatePostRegistrationResponse | null;
  deletePostRegistraion: DeletePostRegistraionResponse | null;
  updatePostRegistration: UpdatePostRegistrationResponse | null;
  requestUpdateHistory: ViewRequestUpdateHistory | null;
  checkInPostRegistration: ViewPostRegistrationResponse | null;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: PostRegistrationState = {
  postRegistration: {
    data: [],
  },
  postRegistrationPendingById: null,
  postRegistrationPending: null,
  postRegistrationConfirmed: null,
  postRegistrationConfirmedById: null,
  postRegistrationCompleted: null,
  postRegistrationCancelled: null,
  postRegistrationRejected: null,
  postRegistrationConfirmedOnMap: null,
  createPostRegistration: null,
  deletePostRegistraion: null,
  updatePostRegistration: null,
  requestUpdateHistory: null,
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
export const getPostRegistrationById_Pending = createAsyncThunk(
  'postRegistration/getById/pending',
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
export const getPostRegistrationById_Confirmed = createAsyncThunk(
  'postRegistration/getById/confirmed',
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
export const getAllPostRegistration_Rejected = createAsyncThunk(
  'postRegistration/getAll/rejected',
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
export const getAllPostRegistrationConfirmedOnMap = createAsyncThunk(
  'postRegistration/getAll/confirm/onMap',
  async (params: FilterPostRegistration, { rejectWithValue }) => {
    try {
      const response =
        await postRegistrationService.getAllPostRegistrationConfirmedOnMap(params);
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

export const getAllRequestUpdateHistory = createAsyncThunk(
  'postRegistration/updateRequest/getAll',
  async (params: FilterPostRegistration, { rejectWithValue }) => {
    try {
      const response =
        await postRegistrationService.getAllRequestUpdateHistory(params);
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
          case REGISTRATION_STATUS_ENUM.PENDING.toString():
            state.postRegistrationPending = action.payload.response_data;
            break;
          case REGISTRATION_STATUS_ENUM.CONFIRM + '-' + REGISTRATION_STATUS_ENUM.CHECKIN:
            state.postRegistrationConfirmed = action.payload.response_data;
            break;
          case REGISTRATION_STATUS_ENUM.CHECKOUT.toString():
            state.postRegistrationCompleted = action.payload.response_data;
            break;
          case REGISTRATION_STATUS_ENUM.CANCEL.toString():
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
      // Pending By Id
      .addCase(getPostRegistrationById_Pending.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getPostRegistrationById_Pending.fulfilled, (state, action) => {
        state.loading = false;
        state.postRegistrationPendingById = action.payload.response_data;
      })
      .addCase(getPostRegistrationById_Pending.rejected, (state, action) => {
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
      // Confirmed by Id
      .addCase(getPostRegistrationById_Confirmed.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getPostRegistrationById_Confirmed.fulfilled, (state, action) => {
        state.loading = false;
        state.postRegistrationConfirmedById = action.payload.response_data;
      })
      .addCase(getPostRegistrationById_Confirmed.rejected, (state, action) => {
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
      // Rejected
      .addCase(getAllPostRegistration_Rejected.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllPostRegistration_Rejected.fulfilled, (state, action) => {
        state.loading = false;
        state.postRegistrationRejected = action.payload.response_data;
      })
      .addCase(getAllPostRegistration_Rejected.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      // Confirm on Map
      .addCase(getAllPostRegistrationConfirmedOnMap.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllPostRegistrationConfirmedOnMap.fulfilled, (state, action) => {
        state.loading = false;
        state.postRegistrationConfirmedOnMap = action.payload.response_data;
      })
      .addCase(getAllPostRegistrationConfirmedOnMap.rejected, (state, action) => {
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
      .addCase(getAllRequestUpdateHistory.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllRequestUpdateHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.requestUpdateHistory = action.payload;
      })
      .addCase(getAllRequestUpdateHistory.rejected, (state, action) => {
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
