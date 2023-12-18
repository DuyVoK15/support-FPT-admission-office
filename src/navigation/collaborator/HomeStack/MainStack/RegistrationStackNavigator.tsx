import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingTab from '../MainTabs/RegistrationTab';
import RegistrationTab from '../MainTabs/RegistrationTab';
import Registration_Confirm_Detail from '../../../../screens/collaborator/Registration/Confirm/confirmDetail/RegistrationConfirmDetail';
import Registration_Pending_Detail from '../../../../screens/collaborator/Registration/Pending/pendingDetail/RegistrationPendingDetail';
import RequestChangePosition from '../../../../screens/collaborator/Registration/Confirm/reqChangePosition/RequestChangePosition';
import RequestChangePositionPending from '../../../../screens/collaborator/Registration/Pending/reqChangePosition/RequestChangePosition';
import RequestUpdateHistory from '../../../../screens/collaborator/Registration/Confirm/reqUpdateHistory/RequestUpdateHistory';
import {
  HomeCollaboratorScreenNavigationProp,
  HomeCollaboratorStackNavigatorParamList,
} from '../../../../../type';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../../constants/Routes';
import RegistrationDetail from '../../../../screens/collaborator/Registration/RegistrationDetail';

const Stack =
  createNativeStackNavigator<HomeCollaboratorStackNavigatorParamList>();
const RegistrationStackNavigator = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', (e: any) => {
  //     // Do something
  //     navigation.navigate(ROUTES.REGISTRATION_PENDING);
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  // // When have a navigate to this, this wil navigate to REGISTRATION_PENDING
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Thực hiện công việc khi Navigator 2 được focus (khi được navigate tới từ Navigator 1)
  //     console.log('Navigator 2 focused!');
  //     navigation.navigate(ROUTES.REGISTRATION_PENDING);
  //     // Các hành động khác có thể được thực hiện ở đây khi Navigator 2 được focus

  //     return () => {
  //       // Có thể thực hiện các công việc cleanup nếu cần khi Navigator 2 không còn được focus
  //     };
  //   }, [])
  // );
  return (
    <Stack.Navigator initialRouteName={ROUTES.REGISTRATION}>
      <Stack.Screen
        name={ROUTES.REGISTRATION}
        component={RegistrationTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.REGISTRATION_PENDING_DETAIL}
        component={Registration_Pending_Detail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.REQUEST_CHANGE_POSITION_PENDING}
        component={RequestChangePositionPending}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.REGISTRATION_CONFIRM_DETAIL}
        component={Registration_Confirm_Detail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.REQUEST_CHANGE_POSITION_CONFIRM}
        component={RequestChangePosition}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.REQUEST_UPDATE_HISTORY}
        component={RequestUpdateHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.REGISTRATION_DETAIL}
        component={RegistrationDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RegistrationStackNavigator;
