import {
  ImageBackground,
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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAppDispatch } from '../../../app/store';
import {
  collab_getUserInfo,
  collab_loginGoogle,
} from '../../../features/collaborator/collab.authSlice';
import { useAppSelector } from '../../../app/hooks';
import Loading from '../../../components/shared/Loading/Loading';
import GmailSelectedEnum from '../../../enums/shared/GmailSelectedEnum';
import SelectDropdown from 'react-native-select-dropdown';
import {
  admission_getUserInfo,
  admission_loginGoogle,
} from '../../../features/admission/admission.authSlice';
import GetUserInfoDto from '../../../dtos/collaborator/getUserInfo.dto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorStatus from '../../../dtos/collaborator/response/errorStatus.dto';
import { useToast } from 'react-native-toast-notifications';

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
      webClientId:
        '799879175588-c3eve1j8aprq6ijv45roetch9huje68f.apps.googleusercontent.com',
      iosClientId:
        '799879175588-bn0dkiuaid4tv9rr5ms7n05hv5hq4biq.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
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

  return (
    <ImageBackground
      style={{ height: '100%', width: '100%' }}
      source={require('../../../assets/Images/bg_login.png')}
    >
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <AppIcon />
        <CampusSelection />
        <SelectDropdown
          data={roles}
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
        <LoginButton
          onPress={() =>
            onGoogleButtonPress().then(() => {
              if(gmailSelected===GmailSelectedEnum.NO_SELECT){
                toast.show("Please selected an gmail type @!", {type: "danger"})
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
                            if (requestStatus === 'rejected') {
                              const resRejectedData =
                                res?.payload as ErrorStatus;
                              if (resRejectedData?.statusCode === 400) {
                                if (resRejectedData?.errorCode === 4006) {
                                  toast.show(
                                    'You must login with gmail @fpt.!ádasdasdasdasdasdasdasdasd',
                                    { type: 'danger' }
                                  );
                                }
                              }
                            } else {
                              console.log('<Login> Đnhap okie');
                              await dispatch(collab_getUserInfo()).then(
                                async (res) => {
                                  console.log(JSON.stringify(res, null, 2));
                                  const data = res?.payload as GetUserInfoDto;

                                  await AsyncStorage.setItem(
                                    'userInfo',
                                    JSON.stringify(data)
                                  );
                                }
                              );
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
                            console.log(JSON.stringify(res, null, 2));
                            const requestStatus = res?.meta?.requestStatus;
                            if (requestStatus === 'rejected') {
                              const resRejectedData =
                                res?.payload as ErrorStatus;
                              if (resRejectedData?.statusCode === 400) {
                                if (resRejectedData?.errorCode === 4006) {
                                  toast.show(
                                    'You must login with gmail @fpt.!ádasdasdasdasdasdasdasdasd',
                                    { type: 'danger' }
                                  );
                                }
                              }
                            } else {
                              console.log('<Login> Đnhap okie');
                              await dispatch(admission_getUserInfo()).then(
                                async (res) => {
                                  const data = res?.payload as GetUserInfoDto;
                                  console.log(JSON.stringify(data, null, 2));
                                  await AsyncStorage.setItem(
                                    'userInfo',
                                    JSON.stringify(data)
                                  );
                                }
                              );
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
                default:
                  console.log('Vui lòng chọn');
              }
            })
          }
        />
        <Text>{user?.displayName}</Text>
        <AppVersion />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({});
