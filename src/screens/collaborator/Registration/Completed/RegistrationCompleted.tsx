import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { ScreenWidth } from '../../../../constants/Demesions';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';
import useIndex from './useRegistrationCompleted';
import { RefreshControl } from 'react-native';
import {
  format_ISODateString_To_DayOfWeekMonthDD,
  format_Time_To_HHss,
} from '../../../../utils/formats';
import { imageNotFoundUri } from '../../../../utils/images';
import RegistrationEmpty from '../../../../components/shared/Empty/RegistrationEmpty';
import { FlashList } from '@shopify/flash-list';
import DetailButton from '../../../../components/shared/Button/DetailButton';
import DataViewPostRegistration from '../../../../models/collaborator/postRegistration.model';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { CommonActions, useNavigation } from '@react-navigation/native';
import FilterRegistationButton from '../../../../components/shared/Button/FilterRegistationButton';
import SortRegistrationButton from '../../../../components/shared/Button/SortRegistrationButton';
import { SHADOWS } from '../../../../constants/Shadows';
import RegistrationDetail from '../RegistrationDetail';
import { ROUTES } from '../../../../constants/Routes';
import RegistrationStatus from '../RegistrationStatus';
import { REGISTRATION_STATUS_ENUM } from '../../../../enums/collaborator/RegistrationStatus';

const Registration_Completed = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const { handlers, state, props } = useIndex();
  const renderListEmptyComponent = () => {
    return <RegistrationEmpty />;
  };

  const renderItem = ({ item }: { item: DataViewPostRegistration }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ROUTES.REGISTRATION_DETAIL, { item })
        }
        style={styles.containerItem}
      >
        <View style={styles.containerRow}>
          <View style={styles.firstRow}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{
                  uri: item?.post?.postImg
                    ? item?.post?.postImg
                    : imageNotFoundUri,
                }}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.textFirst}>General</Text>

              {/* <Text style={styles.textFirst}>General</Text> */}
              <Text style={styles.textFirst_2}>
                {item?.post.postCategory?.postCategoryDescription
                  ? item?.post.postCategory?.postCategoryDescription
                  : 'No value'}
              </Text>
              <Text style={styles.textFirst_3}>
                {item?.registrationCode
                  ? 'PRCode: ' + item?.registrationCode
                  : 'No value'}
              </Text>
            </View>
          </View>

          <DashedLine
            style={{ marginVertical: 15 }}
            dashGap={0}
            dashThickness={1}
            dashLength={8}
            dashColor={COLORS.super_light_grey}
          />

          <View style={styles.secondRow}>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textSecond}>Position</Text>
              <Text style={styles.textSecond_2}>
                {item?.postPosition?.positionName
                  ? item?.postPosition?.positionName
                  : 'No value'}
              </Text>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textSecond}>Date</Text>
              <Text style={styles.textSecond_2}>
                {item?.postPosition?.date
                  ? format_ISODateString_To_DayOfWeekMonthDD(
                      item?.postPosition?.date
                    )
                    ? format_ISODateString_To_DayOfWeekMonthDD(
                        item?.postPosition?.date
                      )
                    : 'No value'
                  : 'No value'}
              </Text>
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textSecond}>Time</Text>
              <Text style={styles.textSecond_2}>
                {item?.postPosition?.timeFrom
                  ? format_Time_To_HHss(item?.postPosition?.timeFrom)
                    ? format_Time_To_HHss(item?.postPosition?.timeFrom)
                    : 'No value'
                  : 'No value'}
              </Text>
            </View>
          </View>

          <RegistrationStatus status={REGISTRATION_STATUS_ENUM.CHECKOUT} />


          <DashedLine
            style={{ marginVertical: 10 }}
            dashGap={0}
            dashThickness={1}
            dashLength={8}
            dashColor={COLORS.super_light_grey}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <DetailButton
              onPress={() =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: ROUTES.ACCOUNT_STACK_NAVIGATOR,
                        state: {
                          routes: [
                            { name: ROUTES.ACCOUNT },
                            {
                              name: ROUTES.INCOME,
                            },
                          ],
                        },
                      },
                    ],
                  })
                )
              }
            />
          </View>

          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                  fontSize: 13,
                }}
              >
                Registered at:{' '}
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                    fontSize: 13,
                  }}
                >
                  {item?.createAt
                    ? format_ISODateString_To_DayOfWeekMonthDD(
                        item?.createAt,
                        true
                      )
                    : 'No value'}
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                  fontSize: 13,
                }}
              >
                Confirmed at:{' '}
                <Text
                  style={{
                    marginTop: 3,
                    fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                    fontSize: 13,
                  }}
                >
                  {item?.confirmTime
                    ? format_ISODateString_To_DayOfWeekMonthDD(
                        item?.confirmTime,
                        true
                      )
                    : 'No value'}
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                  fontSize: 13,
                }}
              >
                CheckedIn at:{' '}
                <Text
                  style={{
                    marginTop: 3,
                    fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                    fontSize: 13,
                  }}
                >
                  {item?.checkAttendances?.[0]?.checkInTime
                    ? format_ISODateString_To_DayOfWeekMonthDD(
                        item?.checkAttendances?.[0]?.checkInTime,
                        true
                      )
                    : "You've not CheckIn"}
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                  fontSize: 13,
                }}
              >
                CheckedOut at:{' '}
                <Text
                  style={{
                    marginTop: 3,
                    fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                    fontSize: 13,
                  }}
                >
                  {item?.checkAttendances?.[0]?.checkOutTime
                    ? format_ISODateString_To_DayOfWeekMonthDD(
                        item?.checkAttendances?.[0]?.checkOutTime,
                        true
                      )
                    : 'No value'}
                </Text>
              </Text>
            </View>
            {/* {item?.postPositionsUnregistereds?.length > 0 && (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('REQUEST_CHANGE_POSITION_PENDING', {
                      id: item?.id,
                    })
                  }
                >
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic,
                      fontSize: 13,
                      textDecorationLine: 'underline',
                    }}
                  >
                    {item?.isUpdated ? "You've changed" : 'Change position?'}
                  </Text>
                </TouchableOpacity>
              </View>
            )} */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginHorizontal: 10,
          zIndex: 1,
        }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <FilterRegistationButton />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <SortRegistrationButton />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={props.postRegistrationList?.data}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={handlers.onRefresh}
            />
          }
          contentContainerStyle={{
            marginVertical: 10,
            marginHorizontal: Platform.OS === 'ios' ? 10 : 0,
          }}
          ListEmptyComponent={renderListEmptyComponent}
          ListHeaderComponentStyle={{ marginTop: 15 }}
        />
      </View>
    </View>
  );
};

