import { AxiosResponse } from 'axios';
import { ViewNotificationResponse } from '../../dtos/collaborator/response/viewNotification.dto';
import axiosClient from '../axiosClient';
import { FilterNotificationByTokenParam } from '../../dtos/collaborator/parameter/filterNotification.dto';

export const notificationService = {
  getAllNotificationByToken: (
    params: FilterNotificationByTokenParam
  ): Promise<AxiosResponse<ViewNotificationResponse>> => {
    const url = '/api/noti-history-test/getNotiByToken';
    return axiosClient.get(url, { params });
  },
};
