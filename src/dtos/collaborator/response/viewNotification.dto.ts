import { DataNotification } from '../../../models/collaborator/notification.model';

export interface ViewNotificationResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: DataNotification[] | [];
  isError: boolean;
  message: string;
}
