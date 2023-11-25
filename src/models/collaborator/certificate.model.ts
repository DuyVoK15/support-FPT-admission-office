import { CertificateIssuerData } from './certificateIssuer.model';
import { TrainingCertificateData } from './trainingCertificate.model';

export interface CertificateData {
  id: number;
  status: number;
  createAt: string;
  updateAt: string;
  certificateIssuer: CertificateIssuerData;
  trainingCertificate: TrainingCertificateData;
}
