import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeCollaboratorStackNavigatorParamList } from '../../../../type';
import { ROUTES } from '../../../constants/Routes';
import AccountInfoCreation from '../../../screens/collaborator/AccountInformationSignup/accountInfoCreation/AccountInfoCreation';
import ScanIDRecognitionFront from '../../../screens/collaborator/AccountInformationSignup/scanIDRecognitionFront/scanIDRecognitionFront';
import ScanIDRecognitionBack from '../../../screens/collaborator/AccountInformationSignup/scanIDRecognitionBack/scanIDRecognitionBack';
import UserProfileSignup from '../../../screens/collaborator/Profile/UserProfileSignup/UserProfileSignup';

const Stack =
  createNativeStackNavigator<HomeCollaboratorStackNavigatorParamList>();
const SignUpInformationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.ACCOUNT_INFORMATION_CREATION}>
      <Stack.Screen
        name={ROUTES.ACCOUNT_INFORMATION_CREATION}
        component={AccountInfoCreation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.SCAN_FRONT_IMAGE}
        component={ScanIDRecognitionFront}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.SCAN_BACK_IMAGE}
        component={ScanIDRecognitionBack}
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
    </Stack.Navigator>
  );
};

export default SignUpInformationNavigator;

const styles = StyleSheet.create({});
