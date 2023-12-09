import { DataPost } from '../../../models/collaborator/dataPost.model';

export interface PostObjectResponse {
  status: {
    success: boolean;
    message: string;
    errorCode: number;
  };
  data: DataPost;
}
