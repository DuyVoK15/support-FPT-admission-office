import StatusInfo from '../../../models/collaborator/statusInfo.model';

export default interface UpdateEnableAccountResponse {
  status: StatusInfo;
  data: {
    expirationDate: string;
  };
}
