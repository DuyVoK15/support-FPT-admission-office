import { DataPosition } from './dataPosition.model';

interface DataViewPostRegistration {
  id: number;
  registrationCode: string;
  status: number;
  schoolBusOption: boolean;
  createAt: string;
  updateAt: string;
  positionId: number;
  note: string;
  postPositionsUnregistereds: DataPosition[] | [];
  isUpdated: boolean;
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
    attendanceComplete: boolean;
    createAt: string;
    updateAt: string;
    account: {
      id: number;
      roleId: number;
      accountInformationId: number;
      name: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      imgUrl: string;
      postPermission: boolean;
      isPremium: boolean;
      isActive: boolean;
      isBanned: boolean;
      createAt: string;
      updateAt: string;
      accountInformation: {
        id: number;
        accountId: number;
        identityNumber: string;
        idStudent: string;
        fbUrl: string;
        address: string;
        identityIssueDate: string;
        placeOfIssue: string;
        identityFrontImg: string;
        identityBackImg: string;
        taxNumber: string;
      };
    };
    postCategory: {
      id: number;
      postCategoryDescription: string;
      postCategoryType: string;
      isActive: boolean;
      createAt: string;
      updateAt: string;
    };
  };
  postPosition: DataPosition;
}

export default DataViewPostRegistration;
