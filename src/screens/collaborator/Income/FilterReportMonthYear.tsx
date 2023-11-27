import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import { ScreenHeight } from '../../../constants/Demesions';

const FilterReportMonthYear = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const showPicker = useCallback(
    (value: boolean | ((prevState: boolean) => boolean)) => setShow(value),
    []
  );

  const onValueChange = useCallback(
    (event: any, newDate: Date) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
      console.log(selectedDate)
    },
    [date, showPicker]
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity onPress={() => showPicker(true)}>
        <Text>OPEN</Text>
      </TouchableOpacity>
      {show && (
        <View style={{height: ScreenHeight, backgroundColor: "red"}}>
          <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={new Date()}
            maximumDate={new Date(2025, 5)}
            locale="en"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default FilterReportMonthYear;
