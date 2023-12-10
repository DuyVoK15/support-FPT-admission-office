import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';

interface CancelEditBankingButtonProps extends TouchableOpacityProps {}
const CancelEditBanking: FC<CancelEditBankingButtonProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        margin: 2,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: COLORS?.grey_underline,
        shadowColor: COLORS?.grey_underline,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
          color: '#000',
          letterSpacing: 0.3,
          fontSize: 15,
        }}
      >
        Cancel
      </Text>
    </TouchableOpacity>
  );
};

export default CancelEditBanking;

const styles = StyleSheet.create({});
