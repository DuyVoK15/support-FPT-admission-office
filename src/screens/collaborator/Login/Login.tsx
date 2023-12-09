import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppIcon from '../../../components/collaborator/Login/AppIcon';
import CampusSelection from '../../../components/collaborator/Login/CampusSelection';
import LoginButton from '../../../components/collaborator/Login/LoginButton';
import AppVersion from '../../../components/collaborator/Login/AppVersion';
import 'expo-dev-client';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useAppDispatch } from '../../../app/store';
import {
  admission_getUserInfo,
  admission_loginGoogle,
  collab_getUserInfo,
  collab_loginGoogle,
} from '../../../features/collaborator/collab.authSlice';
import { useAppSelector } from '../../../app/hooks';
import Loading from '../../../components/shared/Loading/Loading';
import GmailSelectedEnum from '../../../enums/shared/GmailSelectedEnum';
import SelectDropdown from 'react-native-select-dropdown';
import GetUserInfoDto from '../../../dtos/collaborator/getUserInfo.dto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorStatus from '../../../dtos/collaborator/response/errorStatus.dto';
import { useToast } from 'react-native-toast-notifications';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { SHADOWS } from '../../../constants/Shadows';
import LoginUserDto from '../../../dtos/collaborator/login.user.dto';
import AppConstants from '../../../enums/collaborator/app';
import usePushNotifications from '../../../../usePushNotifications';
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '../../../../env';

const Login = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null | undefined>();
  const [gmailSelected, setGmailSelected] = useState<string>(
    GmailSelectedEnum.NO_SELECT
  );
  const roles = [
    GmailSelectedEnum.NO_SELECT,
    GmailSelectedEnum.COLLABORATOR,
    GmailSelectedEnum.ADMISSION_OFFICER,
  ];

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      }).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in flow');
        await GoogleSignin.signOut();
        // Handle cancellation gracefully (e.g., show a message to the user)
      } else {
        await GoogleSignin.signOut();
        // Handle other errors
        console.error('Error signing in with Google:', error);
        // Show an error message or perform other actions based on the error
      }
    }
  };

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (Platform.OS !== 'ios') {
    const {} = usePushNotifications();
  }

  return (
    <ImageBackground
      style={{ height: '100%', width: '100%' }}
      source={require('../../../assets/Images/bg_login.png')}
    >
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <AppIcon style={{ flex: 0, marginTop: 100 }} />
        <CampusSelection style={{ flex: 2 }} />
        <View style={{ marginBottom: 10 }}>
          <SelectDropdown
            dropdownStyle={{
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            rowTextStyle={{
              fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
              fontSize: 16,
            }}
            buttonStyle={{
              backgroundColor: '#FFF',
              borderRadius: 5,
              ...SHADOWS.SHADOW_06,
            }}
            buttonTextStyle={{
              fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
              fontSize: 16,
            }}
            data={roles}
            defaultValue={GmailSelectedEnum.NO_SELECT}
            onSelect={(selectedItem) => {
              if (selectedItem === GmailSelectedEnum.COLLABORATOR) {
                setGmailSelected(GmailSelectedEnum.COLLABORATOR);
              } else if (selectedItem === GmailSelectedEnum.ADMISSION_OFFICER) {
                setGmailSelected(GmailSelectedEnum.ADMISSION_OFFICER);
              }
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>

        <LoginButton
          style={{ flex: 1 }}
          onPress={() =>
            onGoogleButtonPress().then(async () => {
              if (gmailSelected === GmailSelectedEnum.NO_SELECT) {
                await GoogleSignin.signOut().then(()=>console.log('Google Signout'));
                toast.show('Please selected an gmail type!', {
                  type: 'danger',
                });
              }
              console.log('User signed in!');
              const currentUser = auth().currentUser;
              switch (gmailSelected) {
                case GmailSelectedEnum.COLLABORATOR:
                  if (currentUser) {
                    currentUser
                      .getIdToken()
                      .then(async (token) => {
                        console.log('<Login> Có token');
                        await dispatch(collab_loginGoogle(token)).then(
                          async (res) => {
                            console.log(JSON.stringify(res, null, 2));
                            const requestStatus = res?.meta?.requestStatus;
                            switch (requestStatus) {
                              case 'rejected':
                                const resRejectedData =
                                  res?.payload as ErrorStatus;
                                if (resRejectedData?.statusCode === 400) {
                                  if (resRejectedData?.errorCode === 4006) {
                                    toast.show(
                                      'You must login with gmail @fpt.edu.vn',
                                      { type: 'danger' }
                                    );
                                  }
                                }
                                await GoogleSignin.signOut().then(()=>console.log('Google Signout'));
                                break;
                              case 'fulfilled':
                                const data = res.payload as LoginUserDto;
                                await AsyncStorage.setItem(
                                  AppConstants.ROLE_ID,
                                  JSON.stringify(data?.data?.account?.roleId)
                                );

                                await AsyncStorage.setItem(
                                  AppConstants.USER_INFO,
                                  JSON.stringify(data?.data?.account)
                                );
                                await dispatch(collab_getUserInfo());
                                break;
                              default:
                                console.log('default');
                            }
                          }
                        );
                        console.log('<LoginScreen> JWT: ', token);
                      })
                      .catch((error) => {
                        console.log(
                          '<LoginScreen> Error getting ID token:',
                          error
                        );
                      });
                  }
                  break;
                case GmailSelectedEnum.ADMISSION_OFFICER:
                  if (currentUser) {
                    currentUser
                      .getIdToken()
                      .then(async (token) => {
                        console.log('<Login> Có token');
                        await dispatch(admission_loginGoogle(token)).then(
                          async (res) => {
                            const requestStatus = res?.meta?.requestStatus;
                            switch (requestStatus) {
                              case 'rejected':
                                const resRejectedData =
                                  res?.payload as ErrorStatus;
                                if (resRejectedData?.statusCode === 400) {
                                  if (resRejectedData?.errorCode === 4006) {
                                    toast.show(
                                      'You must login with gmail @fe.edu.vn',
                                      { type: 'danger' }
                                    );
                                  }
                                }
                                await GoogleSignin.signOut().then(()=>console.log('Google Signout'));
                                break;
                              case 'fulfilled':
                                const data = res.payload as LoginUserDto;
                                await AsyncStorage.setItem(
                                  AppConstants.ROLE_ID,
                                  JSON.stringify(data?.data?.account?.roleId)
                                );

                                await AsyncStorage.setItem(
                                  AppConstants.USER_INFO,
                                  JSON.stringify(data?.data?.account)
                                );
                                await dispatch(admission_getUserInfo());
                                break;
                              default:
                                console.log('default');
                            }
                          }
                        );
                        console.log('<LoginScreen> JWT: ', token);
                      })
                      .catch((error) => {
                        console.log(
                          '<LoginScreen> Error getting ID token:',
                          error
                        );
                      });
                  }
                  break;
                default: await GoogleSignin.signOut().then(()=>console.log('Google Signout'));
                  console.log('Vui lòng chọn');
              }
            })
          }
        />
        {/* <Text>{user?.displayName}</Text> */}
        <AppVersion style={{ flex: 0, marginBottom: 5 }} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({});
