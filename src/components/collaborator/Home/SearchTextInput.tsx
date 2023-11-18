import { View, Text, TextInputProps } from 'react-native';
import React, { FC } from 'react';
import { TextInput } from 'react-native';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';

interface SearchTextInputProps extends TextInputProps {}
const SearchTextInput: FC<SearchTextInputProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <View style={{ flex: 1, height: 40, justifyContent: 'center' }}>
      <TextInput
        {...otherProps}
        style={{
          marginLeft: 50,
          fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
          fontSize: 16,
          color: COLORS.light_black,
        }}
        placeholder="Search by code, school...."
      />
    </View>
  );
};

export default SearchTextInput;
