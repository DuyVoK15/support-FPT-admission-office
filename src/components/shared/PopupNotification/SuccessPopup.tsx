import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { ScreenHeight } from '../../../constants/Demesions';
import Modal from 'react-native-modal';
import { AntDesign, Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';

type SuccessPopupProps = {
  message: string | JSX.Element;
}
const SuccessPopup = (props: SuccessPopupProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsModalVisible(true);
    }, 10); 
  }, []);

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInUp" // Hiệu ứng vào
      animationOut="slideOutDown" // Hiệu ứng ra
      animationInTiming={500}
      animationOutTiming={500}
      backdropOpacity={0} // Độ mờ của nền
      backdropColor="black" // Màu nền
      backdropTransitionOutTiming={1000}
      onBackdropPress={() => toggleModalVisible()} // Ẩn modal khi nhấn vào nền
      onModalShow={() => {
        setTimeout(() => {
          toggleModalVisible();
        }, 2000);
      }}
      onModalHide={() => console.log('Modal is hidden!')}
      swipeDirection={['down']} // Cho phép kéo từ trên xuống
      hideModalContentWhileAnimating={true}
      //   swipeThreshold={0}
      onSwipeComplete={() => toggleModalVisible()}
      onSwipeCancel={() => console.log('Swipe Canceled')}
      onSwipeMove={() => console.log('Swipe Moved')}
      onSwipeStart={() => console.log('Swipe Started')}
      avoidKeyboard={false}
      propagateSwipe={true}
      scrollHorizontal={true}
      style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 90 }}
    >
      <View
        style={{
          //   height: ScreenHeight * 0.1,
          width: '100%',
          backgroundColor: '#4EC33D',
          borderRadius: 25,
        }}
      >
        <View
          style={{
            overflow: 'hidden',
            width: '100%',
            backgroundColor: '#4EC33D',
            borderRadius: 25,
          }}
        >
          <View style={{ marginHorizontal: 15 }}>
            <View style={{ marginLeft: 100 }}>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                    fontSize: 24,
                    color: 'white',
                  }}
                >
                  Success!
                </Text>
              </View>

              <View
                style={{
                  marginTop: 10,
                  marginBottom: 30,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                    fontSize: 15,
                    color: 'white',
                  }}
                >
                  {props.message}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              height: 130,
              width: 130,
              borderRadius: 100,
              backgroundColor: '#2C7721',
              bottom: -100,
              left: -40,
            }}
          />

          <View style={{ position: 'absolute', right: 15, top: 15 }}>
            <TouchableOpacity onPress={toggleModalVisible}>
              <AntDesign name="close" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            height: 68,
            width: 68,
            borderRadius: 100,
            backgroundColor: '#2C7721',
            justifyContent: 'center',
            alignItems: 'center',
            top: -38,
            left: 22,
          }}
        > 
          <Entypo name="check" size={30} color="white" />
        </View>
      </View>
    </Modal>
  );
};

export default SuccessPopup;

const styles = StyleSheet.create({});
5;
