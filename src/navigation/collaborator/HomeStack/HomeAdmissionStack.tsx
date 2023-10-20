import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdmissionBottomTabs from '../../admission/HomeStack/BottomTabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeAdmissionStack = createNativeStackNavigator();
const HomeAdmissionStackScreen: React.FC = () => {
  return (
    <HomeAdmissionStack.Navigator>
      <HomeAdmissionStack.Screen
        name={"HomeTab"}
        component={AdmissionBottomTabs}
        options={{
          headerShown: false,
        }}
      />
    </HomeAdmissionStack.Navigator>
  );
};

export default HomeAdmissionStackScreen;

const styles = StyleSheet.create({})