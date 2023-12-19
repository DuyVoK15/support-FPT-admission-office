import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import BackwardBlur from '../../../components/shared/Direction/Backward/BackwardBlur';
import { imageNotFoundUri, imageUndefinedUserUri } from '../../../utils/images';
import ReactNativeModal from 'react-native-modal';
import { ViewRegistrationReportResponse } from '../../../dtos/collaborator/response/viewReport.dto';
import CloseBlur from '../../../components/shared/Direction/Close/CloseBlur';
import DataViewPostRegistration from '../../../models/collaborator/postRegistration.model';
import { ScrollView } from 'react-native';
import {
  format_ISODateString_To_DDMonth,
  format_ISODateString_To_DDMonthYYYY,
  format_ISODateString_To_DayOfWeek,
  format_ISODateString_To_DayOfWeekMonthDDYYYY,
  format_Time_To_HHss,
} from '../../../utils/formats';
import RegistrationStatusContainer from '../../../components/collaborator/Registration/RegistrationStatusContainer';
import { REGISTRATION_STATUS_ENUM } from '../../../enums/collaborator/RegistrationStatus';
import RegistrationEmpty from '../../../components/shared/Empty/RegistrationEmpty';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { ROUTES } from '../../../constants/Routes';

const RegistrationDetail = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const route = useRoute();
  const { item } = route?.params as { item: DataViewPostRegistration };

  const pan = React.useRef(new Animated.ValueXY()).current;

  return (
    <View style={{ flex: 1, margin: 0, backgroundColor: '#FFF' }}>
      {item ? (
        <View style={styles.container}>
          <View style={styles.containerRegistration}>
            <ScrollView
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: pan.y } } }],
                {
                  useNativeDriver: false,
                }
              )}
            >
              <Animated.Image
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: 250,
                  transform: [
                    {
                      translateY: pan.y.interpolate({
                        inputRange: [-1000, 0],
                        outputRange: [-100, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                    {
                      scale: pan.y.interpolate({
                        inputRange: [-3000, 0],
                        outputRange: [20, 1],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
                source={{
                  uri: item?.post?.postImg
                    ? item?.post?.postImg
                    : imageNotFoundUri,
                }}
              />
              <View style={styles.containerMargin}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 0 }}>
                    <RegistrationStatusContainer
                      status={(() => {
                        switch (item?.status) {
                          case REGISTRATION_STATUS_ENUM.PENDING:
                            return REGISTRATION_STATUS_ENUM.PENDING;
                          case REGISTRATION_STATUS_ENUM.CONFIRM:
                            return REGISTRATION_STATUS_ENUM.CONFIRM;
                          case REGISTRATION_STATUS_ENUM.CHECKIN:
                            return REGISTRATION_STATUS_ENUM.CHECKIN;
                          case REGISTRATION_STATUS_ENUM.CHECKOUT:
                            return REGISTRATION_STATUS_ENUM.CHECKOUT;
                          case REGISTRATION_STATUS_ENUM.CANCEL:
                            return REGISTRATION_STATUS_ENUM.CANCEL;
                          case REGISTRATION_STATUS_ENUM.REJECT:
                            return REGISTRATION_STATUS_ENUM.REJECT;
                          default:
                            return 0; // Set your default border color here
                        }
                      })()}
                    />
                  </View>

                  {/* <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                        color: COLORS?.orange_icon,
                        fontSize: 16,
                      }}
                    >
                      {item?.postPosition?.positionRegisterAmount
                        ? item?.postPosition?.positionRegisterAmount +
                          ' attendees'
                        : '0 attendees'}
                    </Text>
                  </View> */}
                </View>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                      fontSize: 24,
                      color: '#000000',
                      letterSpacing: 1,
                    }}
                  >
                    {item?.post?.postCategory?.postCategoryDescription
                      ? item?.post?.postCategory?.postCategoryDescription
                      : 'No value'}
                  </Text>
                </View>
                <View style={{ marginBottom: 15, marginTop: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                          fontSize: 20,
                          color: COLORS?.orange_icon,
                          letterSpacing: 1,
                        }}
                      >
                        Post
                      </Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'flex-end' }}>
                      <Text
                        style={{
                          flex: 0,
                          fontFamily: FONTS_FAMILY?.Ubuntu_300Light,
                          fontSize: 12,
                        }}
                      >
                        PRCode: {''}
                        <Text>
                          {item?.registrationCode
                            ? item?.registrationCode
                            : 'No value'}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontFamily: FONTS_FAMILY?.Ubuntu_300Light,
                          fontSize: 12,
                        }}
                      >
                        PCode: {''}
                        <Text>
                          {item?.post?.postCode
                            ? item?.post?.postCode
                            : 'No value'}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    Created Date: {''}{' '}
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      {item?.post?.createAt
                        ? format_ISODateString_To_DDMonthYYYY(
                            item?.post?.createAt
                          )
                          ? format_ISODateString_To_DDMonthYYYY(
                              item?.post?.createAt
                            )
                          : 'No value'
                        : 'No value'}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    Working Date: {''}{' '}
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      {item?.post?.dateFrom && item?.post?.dateTo
                        ? item?.post?.dateFrom === item?.post?.dateTo
                          ? format_ISODateString_To_DDMonthYYYY(
                              item?.post?.dateFrom
                            )
                            ? format_ISODateString_To_DDMonthYYYY(
                                item?.post?.dateFrom
                              )
                            : 'No value'
                          : format_ISODateString_To_DDMonth(
                              item?.post?.dateFrom
                            ) &&
                            format_ISODateString_To_DDMonthYYYY(
                              item?.post?.dateTo
                            )
                          ? format_ISODateString_To_DDMonth(
                              item?.post?.dateFrom
                            ) +
                            ' - ' +
                            format_ISODateString_To_DDMonthYYYY(
                              item?.post?.dateTo
                            )
                          : 'No value'
                        : 'No value'}
                    </Text>
                  </Text>
                  {/* <Text
                    style={{
                      marginTop: 10,
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    Time: {''}{' '}
                    <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
                      {item?.post?.dateFrom &&
                        item?.post?.timeFrom &&
                        item?.post?.timeTo &&
                        format_ISODateString_To_DayOfWeek(item?.post?.dateFrom) +
                          ', ' +
                          format_Time_To_HHss(item?.post?.timeFrom) +
                          ' - ' +
                          format_Time_To_HHss(item?.post?.timeTo)}
                    </Text>
                  </Text> */}
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                        fontSize: 14,
                      }}
                    >
                      Post by:
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View>
                      <Image
                        style={{
                          height: 45,
                          width: 45,
                          resizeMode: 'cover',
                          borderRadius: 100,
                        }}
                        source={{
                          uri: item?.post?.account?.imgUrl
                            ? item?.post?.account?.imgUrl
                            : imageUndefinedUserUri,
                        }}
                      />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{ fontFamily: FONTS_FAMILY.Ubuntu_500Medium }}
                      >
                        {item?.post?.account?.name
                          ? item?.post?.account?.name
                          : 'No value'}
                      </Text>
                      <Text
                        style={{ fontFamily: FONTS_FAMILY.Ubuntu_300Light }}
                      >
                        {item?.post?.account?.email
                          ? item?.post?.account?.email
                          : 'No value'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ marginBottom: 15 }}>
                  <View style={{}}>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                        fontSize: 20,
                        color: COLORS?.orange_icon,
                        letterSpacing: 1,
                      }}
                    >
                      Position
                    </Text>
                  </View>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    Name: {''}{' '}
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      {item?.postPosition?.positionName
                        ? item?.postPosition?.positionName
                        : 'No value'}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    Date: {''}{' '}
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      {item?.postPosition?.date &&
                        format_ISODateString_To_DayOfWeekMonthDDYYYY(
                          item?.postPosition?.date
                        ) &&
                        format_ISODateString_To_DayOfWeekMonthDDYYYY(
                          item?.postPosition?.date
                        )}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    Time: {''}{' '}
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      {item?.postPosition?.timeFrom &&
                        item?.postPosition?.timeTo &&
                        format_Time_To_HHss(item?.postPosition?.timeFrom) &&
                        format_Time_To_HHss(item?.postPosition?.timeTo) &&
                        format_Time_To_HHss(item?.postPosition?.timeFrom) +
                          ' - ' +
                          format_Time_To_HHss(item?.postPosition?.timeTo)}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    School: {''}{' '}
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      {item?.postPosition?.schoolName
                        ? item?.postPosition?.schoolName
                        : 'No value'}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    Location: {''}{' '}
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      {item?.postPosition?.location
                        ? item?.postPosition?.location
                        : 'No value'}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    Salary: {''}
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                        color: COLORS?.orange_icon,
                      }}
                    >
                      {item?.postPosition?.salary
                        ? item?.postPosition?.salary.toLocaleString() + ' VNĐ'
                        : '0 VNĐ'}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    Certificate Need?: {''}{' '}
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                        color: COLORS?.orange_icon,
                      }}
                    >
                      {item?.postPosition?.certificateName
                        ? item?.postPosition?.certificateName
                        : 'No need'}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    Use Bus Service?: {''}{' '}
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                        color: item?.schoolBusOption
                          ? COLORS?.green_status
                          : COLORS?.red_status,
                      }}
                    >
                      {item?.schoolBusOption ? 'Yes' : 'No'}
                    </Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      ) : (
        <RegistrationEmpty />
      )}
      <CloseBlur
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', left: 0, top: 40 }}
      />
    </View>
  );
};

export default RegistrationDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 30,
  },
  containerRegistration: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerMargin: {
    margin: 15,
  },
});
