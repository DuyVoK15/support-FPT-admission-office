import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  ScreenHeight,
  ScreenWidth,
  cardGap,
  cardWidth,
} from '../../../constants/Demesions';
import EventCard from '../../../components/collaborator/Home/EventCard';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import {
  format_ISODateString_To_DayOfWeekMonthDDYYYY,
  format_ISODateString_To_MonthDD,
  format_Time_To_HHss,
  timeAgo,
} from '../../../utils/formats';
import { COLORS } from '../../../constants/Colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { SHADOWS } from '../../../constants/Shadows';
import EventCardWrap from '../../../components/collaborator/Home/EventCardWrap';
import { imageNotFoundUri } from '../../../utils/images';
import { getAllCheckInPostRegistration } from '../../../features/collaborator/collab.postRegistrationSlice';
import HomeRegistrationPopup from '../../../components/collaborator/Home/HomeRegistrationPopup';
import { DataPost } from '../../../models/collaborator/dataPost.model';
import useHome from './useHome';
import { Controller } from 'react-hook-form';
import SearchTextInput from '../../../components/collaborator/Home/SearchTextInput';
import MovingText from '../../../components/shared/TextAnimated/MovingText';
import ConfirmAlert from '../../../components/shared/ConfirmAlert/ConfirmAlert';
import { ROUTES } from '../../../constants/Routes';
import { FlashList } from '@shopify/flash-list';

