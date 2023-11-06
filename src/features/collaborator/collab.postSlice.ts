import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostDto from '../../dtos/collaborator/post.dto';
import { postService } from '../../services/collaborator/post.service';
import DataPost from '../../models/collaborator/dataPost.model';
import { AxiosError } from 'axios';
import ViewPostCategoryResponse from '../../dtos/collaborator/response/viewPostCategory.dto';
import FilterPostPayload from '../../dtos/collaborator/payload/filterPost.dto';
import MetaDataPost from '../../models/collaborator/metaDataPost.model';

interface PostState {
  post: PostDto;
  postUpcomming: PostDto;
  postReOpen: PostDto;
  postMissingSlot: PostDto;
  metaDataPost: MetaDataPost;
  postCategory: ViewPostCategoryResponse;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const intitialPage = 1;
const ITEM_SIZE = 10;
const initialState: PostState = {
  post: {
    metadata: {
      page: intitialPage,
      size: ITEM_SIZE,
      total: 0,
    },
    data: [],
    isError: false,
    message: '',
  },
  postUpcomming: {
    metadata: {
      page: intitialPage,
      size: ITEM_SIZE,
      total: 0,
    },
    data: [],
    isError: false,
    message: '',
  },
  postReOpen: {
    metadata: {
      page: intitialPage,
      size: ITEM_SIZE,
      total: 0,
    },
    data: [],
    isError: false,
    message: '',
  },
  postMissingSlot: {
    metadata: {
      page: intitialPage,
      size: ITEM_SIZE,
      total: 0,
    },
    data: [],
    isError: false,
    message: '',
  },
  metaDataPost: {
    page: undefined,
    size: undefined,
    total: undefined,
  },
  postCategory: {
    metadata: {
      page: 1,
      size: ITEM_SIZE,
      total: 0,
    },
    data: [],
    isError: false,
    message: '',
  },
  loading: false,
  error: '',
};

export const getAllPost = createAsyncThunk(
  'post/getAll',
  async (params: FilterPostPayload, { rejectWithValue }) => {
    try {
      console.log('Có vô post');
      const response = await postService.getAllPost(params);
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
      return {
        response_data: response.data,
        query: params,
      };
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getPostReOpen = createAsyncThunk(
  'post/reopen/getAll',
  async (params: FilterPostPayload, { rejectWithValue }) => {
    try {
      console.log('Có vô post');
      const response = await postService.getPostReOpen(params);
      return {
        response_data: response.data,
        query: params,
      };
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
        const newData = action.payload.response_data.data;
        const page = Number(action.payload.query.Page);
        page > 1
          ? (state.postUpcomming.data as DataPost).push(...newData)
          : (state.postUpcomming.data = newData);
        state.postUpcomming.metadata.page =
          page + 1;
        state.postUpcomming.metadata.total =
          action.payload.response_data.metadata.total;
      })
      .addCase(getAllPostUpcomming.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      .addCase(getPostReOpen.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getPostReOpen.fulfilled, (state, action) => {
        state.loading = false;
        const newData = action.payload.response_data.data;
        const page = Number(action.payload.query.Page);
        page > 1
          ? (state.postReOpen.data as DataPost).push(...newData)
          : (state.postReOpen.data = newData);
        state.postReOpen.metadata.page =
          page + 1;
        state.postReOpen.metadata.total =
          action.payload.response_data.metadata.total;
      })
      .addCase(getPostReOpen.rejected, (state, action) => {
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
