import {
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
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
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
import { getAllPost } from '../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../app/hooks';
import {
  formatToDay,
  formatToMonthString,
  timeAgo,
} from '../../../utils/formats';
import { COLORS } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../constants/Routes';
import { Data } from '../../../models/collaborator/dataPost.model';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import FilterModal from '../../../components/collaborator/Home/FilterModal';
import { SHADOWS } from '../../../constants/Shadows';

const Home = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const [text, setText] = useState<string>('');

  const dispatch = useAppDispatch();
  const fetchPost = async () => {
    await dispatch(getAllPost()).then((res) => {
      console.log("Alo: ", JSON.stringify(res, null, 2))
    });;;
  };
  useEffect(() => {
    fetchPost()
  }, []);

  const postList = useAppSelector((state) => state.collab_post.post);

  const handleNavigate = (item: Data) => {
    navigation.navigate('EVENT_DETAIL', { item });
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
            <TouchableOpacity
              onPress={() => navigation.navigate('NOTIFICATION')}
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
              <View style={{ marginRight: 10 }}>
                <FontAwesome name="search" size={32} color="white" />
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  value={text}
                  onChangeText={(value) => setText(value)}
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                    fontSize: 20,
                    color: COLORS.light_black,
                  }}
                  placeholder="Search...."
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
                onPress={() => setText('')}
              >
                {text && <MaterialIcons name="clear" size={20} color="white" />}
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
      >
        <View style={{ flex: 1, paddingTop: 20, marginHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

          <View style={{ height: ScreenWidth * 0.75, marginTop: 20 }}>
            <ScrollView horizontal scrollEventThrottle={16}>
              {postList ? postList?.data?.map((post, index) => (
                <EventCard
                  onPress={() => handleNavigate(post)}
                  key={index}
                  currentDay={formatToDay({
                    dateProp: post?.dateFrom,
                  })}
                  currentMonth={formatToMonthString({
                    dateProp: post?.dateFrom,
                  })}
                  timeAgo={timeAgo({
                    dateProp: post?.createAt,
                  })}
                  titleEvent={post?.postCategory.postCategoryDescription}
                  schoolName={post?.postPositions?.[0].location}
                  location={post?.postPositions[0].location}
                />
              )) : <View />}
            </ScrollView>
          </View>
        </View>

        {/* Scroll vertical */}
        <View style={{ flex: 1, paddingTop: 20, marginHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  flex: 1,
                  fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                  fontSize: 24,
                }}
              >
                Post is missing slot
              </Text>
            </View>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
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

          <View style={{ height: ScreenWidth * 0.75, marginTop: 20 }}>
            <ScrollView horizontal scrollEventThrottle={16}>
              {postList?.data.map((post, index) => (
                <EventCard
                  onPress={() => navigation.navigate(ROUTES.EVENT_DETAIL)}
                  key={index}
                  currentDay={formatToDay({
                    dateProp: post?.dateFrom,
                  })}
                  currentMonth={formatToMonthString({
                    dateProp: post?.dateFrom,
                  })}
                  timeAgo={timeAgo({
                    dateProp: post?.createAt,
                  })}
                  titleEvent={post?.postCategory.postCategoryType}
                  currentPeopleAmount={0}
                  totalPeopleAmount={post?.postPositions?.[0]?.amount}
                  location={post?.postPositions[0].location}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeader: {
    height: ScreenHeight / 4.5,
    width: ScreenWidth,
    backgroundColor: COLORS.orange_button,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    ...SHADOWS.SHADOW_03
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
