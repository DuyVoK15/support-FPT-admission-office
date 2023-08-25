import StatusInfo from "../../models/student/statusInfo.model";
import UserInfo from "../../models/student/userInfo.model";

export default interface LoginUser {
    status: StatusInfo;
    data: UserInfo;
}