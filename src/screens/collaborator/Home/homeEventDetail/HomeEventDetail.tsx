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

const HomeEventDetail: FC = () => {
  // Get Width of Windows
  const { width } = useWindowDimensions();

  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  // Get item data from
  const route = useRoute();
  const { item } = route?.params as { item: DataPost };
  const handleNavigate = (item: DataPost) => {
    navigation.navigate(ROUTES.POSITION_REGISTRATION, { item });
  };
  useEffect(() => {
    console.log(JSON.stringify(item, null, 2));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground
        style={{ height: 250, width: '100%' }}
        source={{
          uri: item?.postImg ? item?.postImg : imageNotFoundUri,
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
                    {item?.postCategory?.postCategoryDescription
                      ? item?.postCategory?.postCategoryDescription
                      : 'NO EVENT'}
                  </Text>
                </View>
                <View style={{ flex: 0 }}>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_400Regular_Italic,
                    }}
                  >
                    {item?.postCode ? 'PCode: ' + item?.postCode : ''}
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
                    {item?.postPositions?.[0]?.schoolName
                      ? item?.postPositions?.[0]?.schoolName
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
                    {item?.postPositions?.[0]?.location
                      ? item?.postPositions?.[0]?.location
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
                      uri: item?.account?.imgUrl
                        ? item?.account?.imgUrl
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
                    {item?.account?.email ? item?.account?.email : 'No value'}
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
                {item?.postPositions &&
                item?.postPositions?.some(
                  (position) => position.certificateName !== null
                ) === true ? (
                  item?.postPositions
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

export default HomeEventDetail;

const styles = StyleSheet.create({});
