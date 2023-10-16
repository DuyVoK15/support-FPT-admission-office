import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component, useState } from 'react';
import { ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';

type DatePickerFieldProps = View['props'] &
  TouchableOpacity['props'] &
  ReactNativeModalDateTimePickerProps & {
    label?: string;
    value?: string;
    onPress?: () => void;
  };

const DatePickerField = (props: DatePickerFieldProps) => {
  const {
    label,
    value,
    id,
    onConfirm,
    onCancel,
    isVisible,
    style,
    ...otherProps
  } = props;

  return (
    <View style={[{ elevation: 2 }, style]} {...otherProps}>
      <Text style={{ fontSize: 16 }}>{label}</Text>
      <TouchableOpacity
        style={[
          {
            flexDirection: 'row',
            height: 50,
            borderWidth: 1,
            borderColor: COLORS.grey_icon,
            borderRadius: 5,
            paddingLeft: 15,
            marginVertical: 10,
            alignItems: 'center',
          },
          style,
        ]}
        onPress={props.onPress}
      >
        <Text style={{ flex: 1 }}>{value ? value : '--/--/----'}</Text>
        <Ionicons
          style={{ marginRight: 10 }}
          name="calendar"
          size={30}
          color={COLORS.grey_icon}
        />
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
export default DatePickerField;
const styles = StyleSheet.create({});
