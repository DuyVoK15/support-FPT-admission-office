import { AccountInfo } from "./account.model";

export interface CertificateIssuerData {
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
  accountInformation: AccountInfo;
}
