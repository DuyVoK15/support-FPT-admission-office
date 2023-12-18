import { DataAccountBanned } from '../../../models/collaborator/accountBanned.model';
import StatusInfo from '../../../models/collaborator/statusInfo.model';

export default interface ViewCurrentAccountBannedResponse {
  status: StatusInfo;
  data: DataAccountBanned;
}
