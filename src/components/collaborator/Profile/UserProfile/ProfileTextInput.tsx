import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { Component } from 'react';
import { ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';

type ProfileTextInputProps = TextInput['props'] & {
  name?: string;
};

export default class ProfileTextInput extends Component<ProfileTextInputProps> {
  render() {
    const {style, name, ...otherProps} = this.props;
    return (
      <View style={[{ elevation: 2}, style]}>
        <Text style={{fontFamily: FONTS_FAMILY.Ubuntu_400Regular,fontSize: 16}}>{name}</Text>
        <TextInput
          placeholder={`Enter ${name}`}
          placeholderTextColor={COLORS.grey_icon}
          style={[{
            height: 50,
            fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
            borderWidth: 1,
            borderColor: COLORS.grey_icon,
            borderRadius: 5,
            paddingLeft: 15,
            marginVertical: 10
          }, style]}
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
