import { DataContract } from '../../../models/collaborator/contract.model';

export interface ViewContractResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: DataContract[] | [];
  isError: boolean;
  message: string;
}
