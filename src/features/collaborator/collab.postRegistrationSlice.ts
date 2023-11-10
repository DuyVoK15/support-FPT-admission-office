import { postRegistrationService } from '../../services/collaborator/postRegistration.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import ViewPostRegistrationDto from '../../dtos/collaborator/response/viewPostRegistration.dto';
import CreatePostRegistrationResponse from '../../dtos/collaborator/response/createPostRegistration.dto';
import DeletePostRegistraionResponse from '../../dtos/collaborator/response/cancelPostRegistration.dto';
import UpdatePostRegistrationResponse from '../../dtos/collaborator/response/updatePostRegistration.dto';
import CreatePostRegistrationDto from '../../dtos/collaborator/parameter/createPostRegistration.dto';
import UpdatePostRegistrationPayload from '../../dtos/collaborator/parameter/updatePostRegistration.dto';

interface PostRegistrationState {
  postRegistration: ViewPostRegistrationDto | null;
  createPostRegistration: CreatePostRegistrationResponse | null;
  deletePostRegistraion: DeletePostRegistraionResponse | null;
  updatePostRegistration: UpdatePostRegistrationResponse | null;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: PostRegistrationState = {
  postRegistration: {
    data: [],
  },
  createPostRegistration: null,
  deletePostRegistraion: null,
  updatePostRegistration: null,
  loading: false,
  error: '',
};

export const getAllPostRegistration = createAsyncThunk(
  'postRegistration/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postRegistrationService.getAllPostRegistration();
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError.status);
      return rejectWithValue(axiosError.response?.status);
    }
  }
);
export const createPostRegistration = createAsyncThunk(
  'postRegistration/create',
  async (params: CreatePostRegistrationDto, { rejectWithValue }) => {
    try {
      const response =
        await postRegistrationService.createPostRegistration(params);
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError.status);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const deletePostRegistration = createAsyncThunk(
  'postRegistration/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await postRegistrationService.deletePostRegistration(id);
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
        state.postRegistration = action.payload;
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
      .addCase(deletePostRegistration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(deletePostRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.deletePostRegistraion = action.payload;
      })
      .addCase(deletePostRegistration.rejected, (state, action) => {
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
      });
  },
});
export default postRegistrationSlice.reducer;
