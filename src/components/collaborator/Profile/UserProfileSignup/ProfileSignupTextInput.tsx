import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { Component, useState } from 'react';
import { ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { SHADOWS } from '../../../../constants/Shadows';

type ProfileSignupTextInputProps = TextInput['props'] & {
  label?: string;
  placeholder?: string;
};

const ProfileSignupTextInput: React.FC<ProfileSignupTextInputProps> = (
  props
) => {
  const { style, label, placeholder, ...otherProps } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Hàm để xử lý sự kiện khi TextInput được focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Hàm để xử lý sự kiện khi TextInput mất focus
  const handleBlur = () => {
    setIsFocused(false);
  };

  const boxShadow = isFocused
    ? {
        shadowColor: COLORS.orange_icon,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
      }
    : {
        ...SHADOWS.SHADOW_03,
      };
  return (
    <View style={style}>
      <Text
        style={{ fontFamily: FONTS_FAMILY.Ubuntu_400Regular, fontSize: 16 }}
      >
        {label}
      </Text>
      <TextInput
        placeholder={`Enter ${placeholder}`}
        placeholderTextColor={COLORS.grey_icon}
        clearButtonMode="always"
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          {
            fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
            height: 50,
            // borderWidth: 1,
            // borderColor: borderColor,
            backgroundColor: 'white',
            borderRadius: 10,
            paddingLeft: 15,
            marginVertical: 10,
            ...boxShadow,
          },
          ,
          style,
        ]}
        {...otherProps}
      />
    </View>
  );
};
export default ProfileSignupTextInput;
const styles = StyleSheet.create({});
