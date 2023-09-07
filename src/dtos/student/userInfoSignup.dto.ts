import StatusInfo from "../../models/student/statusInfo.model";
import UserInfo from "../../models/student/userInfoLogin.model";

export default interface UserInfoManage {
    status: StatusInfo;
    data: UserInfo;
}