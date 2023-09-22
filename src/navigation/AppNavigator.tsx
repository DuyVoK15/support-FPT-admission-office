import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/Routes';
import BottomTabs from './collaborator/HomeStack/BottomTabs';
import { useAppSelector } from '../app/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from '../enums/student/app';
import LoginScreen from './collaborator/AuthStack/Login';
import { useAppDispatch } from '../app/store';
import {
  getUserInfo,
  loadAuthState,
  loginGoogle,
} from '../features/collaborator/authSlice';
import UserProfileSignup from '../screens/collaborator/Profile/UserProfileSignup';
import { id } from 'date-fns/locale';
import { getRefreshIdToken } from '../config/rnfirebase';
import Loading from '../components/shared/Loading/Loading';
import { error } from 'console';

const AuthStackScreen: React.FC = () => {
  return <LoginScreen />;
};

const HomeCollaboratorStack = createNativeStackNavigator();
const HomeCollaboratorStackScreen: React.FC = () => {
  return (
    <HomeCollaboratorStack.Navigator>
      <HomeCollaboratorStack.Screen
        name={ROUTES.HOME_TAB}
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
    </HomeCollaboratorStack.Navigator>
  );
};

const HomeAdmissionStack = createNativeStackNavigator();
const HomeAdmissionStackScreen: React.FC = () => {
  return (
    <HomeAdmissionStack.Navigator>
      <HomeAdmissionStack.Screen
        name={ROUTES.HOME_TAB}
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
    </HomeAdmissionStack.Navigator>
  );
};

const AppNavigator: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const loading = useAppSelector((state) => state.account.loading);
  const isLoading = useAppSelector((state) => state.auth.loading);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // Check login
  // const checkLoginStatus = async () => {
  //   const result = (await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN))
  //     ? true
  //     : false;
  //   if (result) {
  //     setIsLogin(true);
  //   } else setIsLogin(false);
  // };

  // useEffect(() => {
  //   console.log('isAuthenticated: ', isAuthenticated)
  //   checkLoginStatus();
  // }, [isAuthenticated]);

  const loadAuthState = async () => {
    console.log('Vô loadstate');
    try {
      const accessToken = await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN);
      if (accessToken) {
        await getRefreshIdToken();
        const idToken = await AsyncStorage.getItem(AppConstants.ID_TOKEN);
        if (idToken) {
          await dispatch(loginGoogle(idToken)).then(() => {
            fetchUserInfo();
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

  const fetchUserInfo = async () => {
    await dispatch(getUserInfo());
  };

  useEffect(() => {
    console.log('bf: ', isAuthenticated);
    setTimeout(() => {
      setIsLogin(false);
    }, 1000);
    if (isAuthenticated == false) {
      setIsLogin(true);
      loadAuthState();
    }
  }, []);

  useEffect(() => {
    console.log('Vô AppNavigator gọi getUsserInfo: ');
    // setIsLogin(false);
    // fetchUserInfo();

    // console.log(JSON.stringify(userInfo, null, 2));
  }, [loading, isAuthenticated]);

  if (isLogin) {
    return <Loading />;
  }

  return (isAuthenticated === true) ? (
    userInfo?.accountInformation === null ? (
      <UserProfileSignup />
    ) : (
      <HomeCollaboratorStackScreen />
    )
  ) : (
    <AuthStackScreen />
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
