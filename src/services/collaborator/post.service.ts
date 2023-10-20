// PostService.ts
import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import PostDto from '../../dtos/collaborator/post.dto';
import ViewPostCategoryResponse from '../../dtos/collaborator/response/viewPostCategory.dto';
import FilterPostPayload from '../../dtos/collaborator/payload/filterPost.dto';

export const postService = {
  getAllPost: (params: FilterPostPayload): Promise<AxiosResponse<PostDto>> => {
    const url = '/api/post/getAll';
    console.log('Ahihi');
    return axiosClient.get(url, {params});
  },
  searchPostByPostCode: (searchPost: string): Promise<AxiosResponse<PostDto>> => {
    const url = '/api/post/search';
    console.log('Ahihi');
    return axiosClient.get(url, {
      params: {
        searchPost,
      },
    });
  },
  getAllPostCategory: () : Promise<AxiosResponse<ViewPostCategoryResponse>> => {
    const url = '/api/admission/admission-post-category/getAll';
    return axiosClient.get(url);
  }
};
