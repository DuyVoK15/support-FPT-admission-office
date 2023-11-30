import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import FeatureField from '../../../components/collaborator/Security/FeatureField';
import { ROUTES } from '../../../constants/Routes';

const Security = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  console.log(navigation)
  return (
    <View>
      <Header>
        <Backward
          onPress={() => navigation.navigate(ROUTES.ACCOUNT)}
          titleBackward="Security"
        />
      </Header>
      <View style={styles.container}>
        <FeatureField featureName="Change Password" />
        <FeatureField onPress={() => navigation.navigate(ROUTES.USER_PROFILE_DISABLE)} featureName="Disable Account" />
        <FeatureField featureName="2FA (2-factor authentication)" />
      </View>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 15,
  },
});
