import { DataBanking } from '../../../models/collaborator/banking.model';

export interface ViewBankingResponse {
  status: {
    success: boolean;
    message: string;
    errorCode: number;
  };
  data: DataBanking;
}
