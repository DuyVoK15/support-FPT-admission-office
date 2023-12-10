import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityComponent,
  View,
  ViewProps,
} from 'react-native';
import React, { Component, useState } from 'react';
import { ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal, {
  DateTimePickerProps,
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import { DefaultTheme, TextInput } from 'react-native-paper';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { formatToDate } from '../../../../utils/formats';

interface DateOfBirthPickerProps extends ViewProps, DateTimePickerProps {
  label?: string;
  value?: string;
  onFocus?: () => void;
  onPress?: () => void;
}

const DateOfBirthPicker = (props: DateOfBirthPickerProps) => {
  const {
    label,
    value,
    id,
    onPress,
    onConfirm,
    onCancel,
    isVisible,
    style,
    ...otherProps
  } = props;

  const theme = DefaultTheme;
  return (
    <View style={[{ marginVertical: 10, elevation: 2 }]} {...otherProps}>
      <TouchableOpacity onPress={onPress}>
        <View pointerEvents="none">
          <TextInput
            mode="outlined"
            label={label}
            value={
              value
                ? formatToDate({ dateProp: value })
                  ? formatToDate({ dateProp: value }) ?? 'No date'
                  : 'No date'
                : 'No date'
            }
            theme={theme}
            outlineColor={COLORS.orange_button} // Màu outline
            editable={false}
            contentStyle={{ fontFamily: FONTS_FAMILY.Ubuntu_400Regular }}
            style={{ height: 55, backgroundColor: '#fffefe' }}

            // {...otherProps}
          />
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        id={id}
        isVisible={isVisible}
        mode="date"
        onConfirm={onConfirm}
        onCancel={onCancel}
        {...otherProps}
      />
    </View>
  );
};
export default DateOfBirthPicker;
const styles = StyleSheet.create({});
