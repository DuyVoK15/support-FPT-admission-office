import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import EventCard from '../../../components/student/Home/EventCard';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}></View>

      <ScrollView>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <Text
            style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 10 }}
          >
            Post Today
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

        <View style={{ flex: 1, paddingTop: 20 }}>
          <Text
            style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 10 }}
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeader: {
    height: ScreenHeight / 4,
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
