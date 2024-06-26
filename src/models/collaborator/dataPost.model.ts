import { DataPosition } from "./dataPosition.model";

export interface DataPost {
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
  timeFrom: string;
  timeTo: string;
  registerAmount: number;
  totalAmountPosition: number;
  totalRegisterAmount: number;
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
  postPositions: DataPosition[] | [];
}
