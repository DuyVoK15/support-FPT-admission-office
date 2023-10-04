import { AccountInfo } from './account.model';

type DataPost = [
  Data
];

export type Data = {
  id: number;
    accountId: number;
    postCategoryId: number;
    postCode: string;
    postDescription: string;
    priority: number;
    dateFrom: string;
    dateTo: string;
    isPremium: boolean;
    status: number;
    attendanceComplete: boolean;
    createAt: string;
    updateAt: string;
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
        timeFrom: {
          ticks: number;
          days: number;
          hours: number;
          milliseconds: number;
          minutes: number;
          seconds: number;
          totalDays: number;
          totalHours: number;
          totalMilliseconds: number;
          totalMinutes: number;
          totalSeconds: number;
        };
        timeTo: {
          ticks: number;
          days: number;
          hours: number;
          milliseconds: number;
          minutes: number;
          seconds: number;
          totalDays: number;
          totalHours: number;
          totalMilliseconds: number;
          totalMinutes: number;
          totalSeconds: number;
        };
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
        timeFrom: {
          ticks: number;
          days: number;
          hours: number;
          milliseconds: number;
          minutes: number;
          seconds: number;
          totalDays: number;
          totalHours: number;
          totalMilliseconds: number;
          totalMinutes: number;
          totalSeconds: number;
        };
        timeTo: {
          ticks: number;
          days: number;
          hours: number;
          milliseconds: number;
          minutes: number;
          seconds: number;
          totalDays: number;
          totalHours: number;
          totalMilliseconds: number;
          totalMinutes: number;
          totalSeconds: number;
        };
        isBusService: boolean;
        amount: number;
        salary: number;
        registerAmount: number;
      },
    ];
}
export default DataPost;
