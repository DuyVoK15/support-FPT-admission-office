import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeCollaboratorStackNavigatorParamList } from '../../../../type';
import BottomTabs from './BottomTabs';
import { ROUTES } from '../../../constants/Routes';

const HomeCollaboratorStack =
  createNativeStackNavigator<HomeCollaboratorStackNavigatorParamList>();
const HomeCollaboratorStackScreen = () => {
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
export default HomeCollaboratorStackScreen;
const styles = StyleSheet.create({});
