import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { SHADOWS } from '../../../../constants/Shadows';
import { ScreenHeight } from '../../../../constants/Demesions';
import {
  format_ISODateString_To_DDMonth,
  format_ISODateString_To_DDMonthYYYY,
  format_ISODateString_To_DayOfWeek,
  format_Time_To_HHss,
} from '../../../../utils/formats';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { imageNotFoundUri } from '../../../../utils/images';
import { DataPost } from '../../../../models/collaborator/dataPost.model';
import { imageUndefinedUserUri } from '../../../../utils/images';
import RegistrationEmpty from '../../../../components/shared/Empty/RegistrationEmpty';
import { ROUTES } from '../../../../constants/Routes';
import useHomeDetail from './useHomeDetail';
import LoadingScreen from '../../../../components/shared/Loading/Loading';

const HomeEventDetail: FC = () => {
  const { state, setState, stateRedux, handlers, props } = useHomeDetail();
  if (stateRedux.loading) {
    return <LoadingScreen />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground
        style={{ height: 250, width: '100%' }}
        source={{
          uri: stateRedux.item?.data?.postImg
            ? stateRedux.item?.data?.postImg
            : imageNotFoundUri,
        }}
      >
        <BackwardBlur
          style={{ marginTop: 50 }}
          onPress={() => props.navigation.goBack()}
        />
      </ImageBackground>

      <View
        style={{
          flex: 1,
          position: 'absolute',
          top: 222,
          width: '100%',
          height:
            Platform.OS === 'ios'
              ? ScreenHeight - 222 - 80
              : ScreenHeight - 222 - 20,
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
                    {stateRedux.item?.data?.postCategory
                      ?.postCategoryDescription
                      ? stateRedux.item?.data?.postCategory
                          ?.postCategoryDescription
                      : 'No value'}
                  </Text>
                </View>
                <View style={{ flex: 0 }}>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_400Regular_Italic,
                    }}
                  >
                    {stateRedux.item?.data?.postCode
                      ? 'PCode: ' + stateRedux.item?.data?.postCode
                      : 'No value'}
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
                    {stateRedux.item?.data?.dateFrom &&
                    stateRedux.item?.data?.dateTo
                      ? stateRedux.item?.data?.dateFrom ===
                        stateRedux.item?.data?.dateTo
                        ? format_ISODateString_To_DDMonthYYYY(
                            stateRedux.item?.data?.dateFrom
                          )
                          ? format_ISODateString_To_DDMonthYYYY(
                              stateRedux.item?.data?.dateFrom
                            )
                          : 'No value'
                        : format_ISODateString_To_DDMonth(
                            stateRedux.item?.data?.dateFrom
                          ) &&
                          format_ISODateString_To_DDMonthYYYY(
                            stateRedux.item?.data?.dateTo
                          )
                        ? format_ISODateString_To_DDMonth(
                            stateRedux.item?.data?.dateFrom
                          ) +
                          ' - ' +
                          format_ISODateString_To_DDMonthYYYY(
                            stateRedux.item?.data?.dateTo
                          )
                        : 'No value'
                      : 'No value'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                      fontSize: 12,
                      color: COLORS.light_black,
                      marginVertical: 2,
                    }}
                  >
                    {stateRedux.item?.data?.dateFrom &&
                      stateRedux.item?.data?.timeFrom &&
                      stateRedux.item?.data?.timeTo &&
                      format_ISODateString_To_DayOfWeek(
                        stateRedux.item?.data?.dateFrom
                      ) +
                        ', ' +
                        format_Time_To_HHss(stateRedux.item?.data?.timeFrom) +
                        ' - ' +
                        format_Time_To_HHss(stateRedux.item?.data?.timeTo)}
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
                    {stateRedux.item?.data?.postPositions?.[0]?.schoolName
                      ? stateRedux.item?.data?.postPositions?.[0]?.schoolName
                      : 'No value'}
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
                    {stateRedux.item?.data?.postPositions?.[0]?.location
                      ? stateRedux.item?.data?.postPositions?.[0]?.location
                      : 'No value'}
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
                    source={{
                      uri: stateRedux.item?.data?.account?.imgUrl
                        ? stateRedux.item?.data?.account?.imgUrl
                        : imageUndefinedUserUri,
                    }}
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
                    {stateRedux.item?.data?.account?.email
                      ? stateRedux.item?.data?.account?.email
                      : 'No value'}
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
                  {stateRedux.item?.data?.registerAmount
                    ? `Attendees(${stateRedux.item?.data?.registerAmount})`
                    : 'Ateendees(0)'}
                </Text>
              </View>
              <View>
                {stateRedux.item?.data?.postDescription ? (
                  <RenderHtml
                    source={{ html: stateRedux.item?.data?.postDescription }}
                    contentWidth={props.width}
                  />
                ) : (
                  <RegistrationEmpty />
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
              <ScrollView
                horizontal
                style={{}}
                showsHorizontalScrollIndicator={false}
              >
                {stateRedux.item?.data?.postPositions &&
                stateRedux.item?.data?.postPositions?.some(
                  (position) => position.certificateName !== null
                ) === true ? (
                  stateRedux.item?.data?.postPositions
                    ?.filter(
                      (position, index, self) =>
                        position.certificateName !== null &&
                        index ===
                          self.findIndex(
                            (c) =>
                              c.certificateName === position.certificateName
                          )
                    )
                    ?.map((position, index) => (
                      <View
                        key={index}
                        style={{
                          paddingVertical: 6,
                          paddingHorizontal: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 2,
                          borderColor: COLORS?.orange_icon,
                          borderRadius: 20,
                          marginRight: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                            color: COLORS?.orange_icon,
                          }}
                        >
                          {position?.certificateName &&
                            position?.certificateName}
                        </Text>
                      </View>
                    ))
                ) : (
                  <View style={{}}>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                        color: COLORS?.orange_icon,
                      }}
                    >
                      No need Certificate
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
            {/* Button */}
            <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
              <SubmitButton
                onPress={() =>
                  handlers.handleNavigate(stateRedux.item?.data ?? null)
                }
                titleButton="REGISTER"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeEventDetail;

const styles = StyleSheet.create({});
