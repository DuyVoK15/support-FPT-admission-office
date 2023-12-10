import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { TextInput, TextInputProps, useTheme } from 'react-native-paper';
import { COLORS } from '../../../constants/Colors';
import { SHADOWS } from '../../../constants/Shadows';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { UseControllerProps, useController } from 'react-hook-form';

interface TextInputFieldProps
  extends TextInputProps,
    Omit<UseControllerProps, 'defaultValue'> {}
const TextInputField: FC<TextInputFieldProps> = (Props) => {
  const { ...otherProps } = Props;
  const { field } = useController({
    control: Props.control,
    defaultValue: '',
    name: Props.name,
    rules: Props.rules,
  });
  return (
    <View style={{ backgroundColor: '#FFF' }}>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        style={{
          marginHorizontal: 15,
          marginTop: 10,
          // marginBottom: 10,
          height: 55,
          backgroundColor: '#FFF',
          fontSize: 15,
          fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
        }}
        contentStyle={{
          fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
          fontSize: 16,
        }}
        outlineStyle={{ borderRadius: 8 }}
        {...otherProps}
        mode="outlined"
        activeOutlineColor={COLORS?.orange_button}
        outlineColor={COLORS?.light_grey}
      />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({});
