import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
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
import { getAllPost } from '../../../features/collaborator/postSlice';
import { useAppSelector } from '../../../app/hooks';
import {
  formatToDay,
  formatToMonthString,
  timeAgo,
} from '../../../utils/formats';
import { COLORS } from '../../../constants/Colors';

const Explore = () => {
  const [text, setText] = useState<string>('');

  const dispatch = useAppDispatch();
  const fetchPost = async () => {
    await dispatch(getAllPost());
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const postList = useAppSelector((state) => state.post.post);
  // console.log(JSON.stringify(postList, null, 2));
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
            <View style={{ flex: 1 }}>
              <Octicons name="three-bars" size={30} color="white" />
            </View>
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
            <View
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

            <View
              style={{
                backgroundColor: COLORS.green_filter_button,
                borderRadius: 22,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: 100,
                    marginRight: 10,
                  }}
                >
                  <Ionicons
                    name="filter"
                    size={22}
                    color={COLORS.green_filter_button}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                      fontSize: 16,
                      color: 'white',
                    }}
                  >
                    Filters
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ScrollView>
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
                Post Today
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

          <View style={{ height: ScreenHeight * 0.25, marginTop: 20 }}>
            <ScrollView horizontal scrollEventThrottle={16}>
              {postList.data.map((post, index) => (
                <EventCard
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
                  titleEvent={post?.postTitle?.postTitleDescription}
                  currentPeopleAmount={0}
                  totalPeopleAmount={post?.postPositions?.[0]?.amount}
                  location={post?.location}
                />
              ))}
            </ScrollView>
          </View>
        </View>

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

          <View style={{ height: ScreenHeight * 0.25, marginTop: 20 }}>
            <ScrollView horizontal scrollEventThrottle={16}>
              {postList?.data.map((post, index) => (
                <EventCard
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
                  titleEvent={post?.postTitle?.postTitleDescription}
                  currentPeopleAmount={0}
                  totalPeopleAmount={post?.postPositions?.[0]?.amount}
                  location={post?.location}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Explore;

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
