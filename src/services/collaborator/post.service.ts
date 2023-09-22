// PostService.ts
import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import PostDto from '../../dtos/collaborator/post.dto';

export const postService = {
  getAllPost: (): Promise<AxiosResponse<PostDto>> => {
    const url =
      '/api/post/getAll';
    console.log('Ahihi');
    return axiosClient.get(url);
  },
  
};
