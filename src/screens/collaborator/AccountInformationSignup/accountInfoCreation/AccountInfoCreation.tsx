import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScreenHeight } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import PickFrontImageTouchable from './PickFrontImageTouchable';
import PickBackImageTouchable from './PickBackImageTouchable';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { ROUTES } from '../../../../constants/Routes';
import { useAppSelector } from '../../../../app/hooks';
import { useAppDispatch } from '../../../../app/store';
import { collab_getUserInfo } from '../../../../features/collaborator/collab.accountSlice';
import { imageNotFoundUri } from '../../../../utils/images';
import SubmitButton from '../../../../components/shared/Button/SubmitButton';
import SubmitButtonDisable from '../../../../components/shared/Button/SubmitButtonDisable';
import LogoutButton from '../../../../components/shared/Button/LogoutButton';
import { collab_logout } from '../../../../features/collaborator/collab.authSlice';
import useCustomToast from '../../../../utils/toasts';

const AccountInfoCreation = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { showToastError } = useCustomToast();
  const informationFront = useAppSelector(
    (state) => state.collan_information.informationFront
  );
  const informationBack = useAppSelector(
    (state) => state.collan_information.informationBack
  );

  const userInfo = useAppSelector((state) => state.collab_account.userInfo);
  const fetchUserInfo = async () => {
    try {
      await dispatch(collab_getUserInfo()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(collab_logout()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('có nha mậy');
    const fetchUserInfoAsync = async () => {
      await fetchUserInfo();
    };
    fetchUserInfoAsync();
  }, [informationFront, informationBack]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 8, margin: 20, justifyContent: 'space-evenly' }}>
        {userInfo?.data?.accountInformation &&
        userInfo?.data?.accountInformation?.identityFrontImg !== null &&
        userInfo?.data?.accountInformation?.identityFrontImg !== '' ? (
          <Image
            source={{
              uri: userInfo?.data?.accountInformation?.identityFrontImg,
            }}
            style={{
              height: ScreenHeight * 0.3,
              borderWidth: 4,
              borderColor: COLORS?.grey_underline,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            resizeMode="cover"
          />
        ) : (
          <PickFrontImageTouchable
            onPress={() => navigation.navigate(ROUTES.SCAN_FRONT_IMAGE)}
          />
        )}
        {userInfo?.data?.accountInformation &&
        userInfo?.data?.accountInformation?.identityBackImg !== null &&
        userInfo?.data?.accountInformation?.identityBackImg !== '' ? (
          <Image
            source={{
              uri: userInfo?.data?.accountInformation?.identityBackImg,
            }}
            style={{
              height: ScreenHeight * 0.3,
              borderWidth: 4,
              borderColor: COLORS?.grey_underline,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            resizeMode="cover"
          />
        ) : (
          <PickBackImageTouchable
            onPress={() => {
              userInfo?.data?.accountInformation &&
              userInfo?.data?.accountInformation?.identityFrontImg !== null &&
              userInfo?.data?.accountInformation?.identityFrontImg !== ''
                ? navigation.navigate(ROUTES.SCAN_BACK_IMAGE)
                : showToastError('Please scan Front Image first!');
            }}
          />
        )}
      </View>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        {true ? (
          <SubmitButton
            titleButton="NEXT STEP"
            onPress={() => navigation.navigate(ROUTES.USER_PROFILE_SIGNUP)}
          />
        ) : (
          <SubmitButtonDisable titleButton="NEXT STEP" />
        )}
      </View>
      <View style={{ flex: 1, marginHorizontal: 20, alignItems: 'center' }}>
        <LogoutButton onPress={handleLogout} />
      </View>
    </View>
  );
};
export default AccountInfoCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
