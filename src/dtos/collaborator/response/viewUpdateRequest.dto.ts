import { DataUpdateRequest } from '../../../models/collaborator/dataUpdateRequest.model';

export interface ViewUpdateRequest {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: DataUpdateRequest[] | [];
  isError: boolean;
  message: string;
}
