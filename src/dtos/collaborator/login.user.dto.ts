import StatusInfo from "../../models/collaborator/statusInfo.model";
import UserInfo from "../../models/collaborator/userInfoLogin.model";

export default interface LoginUser {
    status: StatusInfo;
    data: UserInfo;
}