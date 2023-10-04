import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import AppConstants from '../enums/collaborator/app';

export async function getRefreshIdToken() {
  const user = auth().currentUser;
  if (user) {
    try {
      const token = await user.getIdToken(true);
      AsyncStorage.setItem(AppConstants.ID_TOKEN, token);
      console.log('Refresh Token:', token);
    } catch (error) {
      console.error('Error getting refresh token:', error);
    }
  }
}
