import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountTab from '../MainTabs/AccountTab';
import UserProfile from '../../../../screens/collaborator/Profile/UserProfile/UserProfile';
import CertificateHistory from '../../../../screens/collaborator/Certificate';
import Wallet from '../../../../screens/collaborator/Income/Income';
import Verification from '../../../../screens/collaborator/Verification';
import Notification from '../../../../screens/collaborator/Notification/AccountNotification';
import Security from '../../../../screens/collaborator/Security';
import UserProfileSignup from '../../../../screens/collaborator/Profile/UserProfileSignup/UserProfileSignup';
import UserProfileDisable from '../../../../screens/collaborator/Profile/UserProfileDisable';
import Contract from '../../../../screens/collaborator/Contract/Contract';
import {
  HomeCollaboratorScreenNavigationProp,
  HomeCollaboratorStackNavigatorParamList,
} from '../../../../../type';
import AccountNotification from '../../../../screens/collaborator/Notification/AccountNotification';
import { ROUTES } from '../../../../constants/Routes';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ViewApplication from '../../../../screens/collaborator/Application/ViewApplication/ViewApplication';

const Stack =
  createNativeStackNavigator<HomeCollaboratorStackNavigatorParamList>();
const AccountStackNavigator = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  // const route = useRoute();
  // let params = '';
  // if (route?.params !== undefined) {
  //   const { param } = route?.params as { param: ROUTES };
  //   params = param;
  // }
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', (e: any) => {
  //     // Do something
  //     navigation.navigate(ROUTES.ACCOUNT);
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  
  // useFocusEffect(
  //   useCallback(() => {
  //     navigation.navigate(ROUTES.ACCOUNT_STACK_NAVIGATOR);
  //   }, [])
  // );

  return (
    <Stack.Navigator initialRouteName={ROUTES.ACCOUNT}>
      <Stack.Screen
        name={ROUTES.ACCOUNT}
        component={AccountTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.USER_PROFILE}
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.CERTIFICATE_HISTORY}
        component={CertificateHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.WALLET}
        component={Wallet}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.VERIFICATION}
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.SECURITY}
        component={Security}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.ACCOUNT_NOTIFICATION}
        component={AccountNotification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.USER_PROFILE_DISABLE}
        component={UserProfileDisable}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.USER_PROFILE_SIGNUP}
        component={UserProfileSignup}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.CONTRACT}
        component={Contract}
        options={{
          animation: 'none',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.APPLICATION}
        component={ViewApplication}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
