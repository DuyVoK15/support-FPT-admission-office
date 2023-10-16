import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppDispatch } from '../../../app/store';
import { admission_logout } from '../../../features/admission/admission.authSlice';
import { Button } from '@rneui/base';

const Account = () => {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await dispatch(admission_logout());
  };
  return (
    <View style={styles.container}>
      <Text>Account</Text>
      <Button title={'Logout'} onPress={handleLogout} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
