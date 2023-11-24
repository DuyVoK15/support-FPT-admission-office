import { DataRequestUpdateHistory } from '../../../models/collaborator/dataUpdateRequest.model';

export interface ViewRequestUpdateHistory {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: DataRequestUpdateHistory[] | [];
  isError: boolean;
  message: string;
}
