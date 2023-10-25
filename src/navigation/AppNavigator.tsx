import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/Routes';
import BottomTabs from './collaborator/HomeStack/BottomTabs';

import { useAppSelector } from '../app/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from '../enums/collaborator/app';
import LoginScreen from './collaborator/AuthStack/Login';
import { useAppDispatch } from '../app/store';
import UserProfileSignup from '../screens/collaborator/Profile/UserProfileSignup';
import { getRefreshIdToken } from '../config/rnfirebase';
import Loading from '../components/shared/Loading/Loading';
import { HomeCollaboratorStackNavigatorParamList } from '../../type';
import {
  admission_getUserInfo,
  admission_loginGoogle,
} from '../features/admission/admission.authSlice';
import {
  collab_getUserInfo,
  collab_loginGoogle,
} from '../features/collaborator/collab.authSlice';
import AdmissionBottomTabs from './admission/HomeStack/BottomTabs';
import GetUserInfoDto from '../dtos/collaborator/getUserInfo.dto';
import { UserInfo } from '../models/collaborator/userInfo.model';
import Verification from '../screens/collaborator/Verification';
import RoleId from '../enums/shared/RoleIdEnum';
import HomeCollaboratorStackScreen from './collaborator/HomeStack/HomeCollaboratorStack';
import HomeAdmissionStackScreen from './collaborator/HomeStack/HomeAdmissionStack';
import usePushNotifications from '../../usePushNotifications';

const AuthStackScreen: React.FC = () => {
  return <LoginScreen />;
};

const AppNavigator: FC = () => {
  if (Platform.OS !== 'ios') {
    const { expoPushToken } = usePushNotifications();
    console.log('expoPushToken: ', expoPushToken);
  }
  

  const dispatch = useAppDispatch();
  const collab_isAuthenticated = useAppSelector(
    (state) => state.collab_auth.isAuthenticated
  );
  const collab_userInfo = useAppSelector((state) => state.collab_auth.userInfo);
  const collab_loadingAccount = useAppSelector(
    (state) => state.collab_account.loading
  );
  const collab_isLoading = useAppSelector((state) => state.collab_auth.loading);

  const admission_isAuthenticated = useAppSelector(
    (state) => state.admission_auth.isAuthenticated
  );
  const admission_userInfo = useAppSelector(
    (state) => state.admission_auth.userInfo
  );

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const fetchCollab_userInfo = async () => {
    await dispatch(collab_getUserInfo());
  };
  const collab_loadAuthState = async () => {
    console.log('Vô loadstate');
    try {
      const accessToken = await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN);
      if (accessToken) {
        await getRefreshIdToken();
        const idToken = await AsyncStorage.getItem(AppConstants.ID_TOKEN);
        if (idToken) {
          await dispatch(collab_loginGoogle(idToken)).then(() => {
            fetchCollab_userInfo();
          });
        } else {
          console.log('Mời bạn đăng nhập!');
        }
      } else {
        console.log('AccessToken null rồi nhé');
      }
      setIsLogin(false);
    } catch (error) {
      console.log(error);
      setIsLogin(false);
    }
  };

  const fetchAdmission_userInfo = async () => {
    await dispatch(admission_getUserInfo());
  };
  const admission_loadAuthState = async () => {
    console.log('Vô loadstate');
    try {
      const accessToken = await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN);
      if (accessToken) {
        await getRefreshIdToken();
        const idToken = await AsyncStorage.getItem(AppConstants.ID_TOKEN);
        if (idToken) {
          await dispatch(admission_loginGoogle(idToken)).then(() => {
            fetchAdmission_userInfo();
          });
        } else {
          console.log('Mời bạn đăng nhập!');
        }
      } else {
        console.log('AccessToken null rồi nhé');
      }
      setIsLogin(false);
    } catch (error) {
      console.log(error);
      setIsLogin(false);
    }
  };

  const getUserInfoAndLoadState = async () => {
    console.log('vô');
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) {
      const parseUserInfo: UserInfo = JSON.parse(userInfo);
      console.log(parseUserInfo);

      if (
        collab_isAuthenticated === false &&
        parseUserInfo?.roleId === RoleId.COLLAB_ROLE
      ) {
        setIsLogin(true);
        collab_loadAuthState();
      }

      if (
        admission_isAuthenticated === false &&
        parseUserInfo?.roleId === RoleId.ADMISSION_ROLE
      ) {
        setIsLogin(true);
        admission_loadAuthState();
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLogin(false);
    }, 1000);

    getUserInfoAndLoadState();
  }, []);

  useEffect(() => {
    if (
      collab_isAuthenticated &&
      collab_userInfo?.roleId === RoleId.COLLAB_ROLE
    ) {
      fetchCollab_userInfo();
    }
  }, [collab_loadingAccount, collab_isAuthenticated]);

  return collab_isAuthenticated &&
    collab_userInfo?.roleId === RoleId.COLLAB_ROLE ? (
    collab_userInfo?.isActive ? (
      collab_userInfo?.accountInformation! ? (
        <HomeCollaboratorStackScreen />
      ) : (
        <UserProfileSignup />
      )
    ) : (
      <Verification />
    )
  ) : admission_isAuthenticated &&
    admission_userInfo?.roleId === RoleId.ADMISSION_ROLE ? (
    <HomeAdmissionStackScreen />
  ) : (
    <AuthStackScreen />
  );
  {
  }
};

export default AppNavigator;

const styles = StyleSheet.create({});
