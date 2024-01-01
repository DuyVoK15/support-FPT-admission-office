import { UserInfo } from './userInfo.model';

export interface DataApplication {
  id: number;
  accountId: number;
  reportDate: string;
  replyDate: string;
  problemNote: string;
  replyNote: string;
  status: number;
  account: UserInfo;
  accountReply: {
    id: number;
    name: string;
    email: string;
    imgUrl: string;
  };
}
