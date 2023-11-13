import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ScreenWidth } from '../../../constants/Demesions';
import { SHADOWS } from '../../../constants/Shadows';
import { COLORS } from '../../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { useAppDispatch } from '../../../app/store';
import {
  getAllCheckInPostRegistration,
  getAllPostRegistration,
} from '../../../features/collaborator/collab.postRegistrationSlice';
import { useAppSelector } from '../../../app/hooks';
import ReactNativeModal from 'react-native-modal';
import PagerView from 'react-native-pager-view';
import { imageNotFoundUri } from '../../../utils/images';
import Animated, {
  runOnJS,
  useEvent,
  useHandler,
} from 'react-native-reanimated';
import * as Progress from 'react-native-progress';

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

export function usePagerScrollHandler(handlers: any, dependencies?: any) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent<any>(
    (event) => {
      'worklet';
      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer
  );
}

const HomeRegistrationPopup = () => {
  const dispatch = useAppDispatch();
  const testList = [
    { id: 1, name: 'Duy' },
    { id: 2, name: 'Hải' },
    { id: 3, name: 'Phúc' },
    { id: 4, name: 'Nhân' },
  ];
  const checkInPostRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.checkInPostRegistration
  );
  const fetchCheckInPostRegistration = async () => {
    await dispatch(getAllCheckInPostRegistration({}));
  };
  useEffect(() => {
    fetchCheckInPostRegistration();
  }, []);

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [numberPage, setNumberPage] = useState<number>(0);
  const pagerViewRef = useRef<PagerView>(null);
  const myWorkletFunction = (newValue: number) => {
    'worklet';

    // Thực hiện tính toán hoặc xử lý trong worklet

    // Sau đó, sử dụng runOnJS để gọi setState
    runOnJS(setNumberPage)(newValue);
  };
  const handler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      'worklet';
      myWorkletFunction(e.position + 1);
      console.log(e.offset, e.position);
    },
  });
  return (
    <View style={{ marginHorizontal: 5 }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <TouchableOpacity onPress={toggleModal}>
        <LinearGradient
          colors={['#00b09b', '#96c93d']}
          //   style={styles.container}
          style={{
            position: 'absolute',
            width: '100%',
            height: 60,
            bottom: 5,
            backgroundColor: COLORS.green_filter_button,
            borderRadius: 10,
            // marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
              color: '#FFF',
            }}
          >
            Các event sắp diễn ra
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <ReactNativeModal
        style={{ margin: 0 }}
        isVisible={isModalVisible}
        useNativeDriver={true}
      >
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: '#FFF',
            // borderRadius: 30,
          }}
        >
          <AnimatedPager
            testID={'pager-view'}
            ref={pagerViewRef}
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={() => {
              setNumberPage(numberPage + 1);
            }}
            onPageScroll={handler}
          >
            {checkInPostRegistrationList?.data.map((registration, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                }}
              >
                <ImageBackground
                  style={{
                    width: '100%',
                    height: 300,
                  }}
                  source={{
                    uri: 'https://www.baokontum.com.vn/uploads/Image/2023/01/09/103359ta-con-meo.jpg',
                  }}
                ></ImageBackground>
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#FFF',
                    width: ScreenWidth * 0.8,
                    left: ScreenWidth * 0.5 - (ScreenWidth * 0.8) / 2, // Điều chỉnh yourWidth dựa trên chiều rộng của View
                    bottom: 5,
                  }}
                >
                  <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                    <Button title="Hide modal" onPress={toggleModal} />
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                            fontSize: 15,
                          }}
                        >
                          Registration Date:{' '}
                        </Text>
                        <Text>Tuesday, 15 November 2023</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </AnimatedPager>
          {/* <View style={{ height: 100, backgroundColor: 'green' }}>
            <Progress.Bar
              progress={numberPage / 3}
              color="red"
              width={ScreenWidth}
            />
          </View> */}
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default HomeRegistrationPopup;

const styles = StyleSheet.create({});
