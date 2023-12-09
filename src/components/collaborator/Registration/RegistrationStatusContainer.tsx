import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { RegistrationStatus } from '../../../enums/collaborator/RegistrationStatus';

interface RegistrationStatusProps {
  status: RegistrationStatus | 0;
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
            case RegistrationStatus.PENDING:
              return 'orange';
            case RegistrationStatus.CONFIRM:
              return 'green';
            case RegistrationStatus.CHECKIN:
              return '#65B4E2';
            case RegistrationStatus.CHECKOUT:
              return '#8E7241';
            case RegistrationStatus.CANCEL:
              return 'red';
            case RegistrationStatus.REJECT:
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
              case RegistrationStatus.PENDING:
                return 'orange';
              case RegistrationStatus.CONFIRM:
                return 'green';
              case RegistrationStatus.CHECKIN:
                return '#65B4E2';
              case RegistrationStatus.CHECKOUT:
                return '#8E7241';
              case RegistrationStatus.CANCEL:
                return 'red';
              case RegistrationStatus.REJECT:
                return 'black';
              default:
                return 'black'; // Set your default border color here
            }
          })(),
          fontSize: 15,
          letterSpacing: 0.6
        }}
      >
        {(() => {
          switch (Props.status) {
            case RegistrationStatus.PENDING:
              return 'Pending';
            case RegistrationStatus.CONFIRM:
              return 'Confirmed';
            case RegistrationStatus.CHECKIN:
              return 'Checked In';
            case RegistrationStatus.CHECKOUT:
              return 'Checked Out';
            case RegistrationStatus.CANCEL:
              return 'Cancelled';
            case RegistrationStatus.REJECT:
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
