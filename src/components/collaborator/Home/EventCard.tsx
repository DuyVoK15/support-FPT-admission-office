import React, { Component } from 'react';
import { Image, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';

type EventCardProps = TouchableOpacity['props'] & {
  currentDay?: string;
  currentMonth?: string;
  timeAgo?: string;
  titleEvent?: string;
  schoolName?: string;
  currentPeopleAmount?: number;
  totalPeopleAmount?: number;
  location?: string;
};

export default class EventCard extends Component<EventCardProps> {
  render() {
    const { ...otherProps } = this.props;
    return (
      <TouchableOpacity
        style={{
          width: ScreenWidth * 0.6,
          height: ScreenWidth * 0.7,
          backgroundColor: 'white',
          marginRight: 30,
          padding: 10,
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 4,
        }}
        {...otherProps}
      >
        <View style={{ flex: 1, marginHorizontal: 5, marginVertical: 5 }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'red',
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Image
              style={{
                height: 150,
                width: '100%',
                borderRadius: 10,
                resizeMode: 'cover',
              }}
              source={{uri: 'https://cdnimg.vietnamplus.vn/t870/uploaded/xpcwvovt/2020_11_13/ttxvn_viet_duc_5.jpg'}}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
                  fontSize: 15,
                }}
              >
                {this.props.titleEvent}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                  fontSize: 11,
                }}
              >
                {this.props.timeAgo}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 5 }}>
              <Entypo
                name="graduation-cap"
                size={20}
                color={COLORS.light_grey}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                  fontSize: 12,
                  color: COLORS.light_grey,
                }}
              >
                {this.props.schoolName?.slice(0, 30) + "..."}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 1,
            }}
          >
            <View style={{ marginRight: 5 }}>
              <Entypo name="location" size={20} color={COLORS.grey_icon} />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                  fontSize: 12,
                  color: COLORS.grey_icon,
                }}
              >
                {this.props.location?.slice(0, 30) + "..."}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.grey_underline,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          ></View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                fontSize: 12,
                color: COLORS.red_date,
              }}
            >
              JUl 24 - 7:00
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
