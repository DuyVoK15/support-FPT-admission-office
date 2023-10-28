import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';
import BackwardBlur from '../../../../components/shared/Direction/Backward/BackwardBlur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { COLORS } from '../../../../constants/Colors';
import SubmitButton from '../../../../components/shared/Button/SubmitButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { Data } from '../../../../models/collaborator/dataPost.model';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { SHADOWS } from '../../../../constants/Shadows';
import { ScreenHeight } from '../../../../constants/Demesions';
import {
  format_ISODateString_To_DDMonthYYYY,
  format_ISODateString_To_DayOfWeek,
  format_Time_To_HHss,
} from '../../../../utils/formats';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const EventDetail:FC = () => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const route = useRoute();
  const { item } = route?.params as { item: Data };
  const handleNavigate = (item: Data) => {
    navigation.navigate('POSITION_REGISTRATION', { item });
  };
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
          flex: 1,
          position: 'absolute',
          top: 222,
          width: '100%',
          height: ScreenHeight - 222 - 80,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          ...SHADOWS.SHADOW_03,
        }}
      >
        <ScrollView style={{ marginTop: 30 }}>
          <View style={{ marginHorizontal: 20 }}>
            {/* ---------------------------------- */}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
                      fontSize: 20,
                    }}
                  >
                    {item
                      ? item?.postCategory.postCategoryDescription
                      : 'NO EVENT'}
                  </Text>
                </View>
                <View style={{ flex: 0 }}>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_400Regular_Italic,
                    }}
                  >
                    {item ? 'Postcode: ' + '#' + item?.postCode : ''}
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
                    source={require('../../../../assets/Images/ic_calendar.png')}
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
                    {item?.dateFrom &&
                      format_ISODateString_To_DDMonthYYYY(item?.dateFrom)}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                      fontSize: 12,
                      color: COLORS.light_black,
                      marginVertical: 2,
                    }}
                  >
                    {item?.dateFrom &&
                      item?.postPositions?.[0]?.timeFrom &&
                      item?.postPositions?.[0]?.timeTo &&
                      format_ISODateString_To_DayOfWeek(item?.dateFrom) +
                        ', ' +
                        format_Time_To_HHss(
                          item?.postPositions?.[0]?.timeFrom
                        ) +
                        ' - ' +
                        format_Time_To_HHss(item?.postPositions?.[0]?.timeTo)}
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
                    source={require('../../../../assets/Images/ic_location.png')}
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
                    {item.postPositions[0].schoolName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                      fontSize: 12,
                      color: COLORS.light_black,
                      marginVertical: 2,
                      maxWidth: 300,
                    }}
                  >
                    {item.postPositions[0].location}
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
                    source={require('../../../../assets/Images/ic_calendar.png')}
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
                    {item?.account?.email}
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
                  {item?.registerAmount
                    ? `Attendees(${item?.registerAmount})`
                    : 'Ateendees(0)'}
                </Text>
              </View>
              <View>
                {item?.postDescription ? (
                  <RenderHtml
                    source={{ html: item?.postDescription }}
                    contentWidth={width}
                  />
                ) : (
                  <View />
                )}
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
            {/* Button */}
            <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
              <SubmitButton
                onPress={() => handleNavigate(item)}
                titleButton="REGISTER"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({});
