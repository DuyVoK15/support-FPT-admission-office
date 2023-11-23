import { DataPosition } from './dataPosition.model';
import { DataPost } from './dataPost.model';

interface DataViewPostRegistration {
  id: number;
  registrationCode: string;
  status: number;
  schoolBusOption: boolean;
  createAt: string;
  updateAt: string;
  positionId: number;
  note: string;
  postPositionsUnregistereds: DataPosition[] | [];
  isUpdated: boolean;
  post: DataPost;
  postPosition: DataPosition;
}

export default DataViewPostRegistration;
