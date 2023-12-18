import { DataAccountBanned } from '../../../models/collaborator/accountBanned.model';

export default interface ViewAccountBannedResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: DataAccountBanned[] | [];
  isError: boolean;
  message: string;
}
