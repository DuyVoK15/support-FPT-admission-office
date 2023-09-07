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
          marginHorizontal: 20,
          padding: 10,
          borderRadius: 15,

        }}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, }}>
            <Text style={{fontFamily: "Ubuntu_400Regular", fontSize: 20}}>{this.props.currentDay}</Text>
            <Text style={{fontFamily: "Ubuntu_400Regular", fontSize: 14}}>{this.props.currentMonth}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{fontFamily: "Ubuntu_400Regular"}}>{this.props.timeAgo}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{fontFamily: "Ubuntu_400Regular"}}>{this.props.titleEvent}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{fontFamily: "Ubuntu_400Regular"}}>
            Number: {this.props.currentPeopleAmount}/
            {this.props.totalPeopleAmount}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="location" size={14} color={COLORS.grey_icon} />
          <Text style={{fontFamily: "Ubuntu_400Regular"}}> {this.props.location}</Text>
        </View>
      </View>
    );
  }
}
