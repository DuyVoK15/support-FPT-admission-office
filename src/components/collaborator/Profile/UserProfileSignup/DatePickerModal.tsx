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
import { SHADOWS } from '../../../../constants/Shadows';
import { formatToDate } from '../../../../utils/formats';

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
    <View style={[{ elevation: 2 }, style]} {...otherProps}>
      <Text style={{ fontSize: 16 }}>{label}</Text>
      <TouchableOpacity
        style={[
          {
            flexDirection: 'row',
            height: 50,
            backgroundColor: 'white',
            // borderWidth: 1,
            // borderColor: COLORS.grey_icon,
            borderRadius: 10,
            paddingLeft: 15,
            marginVertical: 10,
            alignItems: 'center',
            ...boxShadow,
          },
          style,
        ]}
        onPress={props.onPress}
        onBlur={handleBlur}
        onFocus={handleFocus}
      >
        <Text style={{ flex: 1 }}>
          {value ? formatToDate({ dateProp: value }) : '--/--/----'}
        </Text>
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
