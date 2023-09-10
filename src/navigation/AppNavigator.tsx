import { StyleSheet } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/Routes';
import BottomTabs from './student/MainTab/BottomTabs';
import { useAppSelector } from '../app/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from '../enums/student/app';
import LoginScreen from './student/AuthStack/Login';
import { useAppDispatch } from '../app/store';
import { getUserInfo } from '../features/student/authSlice';
import UserProfileSignup from '../screens/student/Profile/UserProfileSignup';

const AuthStackScreen: React.FC = () => {
  return <LoginScreen />;
};

const HomeStudentStack = createNativeStackNavigator();
const HomeStudentStackScreen: React.FC = () => {
  return (
    <HomeStudentStack.Navigator>
      <HomeStudentStack.Screen
        name={ROUTES.HOME_TAB}
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
    </HomeStudentStack.Navigator>
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
  const loading = useAppSelector((state) => state.account.loading)
  const isLoading = useAppSelector((state) => state.auth.loading);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // Check login
  const checkLoginStatus = async () => {
    const result = (await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN))
      ? true
      : false;
    if (result) {
      setIsLogin(true);
    } else setIsLogin(false);
  };

  useEffect(() => {
    // console.log('isAuthenticated: ', isAuthenticated)
    checkLoginStatus();
  }, [isAuthenticated, isLoading]);

  const fetchUserInfo = async () => {
    await dispatch(getUserInfo());
  };

  useEffect(() => {
    fetchUserInfo();
    console.log(JSON.stringify(userInfo, null, 2));
  }, [loading]); 

  return isLogin ? (
    userInfo?.accountInformation === null ? (
      <UserProfileSignup />
    ) : (
      <HomeStudentStackScreen />
    )
  ) : (
    <AuthStackScreen />
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