export default Registration_Completed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerItem: {
    marginBottom: 15,
    marginHorizontal: Platform.OS === 'ios' ? 0 : 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
    ...SHADOWS.SHADOW_06,
  },
  containerRow: {
    margin: 15,
  },
  firstRow: { flexDirection: 'row', alignItems: 'center' },
  containerImage: {
    flex: 0,
    borderRadius: 15,
  },
  image: {
    height: ScreenWidth * 0.2,
    width: ScreenWidth * 0.3,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  textFirst: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 13,
    color: COLORS.light_black,
  },
  textFirst_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  textFirst_3: {
    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
    fontSize: 12,
    color: COLORS?.light_grey,
    marginTop: 5,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginTop: 10,
    // marginBottom: 20,
  },
  column: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textColumn: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 14,
  },
  textColumn_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 13,
  },
  textSecond: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 12,
    color: COLORS.light_grey,
  },
  textSecond_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 13,
    color: 'black',
    marginVertical: 5,
    textAlign: 'center',
  },
  containerStatus: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 30,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 7,
  },
  thirdRow: { flexDirection: 'row', alignItems: 'center' },
  thirdText: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 14,
    color: COLORS.light_grey,
  },
  statusDot: {
    width: 12,
    height: 12,
    marginLeft: 5,
    borderRadius: 100,
    backgroundColor: 'green',
  },
  containerViewDetail: {
    alignItems: 'center',
  },
});
