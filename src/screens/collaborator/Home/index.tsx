import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import { useAppDispatch } from '../../../app/store';
import {
  getAllPost,
  getHomePostReOpen,
  getHomePostUpcomming,
  searchPostByPostCode,
} from '../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../app/hooks';
import {
  format_ISODateString_To_DayOfWeekMonthDDYYYY,
  format_ISODateString_To_MonthDD,
  format_Time_To_HHss,
  timeAgo,
} from '../../../utils/formats';
import { COLORS } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import FilterModal from '../../../components/collaborator/Home/FilterModal';
import { SHADOWS } from '../../../constants/Shadows';
import EventCardWrap from '../../../components/collaborator/Home/EventCardWrap';
import { imageNotFoundUri } from '../../../utils/images';
import { getAllCheckInPostRegistration } from '../../../features/collaborator/collab.postRegistrationSlice';
import HomeRegistrationPopup from '../../../components/collaborator/Home/HomeRegistrationPopup';
import { DataPost } from '../../../models/collaborator/dataPost.model';
import useHome from './useHome';
import { Controller } from 'react-hook-form';
import SearchTextInput from '../../../components/collaborator/Home/SearchTextInput';

const Home = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { handlers, state, props } = useHome();

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: Platform.OS === 'ios' ? 56 : 40,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity style={{ flex: 1 }}>
              <Octicons name="three-bars" size={30} color="white" />
            </TouchableOpacity>
            <View style={{ flex: 8, alignItems: 'center' }}>
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
                <View style={{ marginLeft: 3 }}>
                  <AntDesign
                    name="caretdown"
                    size={14}
                    color="rgba(255,255,255, 0.8)"
                  />
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                    fontSize: 18,
                    color: 'white',
                    marginTop: 2,
                  }}
                >
                  FPT University HCM
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('HOME_NOTIFICATION')}
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

          <View style={{ marginTop: 25 }}>
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
                  onPress={() => handlers.setTextSearch('')}
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
                Upcoming Events
              </Text>
            </View>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() =>
                navigation.navigate('EVENT_STACK_NAVIGATOR', {
                  screen: 'EVENT',
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

          <View style={{ height: ScreenWidth * 0.85, marginTop: 20 }}>
            <ScrollView horizontal scrollEventThrottle={16}>
              {props.postHomeUpcommingList?.data ? (
                props.postHomeUpcommingList?.data.map((post, index) => (
                  <View
                    key={index}
                    style={{ marginTop: 5, marginHorizontal: 15 }}
                  >
                    <EventCard
                      onPress={() =>
                        navigation.navigate('HOME_EVENT_DETAIL', { item: post })
                      }
                      imageUrl={
                        post?.postImg ? post?.postImg : imageNotFoundUri
                      }
                      timeAgo={
                        post?.createAt
                          ? timeAgo({
                              dateProp: post?.createAt,
                            })
                            ? timeAgo({
                                dateProp: post?.createAt,
                              })
                            : 'No value'
                          : 'No value'
                      }
                      titleEvent={
                        post?.postCategory?.postCategoryDescription
                          ? post?.postCategory?.postCategoryDescription
                          : 'No value'
                      }
                      schoolName={
                        post?.postPositions?.[0]?.schoolName
                          ? post?.postPositions?.[0]?.schoolName
                          : 'No value'
                      }
                      location={
                        post?.postPositions?.[0]?.location
                          ? post?.postPositions?.[0]?.location
                          : 'No value'
                      }
                      dateFrom={
                        post?.dateFrom
                          ? format_ISODateString_To_MonthDD(post?.dateFrom)
                            ? format_ISODateString_To_MonthDD(post?.dateFrom)
                            : 'No value'
                          : 'No value'
                      }
                      timeFrom={
                        post?.timeFrom
                          ? format_Time_To_HHss(post?.timeFrom)
                            ? format_Time_To_HHss(post?.timeFrom)
                            : 'No value'
                          : 'No value'
                      }
                    />
                  </View>
                ))
              ) : (
                <View />
              )}
            </ScrollView>
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
                Post Re-Open
              </Text>
            </View>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={
                () =>
                  navigation.navigate('EVENT_STACK_NAVIGATOR', {
                    screen: 'EVENT',
                  })
                // () => console.log('navigation')
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
              {props.postHomeReOpenList?.data ? (
                props.postHomeReOpenList?.data.map((post, index) => (
                  <View key={index}>
                    <EventCardWrap
                      onPress={() =>
                        navigation.navigate('HOME_EVENT_DETAIL', { item: post })
                      }
                      imageUrl={
                        post?.postImg ? post?.postImg : imageNotFoundUri
                      }
                      title={
                        post?.postCategory?.postCategoryDescription
                          ? post?.postCategory?.postCategoryDescription
                          : ''
                      }
                      dateTime={format_ISODateString_To_DayOfWeekMonthDDYYYY(
                        post?.dateFrom ? post?.dateFrom : ''
                      )}
                      schoolName={post?.postPositions?.[0]?.schoolName}
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
                    />
                  </View>
                ))
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {Number(props.checkInPostRegistrationList?.data?.length) > 0 && (
        <HomeRegistrationPopup />
      )}
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
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
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
