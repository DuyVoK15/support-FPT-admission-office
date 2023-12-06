import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TrainingTopTabs from '../../../navigation/collaborator/TrainingStack/TrainingTopTab';
import { ScreenHeight } from '../../../constants/Demesions';
import Header from '../../../components/shared/Header/Back';
import { FONTS_FAMILY } from '../../../constants/Fonts';

const TrainingRegistration = () => {
  return (
    <View style={styles.container}>
      <Header style={{ height: ScreenHeight / 9, flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
        <View style={{ marginBottom: 10, alignItems: "center" }}>
          <Text
            style={{ fontFamily: FONTS_FAMILY.Ubuntu_500Medium, fontSize: 24 }}
          >
            Training Registration
          </Text>
        </View>
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
