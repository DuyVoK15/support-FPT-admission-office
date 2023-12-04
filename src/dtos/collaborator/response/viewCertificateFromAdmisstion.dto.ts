import { DataCertificateAdmission } from '../../../models/collaborator/dataCertificateAdmission.model';

export default interface ViewCertificateAdmissionResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: DataCertificateAdmission[] | [];
  isError: boolean;
  message: string;
}
