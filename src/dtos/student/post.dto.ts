import DataPost from '../../models/student/dataPost.model';
import MetaDataPost from '../../models/student/metaDataPost.model';

export default interface Post {
  metadata: MetaDataPost;
  data: DataPost | [];
  isError: boolean;
  message: string;
}
