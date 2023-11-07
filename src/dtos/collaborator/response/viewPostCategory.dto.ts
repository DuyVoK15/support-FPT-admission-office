import { DataCategory } from "../../../models/collaborator/postCategory.model";

export default interface ViewPostCategoryResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: 
    DataCategory[]
 | [];
  isError: boolean;
  message: string;
}

