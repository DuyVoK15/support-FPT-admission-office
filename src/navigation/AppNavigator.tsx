import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/Routes';
import BottomTabs from './collaborator/HomeStack/BottomTabs';

import { useAppSelector } from '../app/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from '../enums/collaborator/app';
import LoginScreen from './collaborator/AuthStack/Login';
import { useAppDispatch } from '../app/store';
import UserProfileSignup from '../screens/collaborator/Profile/UserProfileSignup/UserProfileSignup';
import { getRefreshIdToken } from '../config/rnfirebase';
import Loading from '../components/shared/Loading/Loading';
import { HomeCollaboratorStackNavigatorParamList } from '../../type';

import AdmissionBottomTabs from './admission/HomeStack/BottomTabs';
import GetUserInfoDto from '../dtos/collaborator/getUserInfo.dto';
import { UserInfo } from '../models/collaborator/userInfo.model';
import Verification from '../screens/collaborator/Verification';
import RoleId from '../enums/shared/RoleIdEnum';
import HomeCollaboratorStackScreen from './collaborator/HomeStack/HomeCollaboratorStack';
import HomeAdmissionStackScreen from './admission/HomeStack/HomeAdmissionStack';
import usePushNotifications from '../../usePushNotifications';
import LoadingScreen from '../components/shared/Loading/Loading';
import LoadAuthStateResponse from '../dtos/collaborator/response/loadAuthState.dto';
import useAppNavigator from './useAppNavigator';
import AccountInfoCreation from '../screens/collaborator/AccountInformationSignup/accountInfoCreation/AccountInfoCreation';
import ScanIDRecognitionBack from '../screens/collaborator/AccountInformationSignup/scanIDRecognitionBack/scanIDRecognitionBack';
import SignUpInformationNavigator from './collaborator/SignUpInformation/SignUpInformationNavigator';
import NetInfo from '@react-native-community/netinfo';
import NetworkCheck from '../../NetworkCheck';
import Spinner from 'react-native-loading-spinner-overlay';
import { FONTS_FAMILY } from '../constants/Fonts';
import { ScreenWidth } from '../constants/Demesions';
import ExpiredAccessToken from '../screens/collaborator/Authentication/ExpiredAccessToken';

const AuthStackScreen: React.FC = () => {
  return <LoginScreen />;
};

const AppNavigator: FC = () => {
  const { state, setState } = useAppNavigator();
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  const handleNetworkChange = (state: any) => {
    setConnectionStatus(state.isConnected);
    setConnectionType(state.type);
  };
  useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange);

    return () => {
      netInfoSubscription && netInfoSubscription();
    };
  }, []);
  // Check Loading Screen
  // if (
  //   state.collab_isAuthLoading ||
  //   state.collab_isLoadAuthStateLoading ||
  //   state.collab_isUserLoading
  // ) {
  //   return <LoadingScreen />;
  // }

  // Check if user is not active and role is COLLAB will navigate to Verification Screen
  if (
    state.collab_userInfo?.isActive === false &&
    state.roleId === RoleId.COLLAB_ROLE
  )
    return <Verification />;
    // if(state.isExpiredDate){
    //   return <ExpiredAccessToken />
    // }
  // Check if user hasn't account information and role is COLLAB will navigate to User Profile Signup
  const obj = state.collab_userInfo?.accountInformation;
  if (obj) {
    const keys: (keyof typeof obj)[] = Object.keys(obj) as (keyof typeof obj)[];
    if (
      keys.some((key) => obj[key] === null) &&
      state.roleId === RoleId.COLLAB_ROLE
    )
      return <SignUpInformationNavigator />;
  }

  // Return stack navigator
  return (
    <>
      <NetworkCheck visible={connectionStatus} />
      {state.collab_isAuthLoading ||
      state.collab_isLoadAuthStateLoading ||
      state.collab_isUserLoading ||
      state.collab_isSignupAccountInfo ? (
        <LoadingScreen />
      ) : state.collab_isAuthenticated &&
        state.roleId === RoleId.COLLAB_ROLE ? (
        <HomeCollaboratorStackScreen />
      ) : state.collab_isAuthenticated &&
        state.roleId === RoleId.ADMISSION_ROLE ? (
        <HomeAdmissionStackScreen />
      ) : (
        <AuthStackScreen />
      )}
    </>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
