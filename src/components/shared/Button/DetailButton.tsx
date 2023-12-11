import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { TouchableOpacityProps } from 'react-native';

interface DetailButtonProps extends TouchableOpacityProps {}
const DetailButton: FC<DetailButtonProps> = (props) => {
  const { ...otherProps } = props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
        backgroundColor: COLORS?.orange_button,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
          fontSize: 15,
        }}
      >
        View Report
      </Text>
    </TouchableOpacity>
  );
};

export default DetailButton;

const styles = StyleSheet.create({});
