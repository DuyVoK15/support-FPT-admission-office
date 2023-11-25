import DataViewPostRegistration from '../../../models/collaborator/postRegistration.model';
import {
  DataRegistrationByReport,
  DataReport,
} from '../../../models/collaborator/report.mode';
import StatusInfo from '../../../models/collaborator/statusInfo.model';

export interface ViewReportResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: DataReport[] | [];
  isError: boolean;
  message: string;
}

export interface ViewRegistrationReportResponse {
  status: StatusInfo;
  data: DataRegistrationByReport[] | [];
}
