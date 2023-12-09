import { DataCertificateAdmission } from './dataCertificateAdmission.model';
import DataEventDay from './eventDay.model';

export interface DataTrainingCertificateRegistration {
  id: number;
  status: number;
  trainingCertificate: DataCertificateAdmission;
  eventDay: DataEventDay;
  confirmAt: string;
  createAt: string;
  updateAt: string;
}
