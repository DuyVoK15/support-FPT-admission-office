import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Post from '../../dtos/student/post.dto';
import { postService } from '../../services/student/post.service';
import DataPost from '../../models/student/dataPost.model';

interface PostState {
  post: Post;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: PostState = {
  post: {
    metadata: {
      page: undefined,
      size: undefined,
      total: undefined
    },
    data: [],
    isError: false,
    message: ''
  },
  loading: false,
  error: '',
};

export const getAllPost = createAsyncThunk(
    'post/getAll',
    async (_, { rejectWithValue }) => {
      try {
        console.log("Có vô post")
        const response = await postService.getAllPost();
        console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
  
      }
    },
  )

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
    },
  });

export default postSlice.reducer;
