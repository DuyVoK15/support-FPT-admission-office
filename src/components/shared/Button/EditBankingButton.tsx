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
import { MaterialIcons } from '@expo/vector-icons';

interface EditBankingButtonProps extends TouchableOpacityProps {}
const EditBankingButton: FC<EditBankingButtonProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
          fontSize: 20,
          color: COLORS?.light_black,
        }}
      >
        Edit
      </Text>
      <MaterialIcons name="edit" size={26} color={COLORS?.light_black} />
    </TouchableOpacity>
  );
};

export default EditBankingButton;

const styles = StyleSheet.create({});
