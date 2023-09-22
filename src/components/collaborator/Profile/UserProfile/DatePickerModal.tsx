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
import DateTimePickerModal from "react-native-modal-datetime-picker";

type DatePickerFieldProps = View['props'] &
  TouchableOpacity['props'] & {
    name?: string;
    value?: string;
    // onSubmit?: ;
  };

export default class DatePickerField extends Component<DatePickerFieldProps> {
  render() {
    const { style, name, value, ...otherProps } = this.props;

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    
    const handleConfirm = (selectedDate: any) => {
      hideDatePicker();
    };

    return (
      <View style={[{ elevation: 2 }, style]} {...otherProps}>
        <Text style={{ fontSize: 16 }}>{name}</Text>
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
          {...otherProps}
        >
          <Text style={{ flex: 1 }}>{value ? value : '--/--/----'}</Text>
          <Ionicons
            style={{ marginRight: 10 }}
            name="calendar"
            size={30}
            color={COLORS.grey_icon}
          />
        </TouchableOpacity>
        {/* <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onCancel={hideDatePicker}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
