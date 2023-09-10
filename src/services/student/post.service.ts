// AuthService.ts
import { AxiosResponse } from 'axios';

// import LoginDto from '../dtos/login.dto';
// import LoginUserToken from '../dtos/login.userToken.model';
import axiosClient from './axiosClient';
import Post from '../../dtos/student/post.dto';

export const postService = {
  getAllPost: (): Promise<AxiosResponse<Post>> => {
    const url =
      '/api/post/getAll';
    console.log('Ahihi');
    return axiosClient.get(url);
  },
  
};
