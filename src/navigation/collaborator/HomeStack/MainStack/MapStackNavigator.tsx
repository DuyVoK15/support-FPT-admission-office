import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapTab from '../MainTabs/MapTab';
import { ROUTES } from '../../../../constants/Routes';
import { useAppDispatch } from '../../../../app/store';
import { getPostRegistrationById_Confirmed } from '../../../../features/collaborator/collab.postRegistrationSlice';
import { RegistrationStatus } from '../../../../enums/collaborator/RegistrationStatus';
import ViewPostRegistrationResponse from '../../../../dtos/collaborator/response/viewPostRegistration.dto';

const Stack = createNativeStackNavigator();
const MapStackNavigator = () => {
  // const dispatch = useAppDispatch();

  // const fetchPostRegistrationConfirmed = async () => {
  //   await dispatch(
  //     getPostRegistrationById_Confirmed({
  //       RegistrationStatus: [
  //         RegistrationStatus.CONFIRM,
  //         RegistrationStatus.CHECKIN,
  //       ],
  //     })
  //   ).then((res) => {
  //     console.log(JSON.stringify(res, null, 2));
  //     const resData = res?.payload as ViewPostRegistrationResponse;
  //   });
  // };
  
  // useEffect(() => {
  //   const fetch = async () => {
  //     await fetchPostRegistrationConfirmed();
  //   };
  //   fetch();
  // }, []);  
  return (
    <Stack.Navigator initialRouteName={ROUTES.MAP}>
      <Stack.Screen
        name={ROUTES.MAP}
        component={MapTab}
        options={{
          headerShown: false,       
        }}
      />
    </Stack.Navigator>
  )
}

export default MapStackNavigator;