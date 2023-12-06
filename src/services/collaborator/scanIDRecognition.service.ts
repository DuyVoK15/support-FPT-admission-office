import axios, { AxiosResponse } from 'axios';
import axiosClient from '../axiosClient';
import {
  ViewRegistrationReportResponse,
  ViewReportResponse,
} from '../../dtos/collaborator/response/viewReport.dto';
import { FilterReportParam } from '../../dtos/collaborator/parameter/filterReport.dto';
import { ViewIDRecognitionBackResponse, ViewIDRecognitionFrontResponse } from '../../dtos/collaborator/response/viewIDRecognition.dto';

// report.service.ts
export const scanIDRecognitionService = {
  getInformationFromRecognitionFront: (
    imageUri: string | null
  ): Promise<AxiosResponse<ViewIDRecognitionFrontResponse>> => {
    const formData = new FormData();
    const fileName = imageUri?.split('/').pop();
    const fileType = 'image/jpeg'; // Change the type according to the image format being sent

    const file = {
      uri: imageUri,
      type: fileType,
      name: fileName || 'photo.jpg',
    };

    formData.append('image', file);
    const url = 'https://api.fpt.ai/vision/idr/vnm';
    return axios.post(url, formData, {
      headers: {
        'api-key': '6yrkYkXCyHo9qoMXVgp37RG5IWt8kDDg',
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getInformationFromRecognitionBack: (
    imageUri: string | null
  ): Promise<AxiosResponse<ViewIDRecognitionBackResponse>> => {
    const formData = new FormData();
    const fileName = imageUri?.split('/').pop();
    const fileType = 'image/jpeg'; // Change the type according to the image format being sent

    const file = {
      uri: imageUri,
      type: fileType,
      name: fileName || 'photo.jpg',
    };

    formData.append('image', file);
    const url = 'https://api.fpt.ai/vision/idr/vnm';
    return axios.post(url, formData, {
      headers: {
        'api-key': '6yrkYkXCyHo9qoMXVgp37RG5IWt8kDDg',
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
