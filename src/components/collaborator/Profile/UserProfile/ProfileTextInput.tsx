import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { Component, useState } from 'react';
import { ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { SHADOWS } from '../../../../constants/Shadows';

type ProfileTextInputProps = TextInput['props'] & {
  name?: string;
};

const ProfileTextInput = (props: ProfileTextInputProps) => {
  const { style, name, ...otherProps } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Hàm để xử lý sự kiện khi TextInput được focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Hàm để xử lý sự kiện khi TextInput mất focus
  const handleBlur = () => {
    setIsFocused(false);
  };

  const borderColor = isFocused
    ? {
      borderColor: COLORS.orange_icon
      }
    : {
      borderColor: COLORS.grey_icon,
    };
  return (
    <View style={[{ elevation: 2 }, style]}>
      <Text
        style={{ fontFamily: FONTS_FAMILY.Ubuntu_400Regular, fontSize: 16 }}
      >
        {name}
      </Text>
      <TextInput
        placeholder={`Enter ${name}`}
        placeholderTextColor={COLORS.grey_icon}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          {
            height: 50,
            fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
            borderWidth: 1,
            ...borderColor,
            borderRadius: 5,
            paddingLeft: 15,
            marginVertical: 10,
          },
          style,
        ]}
        {...otherProps}
      />
    </View>
  );
};
export default ProfileTextInput;
const styles = StyleSheet.create({});
