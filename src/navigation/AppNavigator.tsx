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

const AuthStackScreen: React.FC = () => {
  return <LoginScreen />;
};

const AppNavigator: FC = () => {
  const { state } = useAppNavigator();

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

  // Check if user hasn't account information and role is COLLAB will navigate to User Profile Signup
  if (
    state.collab_userInfo?.accountInformation === null &&
    state.roleId === RoleId.COLLAB_ROLE
  )
    return <UserProfileSignup />;

  // Return stack navigator
  return state.collab_isAuthLoading ||
    state.collab_isLoadAuthStateLoading ||
    state.collab_isUserLoading ||
    state.collab_isSignupAccountInfo ? (
    <LoadingScreen />
  ) : state.collab_isAuthenticated && state.roleId === RoleId.COLLAB_ROLE ? (
    <HomeCollaboratorStackScreen />
  ) : state.collab_isAuthenticated && state.roleId === RoleId.ADMISSION_ROLE ? (
    <HomeAdmissionStackScreen />
  ) : (
    <AuthStackScreen />
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
