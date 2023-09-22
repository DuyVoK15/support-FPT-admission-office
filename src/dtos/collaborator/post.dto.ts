import DataPost from '../../models/collaborator/dataPost.model';
import MetaDataPost from '../../models/collaborator/metaDataPost.model';

export default interface PostDto {
  metadata: MetaDataPost;
  data: DataPost | [];
  isError: boolean;
  message: string;
}
