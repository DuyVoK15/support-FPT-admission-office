import React, { Component, FC } from 'react';
import { Image, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import DashedLine from 'react-native-dashed-line';
import { responsiveFontSize } from '../../../utils/responsive';

type EventCardProps = TouchableOpacity['props'] & {
  imageUrl?: string;
  timeAgo?: string;
  titleEvent?: string;
  schoolName?: string;
  totalPeopleAmount?: number;
  location?: string;
  dateFrom?: string;
  timeFrom?: string;
};

const EventCard: FC<EventCardProps> = (props) => {
  const { ...otherProps } = props;
  return (
    <TouchableOpacity
      style={{
        minWidth: ScreenWidth * 0.8,
        minHeight: ScreenHeight * 0.43,
        width: ScreenWidth * 0.8,
        height: ScreenHeight * 0.43,
        backgroundColor: 'white',
        borderRadius: 30,
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
      <View
        style={{ flex: 1, margin: 15, marginBottom: 20, overflow: 'hidden' }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: COLORS.light_black,
            borderRadius: 20,
            marginBottom: 10,
          }}
        >
          <Image
            style={{
              height: ScreenHeight * 0.43 * 0.5,
              width: '100%',
              borderRadius: 20,
              resizeMode: 'cover',
            }}
            source={{
              uri: props.imageUrl,
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
                  fontSize: responsiveFontSize(18),
                }}
              >
                {props.titleEvent}
              </Text>
            </View>
            <View style={{ width: '40%', alignItems: 'flex-end',  }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                  fontSize: responsiveFontSize(12),
                }}
              >
                {props.timeAgo}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 0, marginBottom: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 5 }}>
              <Entypo
                name="graduation-cap"
                size={22}
                color={COLORS.light_grey}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                  fontSize: responsiveFontSize(13),
                  color: COLORS.light_grey,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {props.schoolName}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 0 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ marginRight: 5 }}>
              <Entypo name="location" size={22} color={COLORS.grey_icon} />
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                  fontSize: responsiveFontSize(13),
                  color: COLORS.grey_icon,
                  width: '100%',
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {props.location}
              </Text>
            </View>
          </View>
        </View>

        <DashedLine
          style={{ flex: 0, marginVertical: 10 }}
          dashGap={0}
          dashThickness={1}
          dashLength={8}
          dashColor={COLORS.super_light_grey}
        />

        <View style={{ flex: 0 }}>
          <Text
            style={{
              fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
              fontSize: responsiveFontSize(14),
              color: COLORS.red_date,
            }}
          >
            {props.dateFrom} - {props.timeFrom}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default EventCard;
