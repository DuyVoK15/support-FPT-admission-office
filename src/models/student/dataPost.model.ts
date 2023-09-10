import { AccountInfo } from "./account.model";

type DataPost = [
  {
    id: number;
    accountId: number;
    postTitleId: number;
    postCode: string;
    postDescription: string;
    dateFrom: string;
    dateTo: string;
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
    priority: number;
    isPremium: boolean;
    location: string;
    attendanceComplete: boolean;
    isActive: boolean;
    isEnd: boolean;
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
      createAt: string;
      updateAt: string;
      accountMonthlyReport: {
        totalPost: number;
        totalSalary: number;
      };
      accountInformation: AccountInfo;
    };
    postTitle: {
      id: number;
      postTitleDescription: string;
      postTitleType: string;
      isActive: boolean;
      createAt: string;
      updateAt: string;
    };
    postPositions: [
      {
        id: number;
        postId: number;
        positionName: boolean;
        amount: number;
        salary: number;
      }
    ];
    trainingPositions: [
      {
        id: number;
        postId: number;
        positionName: string;
        amount: number;
        salary: number;
      }
    ];
  }]
;

export default DataPost;
