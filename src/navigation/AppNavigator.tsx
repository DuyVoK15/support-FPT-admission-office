import { StyleSheet } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/Routes';
import BottomTabs from './student/MainTab/BottomTabs';
import { useAppSelector } from '../app/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstants from '../enums/student/app';
import LoginScreen from './student/AuthStack/Login';

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
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const checkLoginStatus = async () => {
    const result = await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN) ? true : false;
    if (result) {
      setIsLogin(true)
    } else setIsLogin(false)
  };

  useEffect(() => {
    console.log('isAuthenticated: ', isAuthenticated)
    checkLoginStatus()
  }, [isAuthenticated]);
  return isLogin ? <HomeStudentStackScreen /> : <AuthStackScreen />;
}

export default AppNavigator;

const styles = StyleSheet.create({});
