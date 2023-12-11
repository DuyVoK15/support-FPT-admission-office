import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { CONTRACT_STATUS_ENUM } from '../../../enums/collaborator/ContractStatus.';

interface ContractStatusProps {
  status: CONTRACT_STATUS_ENUM;
}
const ContractStatus: FC<ContractStatusProps> = (Props) => {
  return (
    <Text
      style={{
        fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
        color: (() => {
          switch (Props.status) {
            case CONTRACT_STATUS_ENUM.PENDING:
              return 'orange';
            case CONTRACT_STATUS_ENUM.APRROVED:
              return 'green';
            case CONTRACT_STATUS_ENUM.REJECTED:
              return 'red';
            case CONTRACT_STATUS_ENUM.COMPLETED:
              return 'blue';
            default:
              return 'black'; // Set your default border color here
          }
        })(),
        letterSpacing: 0.5
      }}
    >
      {(() => {
        switch (Props.status) {
          case CONTRACT_STATUS_ENUM.PENDING:
            return 'PENDING';
          case CONTRACT_STATUS_ENUM.APRROVED:
            return 'APPROVED';
          case CONTRACT_STATUS_ENUM.REJECTED:
            return 'REJECTED';
          case CONTRACT_STATUS_ENUM.COMPLETED:
            return 'COMPLETED';
          default:
            return 'No status'; // Set your default border color here
        }
      })()}
    </Text>
  );
};

export default ContractStatus;

const styles = StyleSheet.create({});
