import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
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
import { HomeCollaboratorStackNavigatorParamList } from '../../../../../type';
import AccountNotification from '../../../../screens/collaborator/Notification/AccountNotification';
import { ROUTES } from '../../../../constants/Routes';

const Stack =
  createNativeStackNavigator<HomeCollaboratorStackNavigatorParamList>();
const AccountStackNavigator = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
