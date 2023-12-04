import { DataCertificateAdmission } from '../../../models/collaborator/dataCertificateAdmission.model';
import DataEventDay from '../../../models/collaborator/eventDay.model';

export default interface ViewTrainingCertificateRegistrationResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: [
    {
      id: number;
      status: number;
      trainingCertificate: DataCertificateAdmission;
      eventDay: DataEventDay;
    },
  ];
  isError: boolean;
  message: string;
}
