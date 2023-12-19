import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useState } from 'react';
import ReactNativeModal from 'react-native-modal';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { SHADOWS } from '../../../constants/Shadows';
import SendProblemButton from '../../../components/shared/Button/SendProblemButton';
import useBannedPopup from './useBannedPopup';
import { DataAccountBanned } from '../../../models/collaborator/accountBanned.model';
import { useAppSelector } from '../../../app/hooks';
import ViewCurrentAccountBannedResponse from '../../../dtos/collaborator/response/viewCurrentAccountBanned.dto';
import CountdownTimer from '../../../components/shared/CountdownTimer/CountdownTimer';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { responsiveFontSize } from '../../../utils/responsive';
import { COLORS } from '../../../constants/Colors';
import { ROUTES } from '../../../constants/Routes';

interface BannedPopupProps {
  isVisible: boolean;
  showModal?: () => void;
  hideModal: () => void;
  currentAccountBanned: ViewCurrentAccountBannedResponse | null;
  navigation?: any;
}
const BannedPopup: FC<BannedPopupProps> = ({
  isVisible,
  showModal,
  hideModal,
  currentAccountBanned,
  navigation,
}) => {
  console.log(currentAccountBanned);
  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={{ justifyContent: 'center', alignItems: 'center' }}
      onBackdropPress={hideModal}
      avoidKeyboard={true}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
    >
      <View
        style={{
          backgroundColor: 'white',
          height: ScreenHeight * 0.3,
          width: ScreenWidth - 20,
          borderRadius: 20,
          ...SHADOWS.SHADOW_09,
        }}
      >
        <View style={{ flex: 1, margin: 15 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                  color: 'red',
                  fontSize: responsiveFontSize(24),
                }}
              >
                YOU HAVE BEEN BANNED
              </Text>
            </View>
            <View style={{ marginTop: 0, alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                  fontSize: responsiveFontSize(14),
                  textAlign: 'center',
                  color: COLORS?.red_date,
                }}
              >
                You have been banned from registering for violating the
                admission office's regulations.
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  textAlign: 'center',
                  color: COLORS?.red_date,
                }}
              >
                Please wait until the deadline expires or amnesty is received
                from the admissions office.
              </Text>
            </View>
            <View style={{ marginTop: 0, alignItems: 'center' }}>
              <CountdownTimer
                numberOfLines={1}
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                  fontSize: responsiveFontSize(28),
                  color: '#000',
                }}
                futureDate={
                  currentAccountBanned?.data?.dayEnd
                    ? currentAccountBanned?.data?.dayEnd
                    : ''
                }
              />
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
            >
              <TouchableOpacity
                onPress={hideModal}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  borderRadius: 10,
                  backgroundColor: COLORS?.grey_underline,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                    fontSize: responsiveFontSize(14),
                  }}
                >
                  OK
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.APPLICATION)}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  borderRadius: 10,
                  backgroundColor: COLORS?.green_status,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                    fontSize: responsiveFontSize(14),
                  }}
                >
                  Complain
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default BannedPopup;

const styles = StyleSheet.create({});
