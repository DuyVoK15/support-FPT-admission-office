import StatusInfo from "../../models/collaborator/statusInfo.model";
import { UserInfo } from "../../models/collaborator/userInfo.model";


export default interface GetUserInfoDto {
    status: StatusInfo;
    data: UserInfo;
}
