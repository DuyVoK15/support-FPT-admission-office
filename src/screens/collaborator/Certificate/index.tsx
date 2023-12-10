import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CertificateTopTabs from '../../../navigation/collaborator/CertificateStack/CertificateTopTabs';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { ScreenHeight } from '../../../constants/Demesions';
import { ROUTES } from '../../../constants/Routes';

const CertificateHistory = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="Cerificate History"
        />
      </Header>
      <CertificateTopTabs />
    </View>
  );
};

export default CertificateHistory;

const styles = StyleSheet.create({});
