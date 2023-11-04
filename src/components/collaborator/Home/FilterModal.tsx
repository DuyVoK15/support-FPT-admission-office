import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import CategorySelection from './CategorySelection';
import DateWorkingPicker from './DateWorkingPicker';
import { formatDateToDDMMYYYY, formatToDate, formatToISO_8601 } from '../../../utils/formats';
import { Controller, useForm } from 'react-hook-form';
import SubmitButton from '../../shared/Button/SubmitButton';
import { useAppDispatch } from '../../../app/store';
import { getAllPost } from '../../../features/collaborator/collab.postSlice';
import FilterPostPayload from '../../../dtos/collaborator/payload/filterPost.dto';

const FilterModal = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      DateFrom: '',
      PostCategoryId: null,
    },
  });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };
  // aaaa
  const [isDateWorkPickerVisible, setIsDateWorkPickerVisible] =
    useState<boolean>(false);

  const showDateWotrkPicker = () => {
    setIsDateWorkPickerVisible(true);
  };

  const hideDateWotrkPicker = () => {
    setIsDateWorkPickerVisible(false);
  };

  const handleConfirmDateWorkPicker = (date: Date) => {
    console.log('A date has been picked: ', formatDateToDDMMYYYY(date));
    setValue('DateFrom', date.toISOString());
    hideDateWotrkPicker();
  };

  const handleClearOption = () => {
    setValue('DateFrom', "");
    setValue('PostCategoryId', null);
  }

  const dispatch = useAppDispatch();
  const handleSubmitFilterPost = async (data: FilterPostPayload) => {
    console.log(data);
    await dispatch(getAllPost(data)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  return (
    <View>
      <View
        style={{
          backgroundColor: COLORS.green_filter_button,
          borderRadius: 22,
        }}
      >
        <TouchableOpacity
          onPress={() => toggleModalVisible()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              paddingVertical: 3,
              paddingHorizontal: 4,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 100,
              marginRight: 10,
            }}
          >
            <Ionicons
              name="filter"
              size={22}
              color={COLORS.green_filter_button}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                fontSize: 16,
                color: 'white',
              }}
            >
              Filters
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp" // Hiệu ứng vào
        animationOut="slideOutDown" // Hiệu ứng ra
        animationInTiming={500}
        animationOutTiming={500}
        backdropOpacity={0.8} // Độ mờ của nền
        backdropColor="black" // Màu nền
        backdropTransitionOutTiming={1000}
        onBackdropPress={() => toggleModalVisible()} // Ẩn modal khi nhấn vào nền
        onModalShow={() => console.log('Modal is shown!')}
        onModalHide={() => console.log('Modal is hidden!')}
        swipeDirection={['down']} // Cho phép kéo từ trên xuống
        hideModalContentWhileAnimating={true}
        swipeThreshold={200}
        onSwipeComplete={() => toggleModalVisible()}
        onSwipeCancel={() => console.log('Swipe Canceled')}
        onSwipeMove={() => console.log('Swipe Moved')}
        onSwipeStart={() => console.log('Swipe Started')}
        avoidKeyboard={false}
        propagateSwipe={true}
        scrollHorizontal={true}
        style={{ flex: 1, margin: 0, justifyContent: 'flex-end' }}
      >
        <View
          style={{
            height: ScreenHeight * 0.85,
            width: '100%',
            backgroundColor: 'white',
            borderTopRightRadius: 35,
            borderTopLeftRadius: 35,
          }}
        >
          <View style={{ marginHorizontal: 15 }}>
            <View
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  height: 10,
                  width: 70,
                  borderRadius: 10,
                  backgroundColor: COLORS.grey_underline,
                  top: -20,
                }}
              />
            </View>

            <View>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                  fontSize: 24,
                }}
              >
                Filter
              </Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <View style={{ marginTop: 15 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                    fontSize: 17,
                  }}
                >
                  Category
                </Text>
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                horizontal
                style={{ marginTop: 15 }}
              >
                <View
                  style={{ flex: 1, flexDirection: 'row' }}
                  onStartShouldSetResponder={() => true}
                >
                  <Controller
                    control={control}
                    rules={{required: true}}
                    render={({ field: { onChange, value } }) => (
                      <CategorySelection setValue={setValue} />
                    )}
                    name="PostCategoryId"
                  />
                </View>
              </ScrollView>
            </View>

            <View style={{ marginTop: 15 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                  fontSize: 17,
                }}
              >
                Date Working From
              </Text>
            </View>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DateWorkingPicker
                    isVisible={isDateWorkPickerVisible}
                    value={formatToDate({dateProp: value})}
                    onPress={showDateWotrkPicker}
                    onCancel={hideDateWotrkPicker}
                    onConfirm={handleConfirmDateWorkPicker}
                  />
                )}
                name="DateFrom"
              />
            </View>
            <View>
              <SubmitButton
                onPress={handleSubmit(handleSubmitFilterPost)}
                titleButton="Apply filter"
              />
              <SubmitButton
                onPress={handleSubmit(handleClearOption)}
                titleButton="Clear"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({});
