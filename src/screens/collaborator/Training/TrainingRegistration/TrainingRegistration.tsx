import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TrainingTopTabs from '../../../../navigation/collaborator/TrainingStack/TrainingTopTab';
import { ScreenHeight } from '../../../../constants/Demesions';
import Header from '../../../../components/shared/Header/Back';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import BackwardBlur from '../../../../components/shared/Direction/Backward/BackwardBlur';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { ROUTES } from '../../../../constants/Routes';

const TrainingRegistration = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <Header style={{ height: ScreenHeight / 9, flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
        <View style={{ marginBottom: 10, alignItems: "center" }}>
          <Text
            style={{ fontFamily: FONTS_FAMILY.Ubuntu_500Medium, fontSize: 24 }}
          >
            Interview Registration
          </Text>
        </View>
        <BackwardBlur onPress={() => navigation.navigate(ROUTES.TRAINING)} style={{position: 'absolute', left: 0, bottom: 10}} />
      </Header>
      <TrainingTopTabs />
    </View>
  );
};

export default TrainingRegistration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
