import { StyleSheet, Text, View, ViewProps } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import APPLICATION_STATUS_ENUM from '../../../../enums/collaborator/ApplicationStatus';

interface ApplicationStatusProps extends ViewProps {
  status: APPLICATION_STATUS_ENUM;
}
const ApplicationStatus: FC<ApplicationStatusProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <View
      {...otherProps}
      style={{
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 10,
        borderWidth: 3,
        justifyContent: 'center',
        borderColor: (() => {
          switch (Props.status) {
            case APPLICATION_STATUS_ENUM.PENDING:
              return 'orange';
            case APPLICATION_STATUS_ENUM.APPROVED:
              return 'green';
            case APPLICATION_STATUS_ENUM.REJECTED:
              return 'red';
            default:
              return 'black'; // Set your default border color here
          }
        })(),
      }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
          fontSize: 15,
          letterSpacing: 0.5,
          color: (() => {
            switch (Props.status) {
              case APPLICATION_STATUS_ENUM.PENDING:
                return 'orange';
              case APPLICATION_STATUS_ENUM.APPROVED:
                return 'green';
              case APPLICATION_STATUS_ENUM.REJECTED:
                return 'red';
              default:
                return 'black'; // Set your default border color here
            }
          })(),
        }}
      >
        {(() => {
          switch (Props.status) {
            case APPLICATION_STATUS_ENUM.PENDING:
              return 'Pending';
            case APPLICATION_STATUS_ENUM.APPROVED:
              return 'Approved';
            case APPLICATION_STATUS_ENUM.REJECTED:
              return 'Rejected';
            default:
              return 'No status'; // Set your default border color here
          }
        })()}
      </Text>
    </View>
  );
};

export default ApplicationStatus;

const styles = StyleSheet.create({});
