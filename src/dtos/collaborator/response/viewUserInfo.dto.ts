export interface ViewUserInfoResponse {
  status: {
    success: boolean;
    message: string;
    errorCode: number;
  };
  data: {
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
}
