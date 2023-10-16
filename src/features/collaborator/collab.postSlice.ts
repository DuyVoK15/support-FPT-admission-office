import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostDto from '../../dtos/collaborator/post.dto';
import { postService } from '../../services/collaborator/post.service';
import DataPost from '../../models/collaborator/dataPost.model';

interface PostState {
  post: PostDto | null;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: PostState = {
  post: {
    metadata: {
      page: undefined,
      size: undefined,
      total: undefined,
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
  async (_, { rejectWithValue }) => {
    try {
      console.log('Có vô post');
      const response = await postService.getAllPost();
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
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
      return response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.message);
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
