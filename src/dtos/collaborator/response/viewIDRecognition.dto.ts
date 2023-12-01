import {
  DataIDRecognitionFront,
  DataIDRecognitionBack,
} from '../../../models/collaborator/idRecognition.model';

export interface ViewIDRecognitionFrontResponse {
  errorCode: number;
  errorMessage: string;
  data: DataIDRecognitionFront[] | [];
}

export interface ViewIDRecognitionBackResponse {
  errorCode: number;
  errorMessage: string;
  data: DataIDRecognitionBack[] | [];
}
