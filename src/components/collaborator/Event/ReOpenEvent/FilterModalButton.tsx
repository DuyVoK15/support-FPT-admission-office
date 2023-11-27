import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/Colors';
import ReactNativeModal from 'react-native-modal';
import { ScreenHeight, ScreenWidth } from '../../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  formatDateToDDMMYYYY,
  formatToISO_8601,
} from '../../../../utils/formats';
import SubmitButton from '../../../shared/Button/SubmitButton';
import { useForm } from 'react-hook-form';
import ResetFilterButton from '../../../shared/Button/ResetFilterButton';

export type DataFilterReOpen = {
  postReOpenCategoryId: number | null;
  createAtStart: string | null;
  createAtEnd: string | null;
  dateFromStart: string | null;
  dateFromEnd: string | null;
  searchText: string | null;
  sort: string | null;
  order: string | null;
};
interface FilterModalButtonProps extends TouchableOpacityProps {
  dataFilterReOpen: DataFilterReOpen | null;
  setDataFilterReOpen: React.Dispatch<
    React.SetStateAction<DataFilterReOpen | null>
  >;
  isRefresh?: boolean;
}
const FilterModalButton = (Props: FilterModalButtonProps) => {
  // Show Modal Filter
  const [isModalFilterButton, setIsModalFilterButton] =
    useState<boolean>(false);
  const showModalFilterButton = () => {
    setIsModalFilterButton(true);
  };
  const hideModalFilterButton = () => {
    setIsModalFilterButton(false);
  };
  // Date From Start
  const [isModalDateFromStartPicker, setIsModalDateFromStartPicker] =
    useState<boolean>(false);
  const showModalDateFromStartPicker = () => {
    setIsModalDateFromStartPicker(true);
  };
  const hideModalDateFromStartPicker = () => {
    setIsModalDateFromStartPicker(false);
  };
  const [dateFromStart, setDateFromStart] = useState<string | null>(null);
  const handleSetDateFromStart = (date: Date) => {
    console.log('A date has been picked: ', formatDateToDDMMYYYY(date));
    setDateFromStart(formatDateToDDMMYYYY(date));

    hideModalDateFromStartPicker();
  };
  // Date From End
  const [isModalDateFromEndPicker, setIsModalDateFromEndPicker] =
    useState<boolean>(false);
  const showModalDateFromEndPicker = () => {
    setIsModalDateFromEndPicker(true);
  };
  const hideModalDateFromEndPicker = () => {
    setIsModalDateFromEndPicker(false);
  };
  const [dateFromEnd, setDateFromEnd] = useState<string | null>(null);

  const handleSetDateFromEnd = (date: Date) => {
    console.log('A date has been picked: ', date);
    setDateFromEnd(formatDateToDDMMYYYY(date));
    hideModalDateFromEndPicker();
  };
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
    Props.setDataFilterReOpen((prevFilter) => ({
      postReOpenCategoryId: prevFilter?.postReOpenCategoryId || null,
      createAtStart: formatToISO_8601({ dateProp: createAtStart }),
      createAtEnd: formatToISO_8601({ dateProp: createAtEnd }),
      dateFromStart: formatToISO_8601({ dateProp: dateFromStart }),
      dateFromEnd: formatToISO_8601({ dateProp: dateFromEnd }),
      searchText: prevFilter?.searchText || null,
      sort: prevFilter?.sort || null,
      order: prevFilter?.order || null,
    }));
    hideModalFilterButton();
  };
  // Handle reset State
  const handleResetState = () => {
    setCreateAtEnd(null);
    setCreateAtStart(null);
    setDateFromEnd(null);
    setDateFromStart(null);
  };

  useEffect(() => {
    handleResetState();
  }, [Props.isRefresh]);
  // Return component
  return (
    <View>
      <TouchableOpacity
        onPress={showModalFilterButton}
        style={{
          borderRadius: 10,
          height: 50,
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS?.orange_button,
        }}
      >
        <Ionicons name="color-filter-sharp" size={28} color="#FFF" />
      </TouchableOpacity>
      <ReactNativeModal
        isVisible={isModalFilterButton}
        animationIn="slideInUp" // Hiệu ứng vào
        animationOut="slideOutDown" // Hiệu ứng ra
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropOpacity={0.8} // Độ mờ của nền
        backdropColor="black" // Màu nền
        backdropTransitionOutTiming={1000}
        onBackdropPress={hideModalFilterButton} // Ẩn modal khi nhấn vào nền
        onModalShow={() => console.log('Modal is shown!')}
        onModalHide={() => console.log('Modal is hidden!')}
        swipeDirection={['down']} // Cho phép kéo từ trên xuống
        hideModalContentWhileAnimating={true}
        swipeThreshold={200}
        onSwipeComplete={hideModalFilterButton}
        propagateSwipe={true}
        style={{ flex: 1, margin: 0, justifyContent: 'flex-end' }}
      >
        <View
          style={{
            height: ScreenHeight * 0.5,
            width: '100%',
            backgroundColor: '#FFF',
            borderTopRightRadius: 35,
            borderTopLeftRadius: 35,
          }}
        >
          <View style={{ margin: 15 }}>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  height: 8,
                  width: 60,
                  backgroundColor: COLORS?.light_black,
                  borderRadius: 20,
                }}
              />
              <View style={{ marginTop: 15 }}>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium }}>
                    Event Date From
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={showModalDateFromStartPicker}
                    style={{
                      width: ScreenWidth * 0.4,
                      borderRadius: 10,
                      paddingVertical: 8,
                      borderWidth: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      {dateFromStart ?? 'DD/MM/YYYY'}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ marginHorizontal: 5 }}>
                    <Text>To</Text>
                  </View>
                  <TouchableOpacity
                    onPress={showModalDateFromEndPicker}
                    style={{
                      width: ScreenWidth * 0.4,
                      borderRadius: 10,
                      paddingVertical: 8,
                      borderWidth: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      {dateFromEnd ?? 'DD/MM/YYYY'}
                    </Text>
                  </TouchableOpacity>
                  <DateTimePicker
                    mode="date"
                    isVisible={isModalDateFromStartPicker}
                    onConfirm={handleSetDateFromStart}
                    onCancel={hideModalDateFromStartPicker}
                  />
                  <DateTimePicker
                    mode="date"
                    isVisible={isModalDateFromEndPicker}
                    onConfirm={handleSetDateFromEnd}
                    onCancel={hideModalDateFromEndPicker}
                  />
                </View>
              </View>

              <View style={{ marginTop: 15 }}>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium }}>
                    Event Date Created
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={showModalCreateAtStartPicker}
                    style={{
                      width: ScreenWidth * 0.4,
                      borderRadius: 10,
                      paddingVertical: 8,
                      borderWidth: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      {createAtStart ?? 'DD/MM/YYYY'}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ marginHorizontal: 5 }}>
                    <Text>To</Text>
                  </View>
                  <TouchableOpacity
                    onPress={showModalCreateAtEndPicker}
                    style={{
                      width: ScreenWidth * 0.4,
                      borderRadius: 10,
                      paddingVertical: 8,
                      borderWidth: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      {createAtEnd ?? 'DD/MM/YYYY'}
                    </Text>
                  </TouchableOpacity>
                  <DateTimePicker
                    mode="date"
                    isVisible={isModalCreateAtStartPicker}
                    onConfirm={handleSetCreateAtStart}
                    onCancel={hideModalCreateAtStartPicker}
                  />
                  <DateTimePicker
                    mode="date"
                    isVisible={isModalCreateAtEndPicker}
                    onConfirm={handleSetCreateAtEnd}
                    onCancel={hideModalCreateAtEndPicker}
                  />
                </View>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <SubmitButton titleButton="Apply" onPress={handleDataUpdate} />
            </View>
            <View style={{ marginTop: 15, alignItems: 'center' }}>
              <ResetFilterButton onPress={handleResetState} />
            </View>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default FilterModalButton;

const styles = StyleSheet.create({});
