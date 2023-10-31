import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';

const HomeNotification = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  return (
    <View>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="Notifications"
        />
      </Header>
    </View>
  );
};

export default HomeNotification;

const styles = StyleSheet.create({});
