import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { REGISTRATION_STATUS_ENUM } from '../../../enums/collaborator/RegistrationStatus';

interface RegistrationStatusProps {
  status: REGISTRATION_STATUS_ENUM | 0;
}
const RegistrationStatus: FC<RegistrationStatusProps> = (Props) => {
  return (
    <View
      style={[
        styles.containerStatus,
        {
          borderColor: (() => {
            switch (Props.status) {
              case REGISTRATION_STATUS_ENUM.PENDING:
                return COLORS?.orange_button;
              case REGISTRATION_STATUS_ENUM.CONFIRM:
                return COLORS?.green_status;
              case REGISTRATION_STATUS_ENUM.CHECKIN:
                return COLORS?.blue_status;
              case REGISTRATION_STATUS_ENUM.CHECKOUT:
                return COLORS?.brown_status;
              case REGISTRATION_STATUS_ENUM.CANCEL:
                return COLORS?.red_status;
              case REGISTRATION_STATUS_ENUM.REJECT:
                return 'black';
              default:
                return 'black'; // Set your default border color here
            }
          })(),
        },
      ]}
    >
      <View style={styles.statusRow}>
        <View>
          <Text
            style={[
              styles.thirdText,
              {
                color: (() => {
                  switch (Props.status) {
                    case REGISTRATION_STATUS_ENUM.PENDING:
                      return COLORS?.orange_button;
                    case REGISTRATION_STATUS_ENUM.CONFIRM:
                      return COLORS?.green_status;
                    case REGISTRATION_STATUS_ENUM.CHECKIN:
                      return COLORS?.blue_status;
                    case REGISTRATION_STATUS_ENUM.CHECKOUT:
                      return COLORS?.brown_status;
                    case REGISTRATION_STATUS_ENUM.CANCEL:
                      return COLORS?.red_status;
                    case REGISTRATION_STATUS_ENUM.REJECT:
                      return 'black';
                    default:
                      return 'black'; // Set your default border color here
                  }
                })(),
              },
            ]}
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
                  return 'No Status'; // Set your default border color here
              }
            })()}
          </Text>
        </View>
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: (() => {
                switch (Props.status) {
                  case REGISTRATION_STATUS_ENUM.PENDING:
                    return COLORS?.orange_button;
                  case REGISTRATION_STATUS_ENUM.CONFIRM:
                    return COLORS?.green_status;
                  case REGISTRATION_STATUS_ENUM.CHECKIN:
                    return COLORS?.blue_status;
                  case REGISTRATION_STATUS_ENUM.CHECKOUT:
                    return COLORS?.brown_status;
                  case REGISTRATION_STATUS_ENUM.CANCEL:
                    return COLORS?.red_status;
                  case REGISTRATION_STATUS_ENUM.REJECT:
                    return 'black';
                  default:
                    return 'black'; // Set your default border color here
                }
              })(),
            },
          ]}
        />
      </View>
    </View>
  );
};

export default RegistrationStatus;

const styles = StyleSheet.create({
  containerStatus: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 2.5,
    borderRadius: 30,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 7,
  },
  thirdRow: { flexDirection: 'row', alignItems: 'center' },
  thirdText: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  statusDot: {
    width: 12,
    height: 12,
    marginLeft: 5,
    borderRadius: 100,
  },
});
