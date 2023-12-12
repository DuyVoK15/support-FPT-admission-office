import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { REGISTRATION_STATUS_ENUM } from '../../../enums/collaborator/RegistrationStatus';

interface RegistrationStatusProps {
  status: REGISTRATION_STATUS_ENUM | 0;
}
const RegistrationStatusContainer: FC<RegistrationStatusProps> = (Props) => {
  return (
    <View
      style={{
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: (() => {
          switch (Props.status) {
            case REGISTRATION_STATUS_ENUM.PENDING:
              return 'orange';
            case REGISTRATION_STATUS_ENUM.CONFIRM:
              return 'green';
            case REGISTRATION_STATUS_ENUM.CHECKIN:
              return '#65B4E2';
            case REGISTRATION_STATUS_ENUM.CHECKOUT:
              return '#8E7241';
            case REGISTRATION_STATUS_ENUM.CANCEL:
              return 'red';
            case REGISTRATION_STATUS_ENUM.REJECT:
              return 'black';
            default:
              return 'black'; // Set your default border color here
          }
        })(),
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
          color: (() => {
            switch (Props.status) {
              case REGISTRATION_STATUS_ENUM.PENDING:
                return 'orange';
              case REGISTRATION_STATUS_ENUM.CONFIRM:
                return 'green';
              case REGISTRATION_STATUS_ENUM.CHECKIN:
                return '#65B4E2';
              case REGISTRATION_STATUS_ENUM.CHECKOUT:
                return '#8E7241';
              case REGISTRATION_STATUS_ENUM.CANCEL:
                return 'red';
              case REGISTRATION_STATUS_ENUM.REJECT:
                return 'black';
              default:
                return 'black'; // Set your default border color here
            }
          })(),
          fontSize: 15,
          letterSpacing: 0.6,
        }}
      >
        {(() => {
          switch (Props.status) {
            case REGISTRATION_STATUS_ENUM.PENDING:
              return 'Pending';
            case REGISTRATION_STATUS_ENUM.CONFIRM:
              return 'Confirmed';
            case REGISTRATION_STATUS_ENUM.CHECKIN:
              return 'Checked In';
            case REGISTRATION_STATUS_ENUM.CHECKOUT:
              return 'Checked Out';
            case REGISTRATION_STATUS_ENUM.CANCEL:
              return 'Cancelled';
            case REGISTRATION_STATUS_ENUM.REJECT:
              return 'Rejected';
            default:
              return 'black'; // Set your default border color here
          }
        })()}
      </Text>
    </View>
  );
};

export default RegistrationStatusContainer;

const styles = StyleSheet.create({});
