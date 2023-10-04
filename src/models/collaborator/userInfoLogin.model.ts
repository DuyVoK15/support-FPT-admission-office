import { AccountInfo } from "./account.model";

type UserInfoLogin = {
    access_token: string
    account: {
        id: number,
        roleId: number,
        accountInformationId: number,
        name: string,
        email: string,
        phone: string,
        dateOfBirth: Date,
        imgUrl: string,
        postPermission: boolean,
        isPremium: boolean,
        isActive: boolean,
        createAt: string,
        updateAt: string,
        // accountMonthlyReport: {
        //     totalPost: number,
        //     totalSalary: number
        // },
        accountInformation: AccountInfo;
    }
    
};

export default UserInfoLogin;