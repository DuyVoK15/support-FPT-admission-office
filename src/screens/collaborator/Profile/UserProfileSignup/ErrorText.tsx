import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../../constants/Fonts';

interface ErrorTextProps {
  message: string | null;
}
const ErrorText:FC<ErrorTextProps> = (Props) => {
  return (
    <View style={{marginBottom: 4}}>
      <Text style={{fontFamily: FONTS_FAMILY?.Ubuntu_400Regular, color: "red"}}>{Props.message}</Text>
    </View>
  );
};

export default ErrorText;
