import { AccountInfo, AccountInfoUpdate } from './account.model';

type UserInfo = {
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
    // accountMonthlyReport: {
    //     totalPost: number;
    //     totalSalary: number;
    // };
    accountInformation: AccountInfo;
};

type UserInfoUpdate = {
    name: string;
    phone: string;
    dateOfBirth: string;
    imgUrl: string;
    accountInformation: AccountInfoUpdate;
};

export { UserInfo, UserInfoUpdate };
