import { DataCertificateAdmission } from '../../../models/collaborator/dataCertificateAdmission.model';
import { DataTrainingCertificateRegistration } from '../../../models/collaborator/dataTrainingCertificateRegistration';
import DataEventDay from '../../../models/collaborator/eventDay.model';

export default interface ViewTrainingCertificateRegistrationResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: DataTrainingCertificateRegistration[] | [];
  isError: boolean;
  message: string;
}
