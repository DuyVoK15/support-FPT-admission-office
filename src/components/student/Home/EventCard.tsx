import React, { Component } from 'react';
import { Text, Touchable, TouchableOpacity, View } from 'react-native';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';

type EventCardProps = {
  currentDay?: string;
  currentMonth?: string;
  timeAgo?: string;
  titleEvent?: string;
  currentPeopleAmount?: number;
  totalPeopleAmount?: number;
  location?: string;
};

export default class EventCard extends Component<EventCardProps> {
  render() {
    return (
      <TouchableOpacity
        style={{
          width: ScreenWidth * 0.5,
          height: ScreenHeight * 0.23,
          backgroundColor: 'white',
          marginRight: 30,
          padding: 10,
          borderRadius: 15,
        }}
      >
        <View style={{ flex: 1, marginHorizontal: 5, marginVertical: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                  fontSize: 24,
                  color: COLORS.red_date,
                }}
              >
                {this.props.currentDay}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                  fontSize: 16,
                  color: COLORS.red_date,
                }}
              >
                {this.props.currentMonth}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontFamily: 'Ubuntu_400Regular', fontSize: 14 }}>
                {this.props.timeAgo}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 10 }}>
            <Text
              style={{
                fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                fontSize: 20,
              }}
            >
              {this.props.titleEvent}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Ubuntu_400Regular' }}>
              Number: {this.props.currentPeopleAmount}/
              {this.props.totalPeopleAmount}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 5 }}>
              <Entypo name="location" size={20} color={COLORS.grey_icon} />
            </View>
            <View>
              <Text style={{ fontFamily: 'Ubuntu_400Regular', fontSize: 16 }}>
                {this.props.location}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
