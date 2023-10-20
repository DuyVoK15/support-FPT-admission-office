import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import React, { Component, useState } from 'react';
import { ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { SHADOWS } from '../../../../constants/Shadows';
import { DefaultTheme, TextInput, TextInputProps } from 'react-native-paper';

interface ProfileTextInputProps extends TextInputProps {
  textInputStyle?: StyleProp<TextStyle>;
}

const ProfileTextInput = (props: ProfileTextInputProps) => {
  const { textInputStyle, ...otherProps } = props;
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
        borderColor: COLORS.orange_icon,
      }
    : {
        borderColor: COLORS.grey_icon,
      };
      const theme = DefaultTheme;
  return (
    <View style={[{marginVertical: 10},{}]}>
      {/* <Text
        style={{ fontFamily: FONTS_FAMILY.Ubuntu_400Regular, fontSize: 16 }}
      >
        {props.label}
      </Text> */}
      <TextInput
        mode="outlined"
        outlineColor={COLORS.super_light_orange}
        activeOutlineColor={COLORS.orange_button}
        // selectionColor={COLORS.orange_grey_icon}
        theme={theme}
        contentStyle={{fontFamily: FONTS_FAMILY.Ubuntu_400Regular}}
        style={[
          {
            // height: 50,
            fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
            backgroundColor: "#fffefe"
            // borderWidth: 1,
            // ...borderColor,
            // borderRadius: 5,
            // paddingLeft: 15,
            // marginVertical: 10,
          },
          textInputStyle,
        ]}
        {...otherProps}
      />
    </View>
  );
};
export default ProfileTextInput;
const styles = StyleSheet.create({});
