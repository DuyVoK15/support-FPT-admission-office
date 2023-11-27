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

const Stack =
  createNativeStackNavigator<HomeCollaboratorStackNavigatorParamList>();
const AccountStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'ACCOUNT'}
        component={AccountTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'PROFILE'}
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'CERTIFICATE_HISTORY'}
        component={CertificateHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'WALLET'}
        component={Wallet}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'VERIFICATION'}
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'SECURITY'}
        component={Security}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ACCOUNT_NOTIFICATION'}
        component={AccountNotification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'USER_PROFILE_DISABLE'}
        component={UserProfileDisable}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'PROFILE_SIGNUP'}
        component={UserProfileSignup}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'CONTRACT'}
        component={Contract}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
