import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import BackwardBlur from '../../../components/shared/Direction/Backward/BackwardBlur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import SubmitButton from '../../../components/shared/Button/SubmitButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { Data } from '../../../models/collaborator/dataPost.model';

type RootStackParamList = {
  EventDetail: { item: Data }; // Khai báo kiểu đối tượng event
  // Các màn hình khác ở đây
};

type DestinationScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

type DestinationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EventDetail'
>;

export type Props = {
  route: DestinationScreenRouteProp;
  navigation: DestinationScreenNavigationProp;
};

const EventDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params as { item: Data };

  useEffect(() => {
    console.log(JSON.stringify(item, null, 2));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground
        style={{ height: 250, width: '100%' }}
        source={{
          uri: 'https://cdnimg.vietnamplus.vn/t870/uploaded/xpcwvovt/2020_11_13/ttxvn_viet_duc_5.jpg',
        }}
      >
        <BackwardBlur
          style={{ marginTop: 50 }}
          onPress={() => navigation.goBack()}
        />
      </ImageBackground>

      <View
        style={{
          position: 'absolute',
          top: 222,
          width: '100%',
          height: 500,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <ScrollView>
          <View style={{ marginTop: 30, marginHorizontal: 20 }}>
            {/* ---------------------------------- */}
            <View>
              <View>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
                    fontSize: 20,
                  }}
                >
                  Tư vấn lớp
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                }}
              >
                <View>
                  <Image
                    style={{ height: 48, width: 48 }}
                    source={require('../../../assets/Images/ic_calendar.png')}
                  />
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
                      fontSize: 14,
                      marginVertical: 2,
                    }}
                  >
                    10 July, 2023
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                      fontSize: 12,
                      color: COLORS.light_black,
                      marginVertical: 2,
                    }}
                  >
                    Tuesday, 4:00PM - 9:00PM
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                }}
              >
                <View>
                  <Image
                    style={{ height: 48, width: 48 }}
                    source={require('../../../assets/Images/ic_location.png')}
                  />
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
                      fontSize: 14,
                      marginVertical: 2,
                    }}
                  >
                    THPT Phước Long
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                      fontSize: 12,
                      color: COLORS.light_black,
                      marginVertical: 2,
                    }}
                  >
                    230/3 Man Thiện, Tăng Nhơn Phú A, ...
                  </Text>
                </View>
              </View>
            </View>
            {/* ---------------------------------- */}
            <View style={{ marginVertical: 10 }}>
              <View>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
                    fontSize: 16,
                    marginVertical: 10,
                  }}
                >
                  Organized By
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                }}
              >
                <View>
                  <Image
                    style={{
                      height: 48,
                      width: 48,
                      backgroundColor: 'black',
                      borderRadius: 10,
                    }}
                    source={require('../../../assets/Images/ic_calendar.png')}
                  />
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                      fontSize: 13,
                      marginVertical: 2,
                    }}
                  >
                    DatDT2@fe.edu.vn
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                      fontSize: 12,
                      color: COLORS.light_black,
                      marginVertical: 2,
                    }}
                  >
                    Admission Officer
                  </Text>
                </View>
              </View>
            </View>
            {/* ---------------------------------- */}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
                    fontSize: 16,
                    // marginVertical: 10
                  }}
                >
                  About Event
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
                    fontSize: 14,
                    color: 'red',
                  }}
                >
                  Attendees(30)
                </Text>
              </View>
              <View>
                <Text>
                  [OD Sáng Thứ 7 ngày 13/05] Vị trí 1: Nhận đoàn và dẫn đoàn
                  tham quan: Số lượng 17 bạn • Trang phục: Áo cam, bỏ áo vào
                  quần, đeo thẻ sinh viên • 7h00 có mặt, nhận đoàn và hướng dẫn
                  tham quan Vị trí 3: Trực HT : Số lượng 2 bạn · Trang phục: Áo
                  cam, bỏ áo vào quần, đeo thẻ sinh viên · 7h00 có mặt, kiểm tra
                  vật phẩm trong Hội trường và hướng dẫn Thí sinh · Chạy mic,
                  tặng quà, ... trong lúc diễn ra sự kiện. Vị trí 6: Logistic :
                  Số lượng 3 bạn • Trang phục: Áo cam, bỏ áo vào quần, đeo thẻ
                  sinh viên • 6h30 có mặt, kiểm tra vật phẩm • Phát vật phẩm cho
                  các gian liên quan.
                </Text>
              </View>
            </View>
            {/* ---------------------------------- */}
            <View>
              <View
                style={{
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
                    fontSize: 16,
                    // marginVertical: 10
                  }}
                >
                  Certificate Required
                </Text>
              </View>
              <View>
                <Text>X</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Button */}
      <View style={{ top: 550, marginHorizontal: 20 }}>
        <SubmitButton titleButton="REGISTER" />
      </View>
    </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({});
