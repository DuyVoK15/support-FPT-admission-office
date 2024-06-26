// PostService.ts
import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import PostDto from '../../dtos/collaborator/post.dto';
import ViewPostCategoryResponse from '../../dtos/collaborator/response/viewPostCategory.dto';
import FilterPostPayload from '../../dtos/collaborator/parameter/filterPost.dto';
import { PostObjectResponse } from '../../dtos/collaborator/response/postObject.dto';

export const postService = {
  getAllPost: (params: FilterPostPayload): Promise<AxiosResponse<PostDto>> => {
    const url = '/api/post/getAll';
    return axiosClient.get(url, { params });
  },
  getPostById: (params: FilterPostPayload): Promise<AxiosResponse<PostObjectResponse>> => {
    const url = '/api/post/getById';
    return axiosClient.get(url, { params });
  },
  getPostReOpen: (
    params: FilterPostPayload
  ): Promise<AxiosResponse<PostDto>> => {
    const url = '/api/post/getReOpen';
    return axiosClient.get(url, { params });
  },
  searchPostByPostCode: (
    searchPost: string
  ): Promise<AxiosResponse<PostDto>> => {
    const url = '/api/post/search';
    return axiosClient.get(url, {
      params: {
        searchPost,
      },
    });
  },
  getAllPostCategory: (params?: {
    Id: number | null;
  }): Promise<AxiosResponse<ViewPostCategoryResponse>> => {
    const url = '/api/admission/admission-post-category/getAll';
    return axiosClient.get(url, { params });
  },
};
