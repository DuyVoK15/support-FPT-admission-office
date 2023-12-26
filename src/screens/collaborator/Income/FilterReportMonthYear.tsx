import React, { useState, useCallback, FC, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import { ScreenHeight } from '../../../constants/Demesions';
import { DataFilterReport } from './useIncome';
import {
  formatDateToDDMMYYYY,
  formatToISO_8601,
  format_DDMMYYYYYString_To_YYYYMMDate,
} from '../../../utils/formats';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { ScreenWidth } from '@rneui/base';
import DateTimePicker from 'react-native-modal-datetime-picker';

interface FilterReportMonthYearProps {
  dataFilterReport: DataFilterReport | null;
  setDataFilterReport: React.Dispatch<
    React.SetStateAction<DataFilterReport | null>
  >;
  refreshing?: boolean;
}
const FilterReportMonthYear: FC<FilterReportMonthYearProps> = (Props) => {
  // Create At Start
  const [isModalCreateAtStartPicker, setIsModalCreateAtStartPicker] =
    useState<boolean>(false);
  const showModalCreateAtStartPicker = () => {
    setIsModalCreateAtStartPicker(true);
  };
  const hideModalCreateAtStartPicker = () => {
    setIsModalCreateAtStartPicker(false);
  };
  const [createAtStart, setCreateAtStart] = useState<string | null>(null);

  const handleSetCreateAtStart = (date: Date) => {
    console.log('A date has been picked: ', date);
    setCreateAtStart(formatDateToDDMMYYYY(date));
    hideModalCreateAtStartPicker();
  };
  // Create At End
  const [isModalCreateAtEndPicker, setIsModalCreateAtEndPicker] =
    useState<boolean>(false);
  const showModalCreateAtEndPicker = () => {
    setIsModalCreateAtEndPicker(true);
  };
  const hideModalCreateAtEndPicker = () => {
    setIsModalCreateAtEndPicker(false);
  };
  const [createAtEnd, setCreateAtEnd] = useState<string | null>(null);

  const handleSetCreateAtEnd = (date: Date) => {
    console.log('A date has been picked: ', date);
    setCreateAtEnd(formatDateToDDMMYYYY(date));
    hideModalCreateAtEndPicker();
  };
  // Handle submit
  const handleDataUpdate = () => {
    Props.setDataFilterReport((prevFilter) => ({
      Sort: prevFilter?.Sort || null,
      Order: prevFilter?.Order || null,
      CreateAtStart: formatToISO_8601(createAtStart),
      CreateAtEnd: formatToISO_8601(createAtEnd),
    }));
  };
  // Handle reset State
  const handleResetState = () => {
    setCreateAtEnd(null);
    setCreateAtStart(null);
  };

  useEffect(() => {
    handleResetState();
  }, [Props.refreshing]);

  return (
    <View style={{ marginTop: 15, marginHorizontal: 15 }}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium }}>
          Filter date
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={showModalCreateAtStartPicker}
            style={{
              width: ScreenWidth * 0.3,
              borderRadius: 10,
              paddingVertical: 8,
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
              {createAtStart ?? 'DD/MM/YYYY'}
            </Text>
          </TouchableOpacity>
          <View style={{ marginHorizontal: 5 }}>
            <Text>To</Text>
          </View>
          <TouchableOpacity
            onPress={showModalCreateAtEndPicker}
            style={{
              width: ScreenWidth * 0.3,
              borderRadius: 10,
              paddingVertical: 8,
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
              {createAtEnd ?? 'DD/MM/YYYY'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0 }}>
          <TouchableOpacity
            onPress={handleDataUpdate}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: '#00EE6E',
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                color: '#3F3F42',
              }}
            >
              Query
            </Text>
          </TouchableOpacity>
        </View>

        <DateTimePicker
          mode="date"
          minimumDate={new Date('2019-01-01')}
          maximumDate={new Date(format_DDMMYYYYYString_To_YYYYMMDate(createAtEnd))}
          date={format_DDMMYYYYYString_To_YYYYMMDate(createAtStart)}
          isVisible={isModalCreateAtStartPicker}
          onConfirm={handleSetCreateAtStart}
          onCancel={hideModalCreateAtStartPicker}
        />
        <DateTimePicker
          minimumDate={new Date(format_DDMMYYYYYString_To_YYYYMMDate(createAtStart))}
          maximumDate={new Date()}
          mode="date"
          date={format_DDMMYYYYYString_To_YYYYMMDate(createAtEnd)}
          isVisible={isModalCreateAtEndPicker}
          onConfirm={handleSetCreateAtEnd}
          onCancel={hideModalCreateAtEndPicker}
        />
      </View>
    </View>
  );
};

export default FilterReportMonthYear;
