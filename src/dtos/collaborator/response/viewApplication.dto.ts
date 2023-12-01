import { DataApplication } from '../../../models/collaborator/application.model';

export interface ViewApplicationResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: DataApplication[] | [];
  isError: boolean;
  message: string;
}
