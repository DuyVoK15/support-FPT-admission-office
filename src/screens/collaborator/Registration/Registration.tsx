import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Header from '../../../components/shared/Header/Back';
import { ScreenHeight } from '../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import RegistrationTopTabs from '../../../navigation/collaborator/RegistrationStack/RegistrationTopTabs';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';

const Registration = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  return (
    <View style={{ flex: 1 }}>
      <Header
        style={{
          height: Platform.OS === 'android' ? ScreenHeight * 0.1 :  ScreenHeight * 0.11,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <View style={{ marginBottom: 10, alignItems: 'center' }}>
          <Text
            style={{ fontFamily: FONTS_FAMILY.Ubuntu_500Medium, fontSize: 24, letterSpacing: 0.5 }}
          >
            My Registration
          </Text>
        </View>
      </Header>
      <RegistrationTopTabs />
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({});
