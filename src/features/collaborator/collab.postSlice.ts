import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostDto from '../../dtos/collaborator/post.dto';
import { postService } from '../../services/collaborator/post.service';
import DataPost from '../../models/collaborator/dataPost.model';
import { AxiosError } from 'axios';
import ViewPostCategoryResponse from '../../dtos/collaborator/response/viewPostCategory.dto';
import FilterPostPayload from '../../dtos/collaborator/payload/filterPost.dto';
import MetaDataPost from '../../models/collaborator/metaDataPost.model';

interface PostState {
  post: PostDto | null;
  postUpcomming: PostDto | null;
  postMissingSlot: PostDto | null;
  metaDataPost: MetaDataPost | null;
  postCategory: ViewPostCategoryResponse | null;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: PostState = {
  post: null,
  postUpcomming: null,
  postMissingSlot: null,
  metaDataPost: null,
  postCategory: null,
  loading: false,
  error: '',
};

export const getAllPost = createAsyncThunk(
  'post/getAll',
  async (params: FilterPostPayload, { rejectWithValue }) => {
    try {
      console.log('Có vô post');
      const response = await postService.getAllPost(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getAllPostUpcomming = createAsyncThunk(
  'post/upcomming/getAll',
  async (params: FilterPostPayload, { rejectWithValue }) => {
    try {
      console.log('Có vô post');
      const response = await postService.getAllPost(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getAllPostMissingSlot = createAsyncThunk(
  'post/missingSlot/getAll',
  async (params: FilterPostPayload, { rejectWithValue }) => {
    try {
      console.log('Có vô post');
      const response = await postService.getAllPost(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getMetaDataPost = createAsyncThunk(
  'post/getMetaData',
  async (params: FilterPostPayload, { rejectWithValue }) => {
    try {
      console.log('Có vô post');
      const response = await postService.getAllPost(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getAllPostCategory = createAsyncThunk(
  'post/category/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postService.getAllPostCategory();
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const searchPostByPostCode = createAsyncThunk(
  'post/searchPost',
  async (searchPost: string, { rejectWithValue }) => {
    try {
      console.log('Có vô post');
      const response = await postService.searchPostByPostCode(searchPost);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPost.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(getAllPostUpcomming.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllPostUpcomming.fulfilled, (state, action) => {
        state.loading = false;
        state.postUpcomming = action.payload;
      })
      .addCase(getAllPostUpcomming.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(getAllPostMissingSlot.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllPostMissingSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.postMissingSlot = action.payload;
      })
      .addCase(getAllPostMissingSlot.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(getAllPostCategory.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllPostCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.postCategory = action.payload;
      })
      .addCase(getAllPostCategory.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(searchPostByPostCode.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(searchPostByPostCode.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(searchPostByPostCode.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});

export default postSlice.reducer;
