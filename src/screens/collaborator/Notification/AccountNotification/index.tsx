import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { ScreenHeight } from '../../../../constants/Demesions';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';

const AccountNotification = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  return (
    <View>
      <Header>
        <Backward onPress={() => navigation.goBack() }titleBackward="Notifications" />
      </Header>
    </View>
  )
}

export default AccountNotification;

const styles = StyleSheet.create({})