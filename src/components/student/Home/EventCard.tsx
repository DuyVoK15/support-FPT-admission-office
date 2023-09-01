import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';

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
      <View
        style={{
          width: ScreenWidth * 0.45,
          height: ScreenHeight * 0.2,
          backgroundColor: 'white',
          marginHorizontal: 10,
          padding: 10,
          borderRadius: 15,

        }}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text>{this.props.currentDay}{"\n"}{this.props.currentMonth}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{this.props.timeAgo}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{this.props.titleEvent}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>
            Number: {this.props.currentPeopleAmount}/
            {this.props.totalPeopleAmount}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Ionicons name="location" size={14} color={COLORS.grey_icon} />
          <Text> {this.props.location}</Text>
        </View>
      </View>
    );
  }
}
