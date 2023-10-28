import { AccountInfo } from './account.model';

type DataPost = [
  Data
];

export type Data = {
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
    timeFrom: string;
    timeTo: string;
    totalAmountPosition: number;
    registerAmount: number;
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
      createAt: string;
      updateAt: string;
      accountInformation: AccountInfo;
    };
    postCategory: {
      id: number;
      postCategoryDescription: string;
      postCategoryType: string;
      isActive: boolean;
      createAt: string;
      updateAt: string;
    };
    postPositions: [
      {
        id: number;
        postId: number;
        trainingCertificateId: number;
        positionName: string;
        schoolName: string;
        location: string;
        timeFrom: string;
        timeTo:  string;
        isBusService: boolean;
        amount: number;
        salary: number;
        registerAmount: number;
      },
    ];
    trainingPositions: [
      {
        id: number;
        postId: number;
        trainingCertificateId: number;
        positionName: string;
        location: string;
        timeFrom: string;
        timeTo: string;
        isBusService: boolean;
        amount: number;
        salary: number;
        registerAmount: number;
      },
    ];
}
export default DataPost;
