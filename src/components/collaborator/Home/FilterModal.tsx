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

const FilterModal = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
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
              <ScrollView
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                horizontal
              >
                <View
                  style={{ flex: 1, flexDirection: 'row' }}
                  onStartShouldSetResponder={() => true}
                >
                  <View
                    style={{
                      marginRight: 20,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 20,
                      backgroundColor: 'red',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                        fontSize: 16,
                        color: 'white',
                      }}
                    >
                      Tư vấn lớp
                    </Text>
                  </View>
                  <View
                    style={{
                      marginRight: 20,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 20,
                      backgroundColor: 'green',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                        fontSize: 16,
                        color: 'white',
                      }}
                    >
                      Openday
                    </Text>
                  </View>
                  <View
                    style={{
                      marginRight: 20,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 20,
                      backgroundColor: 'blue',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                        fontSize: 16,
                        color: 'white',
                      }}
                    >
                      Chương trình riêng
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({});
