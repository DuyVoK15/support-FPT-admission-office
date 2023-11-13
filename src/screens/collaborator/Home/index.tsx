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

const Home = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const [textSearch, setTextSearch] = useState<string>('');
  const dispatch = useAppDispatch();
  const fetchPost = async () => {
    const params = {
      Page: 1,
      PageSize: 20,
      Sort: 'CreateAt',
    };
    await dispatch(getHomePostUpcomming(params)).then((res) => {
      // console.log('Alo: ', JSON.stringify(res, null, 2));
    });
    await dispatch(getHomePostReOpen(params)).then((res) => {
      // console.log('Alo: ', JSON.stringify(res, null, 2));
    });
  };
  useEffect(() => {
    console.log('tao vô đây 1');
    fetchPost();
  }, []);

  const checkInPostRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.checkInPostRegistration
  );
  const fetchCheckInPostRegistration = async () => {
    await dispatch(getAllCheckInPostRegistration({}));
  };
  useEffect(() => {
    console.log('tao vô đây 2');

    fetchCheckInPostRegistration();
  }, []);

  const postHomeUpcommingList = useAppSelector(
    (state) => state.collab_post.postHomeUpcomming
  );
  const postHomeReOpenList = useAppSelector(
    (state) => state.collab_post.postHomeReOpen
  );
  const handleSearchPost = async (postCode: string) => {
    await dispatch(searchPostByPostCode(postCode)).then((res) => {
      // console.log(JSON.stringify(res, null, 2));
    });
  };
  const handleNavigate = (item: DataPost) => {
    navigation.navigate('HOME_EVENT_DETAIL', { item });
  };

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPost();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: Platform.OS === 'ios' ? 60 : 40,
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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
                marginRight: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => handleSearchPost(textSearch)}
                style={{ marginRight: 10 }}
              >
                <FontAwesome name="search" size={32} color="white" />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <TextInput
                  value={textSearch}
                  onChangeText={(value) => setTextSearch(value)}
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                    fontSize: 18,
                    color: COLORS.light_black,
                  }}
                  placeholder="Search by code, school...."
                />
              </View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  backgroundColor: COLORS.light_black,
                  padding: 1,
                }}
                onPress={() => setTextSearch('')}
              >
                {textSearch && (
                  <MaterialIcons name="clear" size={20} color="white" />
                )}
              </TouchableOpacity>
            </View>

            <FilterModal />
          </View>
        </View>
      </View>

      {/* Scroll vertical */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
              {postHomeUpcommingList?.data ? (
                postHomeUpcommingList?.data
                
                .map((post, index) => (
                  <View
                    key={index}
                    style={{ marginTop: 5, marginHorizontal: 15 }}
                  >
                    <EventCard
                      onPress={() => handleNavigate(post)}
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
                        post?.postPositions[0]?.location
                          ? post?.postPositions[0]?.location
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
              {postHomeReOpenList.data ? (
                postHomeReOpenList?.data.map((post, index) => (
                  <View key={index}>
                    <EventCardWrap
                      onPress={() => handleNavigate(post)}
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
                      schoolName={post?.postPositions[0]?.schoolName}
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

      {Number(checkInPostRegistrationList?.data?.length) > 0 && (
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
