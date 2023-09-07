import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import EventCard from '../../../components/student/Home/EventCard';
import { AuthContext, AuthContextType } from '../../../context/AuthContext';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';

const Explore = () => {
  const { isLoggined, checkIsLoggined } = useContext(
    AuthContext
  ) as AuthContextType;
  useEffect(() => {
    checkIsLoggined();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: Platform.OS === 'ios' ? 50 : 40,
            marginHorizontal: 20,
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <Octicons name="three-bars" size={30} color="white" />
          </View>
          <View style={{ flex: 8, alignItems: 'center' }}>
            <View>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_300Light,
                  fontSize: 16,
                }}
              >
                Current Location
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_300Light,
                  fontSize: 18,
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
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text>Ha</Text>
          </View>
          <View>
            <Text>Ha</Text>
          </View>
        </View>
      </View>
      {/* <Text>{isLoggined ? 'true' : 'false'}</Text> */}
      <ScrollView>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <View style={{flexDirection: "row"}}>
            <Text
              style={{
                flex: 1,
                fontFamily: 'Ubuntu_500Medium',
                fontSize: 24,
                paddingHorizontal: 20,
              }}
            >
              Post Today
            </Text>
          </View>

          <View style={{ height: 200, marginTop: 20 }}>
            <ScrollView horizontal scrollEventThrottle={16}>
              <EventCard
                currentDay="10"
                currentMonth="JUNE"
                timeAgo="10 min ago"
                titleEvent="Open day"
                currentPeopleAmount={3}
                totalPeopleAmount={10}
                location="FPT UNIVERSITY"
              />
            </ScrollView>
          </View>
        </View>

        <View style={{ flex: 1, paddingTop: 20 }}>
          <Text
            style={{
              fontFamily: 'Ubuntu_500Medium',
              fontSize: 24,
              paddingHorizontal: 20,
            }}
          >
            Post is missing slot
          </Text>

          <View style={{ height: 200, marginTop: 20 }}>
            <ScrollView horizontal scrollEventThrottle={16}>
              <EventCard
                currentDay="10"
                currentMonth="JUNE"
                timeAgo="10 min ago"
                titleEvent="OPEN DAY"
                currentPeopleAmount={3}
                totalPeopleAmount={10}
                location="FPT UNIVERSITY"
              />
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
    backgroundColor: 'orange',
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
