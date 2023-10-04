import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import SubmitButton from '../../../../components/shared/Button/SubmitButton';

const UserProfileDisable = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  return (
    <View>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="Disable Account"
        />
      </Header>
      <View style={{marginTop: 30, marginHorizontal: 20}}>
        <SubmitButton style={{backgroundColor: "#ff3512"}} titleButton='Disable This' />
      </View>
    </View>
  );
};

export default UserProfileDisable;

const styles = StyleSheet.create({});
