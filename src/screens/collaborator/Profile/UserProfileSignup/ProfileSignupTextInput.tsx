import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { Component } from 'react';
import { ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';

type ProfileSignupTextInputProps = TextInput['props'] & {
  name?: string;
};

export default class ProfileSignupTextInput extends Component<ProfileSignupTextInputProps> {
  render() {
    const {style, name, ...otherProps} = this.props;
    return (
      <View style={[{ width: ScreenWidth * 0.9 }]}>
        <TextInput
          placeholder={`Enter ${name}`}
          placeholderTextColor={COLORS.grey_icon}
          style={[{
            height: 50,
            borderWidth: 1,
            borderColor: COLORS.grey_icon,
            borderRadius: 10,
            paddingLeft: 15,
            marginTop: 5,
          }, style]}
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
