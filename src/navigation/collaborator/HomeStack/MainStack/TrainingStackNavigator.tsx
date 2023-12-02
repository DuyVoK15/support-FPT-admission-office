import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeCollaboratorStackNavigatorParamList } from '../../../../../type';
import { ROUTES } from '../../../../constants/Routes';
import TrainingTab from '../MainTabs/TrainingTab';

const Stack =
  createNativeStackNavigator<HomeCollaboratorStackNavigatorParamList>();
const TrainingStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.TRAINING}>
      <Stack.Screen
        name={ROUTES.TRAINING}
        component={TrainingTab}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default TrainingStackNavigator;

const styles = StyleSheet.create({});
