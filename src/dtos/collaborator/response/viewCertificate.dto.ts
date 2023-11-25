import { CertificateData } from '../../../models/collaborator/certificate.model';

export default interface ViewCertificateResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: CertificateData[] | [];
  isError: boolean;
  message: string;
}
