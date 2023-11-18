import { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import { CheckAttendanceResponse } from '../../dtos/collaborator/response/checkAttendance.dto';
import { CheckInParam, CheckOutParam } from '../../dtos/collaborator/parameter/checkAttendance.dto';

export const attendanceService = {
  checkInPostRegistration: (params: CheckInParam): Promise<AxiosResponse<CheckAttendanceResponse>> => {
    const url = '/api/check-attendance/check-in';

    return axiosClient.post(url, { ...params });
  },
  checkOutPostRegistration: (params: CheckOutParam): Promise<AxiosResponse<CheckAttendanceResponse>> => {
    const url = '/api/check-attendance/check-out';

    return axiosClient.post(url, { ...params });
  },
  
};
