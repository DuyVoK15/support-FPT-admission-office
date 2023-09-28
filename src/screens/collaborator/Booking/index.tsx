import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import BookingTopTabs from '../../../navigation/collaborator/BookingStack/BookingTopTabs';
import { ScreenHeight } from '../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../constants/Fonts';

const Booking = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header style={{ height: ScreenHeight / 9, flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
        <View style={{ marginBottom: 10, alignItems: "center" }}>
          <Text
            style={{ fontFamily: FONTS_FAMILY.Ubuntu_500Medium, fontSize: 24 }}
          >
            My Booking
          </Text>
        </View>
      </Header>
      <BookingTopTabs />
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({});