const Home = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { handlers, state, props } = useHome();

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: Platform.OS === 'ios' ? 56 : 48,
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() =>
                navigation.navigate(ROUTES.HOME_STACK_NAVIGATOR, {
                  screen: ROUTES.HOME,
                })
              }
            >
              <Image
                style={{ height: 40, width: 40, resizeMode: 'contain', backgroundColor: COLORS?.orange_icon, borderRadius: 10 }}
                source={require('../../../assets/Images/ic_app_no_text_white.png')}
              />
            </TouchableOpacity>
            <View style={{ flex: 6, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                    fontSize: 16,
                    color: 'rgba(255,255,255, 0.8)',
                  }}
                >
                  Current Location
                </Text>
                {/* <View style={{ marginLeft: 3 }}>
                  <AntDesign
                    name="caretdown"
                    size={14}
                    color="rgba(255,255,255, 0.8)"
                  />
                </View> */}
              </View>
              <View style={{ marginTop: 2 }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                    fontSize: 17,
                    textAlign: 'center',
                    color: '#FFF',
                    letterSpacing: 1,
                  }}
                >
                  {state.cityName ? state.cityName : 'Not found'}
                  {/* {state.currentLocation?.coords?.latitude +
                    ', ' +
                    state.currentLocation?.coords?.longitude} */}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.HOME_NOTIFICATION)}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                }}
              >
                <Ionicons name="notifications" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop: 25,
                backgroundColor: '#FFF',
                borderRadius: 18,
                ...SHADOWS.SHADOW_03,
              }}
            >
              <TouchableOpacity
                onPress={() => handlers.handleSubmit(handlers.onSubmit)}
                style={{ position: 'absolute', left: 10 }}
              >
                <FontAwesome
                  name="search"
                  size={28}
                  color={COLORS?.orange_button}
                />
              </TouchableOpacity>

              <Controller
                control={props.control}
                rules={{
                  required: false,
                }}
                render={({ field: { onChange, value } }) => (
                  <SearchTextInput
                    onChangeText={onChange}
                    onSubmitEditing={handlers.handleSubmit(handlers.onSubmit)}
                    value={value}
                  />
                )}
                name="search"
              />

              {state.textSearch && (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    borderRadius: 100,
                    backgroundColor: COLORS.super_light_grey,
                    right: 10,
                  }}
                  onPress={() => {
                    handlers.setTextSearch('');
                    handlers.setValue('search', '');
                  }}
                >
                  <MaterialIcons name="clear" size={22} color="white" />
                </TouchableOpacity>
              )}
            </View>
            {/* <FilterModal /> */}
          </View>
        </View>
      </View>

      {/* Scroll vertical */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={handlers.onRefresh}
          />
        }
        nestedScrollEnabled={true}
      >
        <View style={{ flex: 1, marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  flex: 1,
                  fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                  fontSize: 24,
                }}
              >
                Upcoming Events
              </Text>
            </View>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() =>
                navigation.navigate(ROUTES.EVENT_STACK_NAVIGATOR, {
                  screen: ROUTES.EVENT,
                  params: { screen: ROUTES.EVENT_UPCOMMING },
                })
              }
            >
              <View>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                    fontSize: 16,
                    color: COLORS.light_black,
                  }}
                >
                  See All
                </Text>
              </View>
              <View>
                <AntDesign
                  name="caretright"
                  size={14}
                  color={COLORS.light_black}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10 }}>
            <FlatList
              horizontal
              data={props.postHomeUpcommingList?.data}
              renderItem={props.renderItemUpcomming}
              ListEmptyComponent={
                <View
                  style={{
                    width: ScreenWidth,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 26,
                      color: COLORS?.light_grey,
                    }}
                  >
                    No Data
                  </Text>
                </View>
              }
            />
          </View>
        </View>

        {/* Scroll vertical */}
        <View style={{ flex: 1, paddingTop: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  flex: 1,
                  fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                  fontSize: 24,
                }}
              >
                Re-Open Event
              </Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() =>
                navigation.navigate(ROUTES.EVENT_STACK_NAVIGATOR, {
                  screen: ROUTES.EVENT,
                  params: { screen: ROUTES.EVENT_REOPEN },
                })
              }
            >
              <View>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                    fontSize: 16,
                    color: COLORS.light_black,
                  }}
                >
                  See All
                </Text>
              </View>
              <View>
                <AntDesign
                  name="caretright"
                  size={14}
                  color={COLORS.light_black}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginVertical: 20 }}>
            <View
              style={{
                flex: 1,
                marginVertical: 5,
                marginHorizontal: 15,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                columnGap: cardGap - 2,
                rowGap: cardGap - 2,
              }}
            >
              {props.postHomeReOpenList?.data &&
              props.postHomeReOpenList?.data?.length > 0 ? (
                props.postHomeReOpenList?.data.map((post, index) => (
                  <View key={index}>
                    <EventCardWrap
                      onPress={() =>
                        navigation.navigate(ROUTES.HOME_EVENT_DETAIL, {
                          post: post,
                        })
                      }
                      imageUrl={
                        post?.postImg ? post?.postImg : imageNotFoundUri
                      }
                      title={
                        post?.postCategory?.postCategoryDescription
                          ? post?.postCategory?.postCategoryDescription
                          : 'No value'
                      }
                      dateTime={
                        post?.dateFrom
                          ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
                              post?.dateFrom
                            )
                            ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
                                post?.dateFrom
                              )
                            : 'No date'
                          : 'No date'
                      }
                      schoolName={
                        post?.postPositions?.[0]?.schoolName
                          ? post?.postPositions?.[0]?.schoolName
                          : 'No value'
                      }
                      totalRegisterAmount={
                        post?.registerAmount
                          ? String(post?.registerAmount)
                          : '0'
                      }
                      totalAmountPosition={
                        post?.totalAmountPosition
                          ? String(post?.totalAmountPosition)
                          : '0'
                      }
                      timeAgo={
                        post?.createAt
                          ? timeAgo({ dateProp: post?.createAt })
                            ? timeAgo({ dateProp: post?.createAt })
                            : 'No time'
                          : 'No Time'
                      }
                      status={post?.status ? post?.status : 0}
                    />
                  </View>
                ))
              ) : (
                <View
                  style={{
                    height: ScreenWidth,
                    width: ScreenWidth,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 26,
                      color: COLORS?.light_grey,
                    }}
                  >
                    No Data
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* {Number(props.checkInPostRegistrationList?.data?.length) > 0 && (
        <HomeRegistrationPopup />
      )} */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewHeader: {
    height: ScreenHeight / 4.5,
    width: ScreenWidth,
    backgroundColor: COLORS.orange_button,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    ...SHADOWS.SHADOW_03,
  },
  cardItem: {
    width: 200,
    height: 200,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
});
