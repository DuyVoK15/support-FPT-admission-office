import { StyleSheet, Text, View, ViewProps } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../../constants/Fonts';

interface TrainingStatusProps extends ViewProps {
  status: 'PENDING' | 'ASSIGNED' | 'NOT PASSED' | 'PASSED' | 'CANCELED';
}
const TrainingStatus: FC<TrainingStatusProps> = (Props) => {
  const formattedStatus =
    Props.status.charAt(0).toUpperCase() + Props.status.slice(1).toLowerCase();
  const { ...otherProps } = Props;
  return (
    <View
      {...otherProps}
      style={{
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 9,
        borderWidth: 2,
        justifyContent: 'center',
        borderColor: (() => {
          switch (Props.status) {
            case 'PENDING':
              return 'orange';
            case 'ASSIGNED':
              return '#65B4E2';
            case 'NOT PASSED':
              return 'red';
            case 'PASSED':
              return 'green';
            case 'CANCELED':
              return '#392D69';
            default:
              return 'black'; // Set your default border color here
          }
        })(),
      }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
          fontSize: 14,
          letterSpacing: 0.5,
          color: (() => {
            switch (Props.status) {
              case 'PENDING':
                return 'orange';
              case 'ASSIGNED':
                return '#65B4E2';
              case 'NOT PASSED':
                return 'red';
              case 'PASSED':
                return 'green';
              case 'CANCELED':
                return '#392D69';
              default:
                return 'black'; // Set your default border color here
            }
          })(),
        }}
      >
        {formattedStatus}
      </Text>
    </View>
  );
};

export default TrainingStatus;

const styles = StyleSheet.create({});
