import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../../components/shared/Header/Back';
import { ScreenHeight } from '../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import RegistrationTopTabs from '../../../navigation/collaborator/RegistrationStack/RegistrationTopTabs';

const Registration = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header style={{ height: ScreenHeight / 9, flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
        <View style={{ marginBottom: 10, alignItems: "center" }}>
          <Text
            style={{ fontFamily: FONTS_FAMILY.Ubuntu_500Medium, fontSize: 24 }}
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
