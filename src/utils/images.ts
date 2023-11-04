import { Asset } from 'expo-asset';

const imageNotFound = Asset.fromModule(require('../assets/Images/bg_image_not_found.jpg'));
export const imageNotFoundUri = imageNotFound?.uri;

const imageUndefinedUser = Asset.fromModule(require('../assets/Images/ic_user.png'));
export const imageUndefinedUserUri = imageUndefinedUser?.uri;
