import { createAsyncThunk } from '@reduxjs/toolkit';
import Post from '../../dtos/student/post.dto';
import { postService } from '../../services/student/post.service';

interface PostState {
  post: Post | null;
  loading: boolean;
  error: string;
  // Thêm các trường khác liên quan đến người dùng nếu cần thiết
}

const initialState: PostState = {
  post: null,
  loading: false,
  error: '',
};

export const getAllPost = createAsyncThunk(
    'post/getAll',
    async (_, { rejectWithValue }) => {
      try {
        const response = await postService.getAllPost();
        console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
  
      }
    },
  )

export default postSlice.reducer;
