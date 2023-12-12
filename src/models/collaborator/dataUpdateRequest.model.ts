import { DataPosition } from './dataPosition.model';

export interface DataRequestUpdateHistory {
  id: number;
  postRegistrationId: number;
  positionId: number;
  originalId: number;
  busOption: boolean;
  status: number;
  createAt: string;
  updateAt: string;
  postRegistration: {
    id: number;
    registrationCode: string;
    accountId: number;
    positionId: number;
    note: string;
    salary: number;
    status: number;
    schoolBusOption: boolean;
    createAt: string;
    updateAt: string;
    position: DataPosition;
  };
  post: {
    id: number;
    accountId: number;
    postCategoryId: number;
    postCode: string;
    postImg: string;
    postDescription: string;
    priority: number;
    dateFrom: string;
    dateTo: string;
    isPremium: boolean;
    status: number;
    createAt: string;
    updateAt: string;
  };
  postPositionNeedToBeUpdated: DataPosition;
  postPositionOriginal: DataPosition;
}
