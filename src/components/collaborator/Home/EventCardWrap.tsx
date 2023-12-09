import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { SHADOWS } from '../../../constants/Shadows';
import { cardWidth } from '../../../constants/Demesions';
import { TouchableOpacityProps } from 'react-native';
import { timeAgo } from '../../../utils/formats';
import { POST_STATUS_ENUM } from '../../../enums/collaborator/PostStatus';

interface EventCardWrapProps extends TouchableOpacityProps {
  imageUrl?: string;
  title?: string;
  dateTime?: string | null;
  schoolName?: string;
  totalRegisterAmount?: string;
  totalAmountPosition?: string;
  status?: string;
  timeAgo?: string;
}

const EventCardWrap: FC<EventCardWrapProps> = (props) => {
  const { ...otherProps } = props;

  return (
    <TouchableOpacity
      style={{
        height: cardWidth + 80,
        width: cardWidth,
        backgroundColor: '#FFF',
        borderRadius: 20,
        ...SHADOWS.SHADOW_01,
      }}
      {...otherProps}
    >
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <View style={{ flex: 1, margin: 10, backgroundColor: '#FFFFFF' }}>
          <View style={{ borderRadius: 15 }}>
            <Image
              style={{ width: '100%', height: 120, borderRadius: 15 }}
              source={{ uri: props.imageUrl }}
            />
            {props.totalAmountPosition && props.totalRegisterAmount && (
              <View
                style={{
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  borderRadius: 15,
                  width: '100%',
                  height: 120,
                }}
              >
                <View
                  style={{
                    backgroundColor: 'rgba(245, 152, 66, 0.8)',
                    alignItems: 'flex-end',
                    alignSelf: 'flex-end',
                    margin: 5,
                    borderRadius: 10,
                    padding: 5,
                  }}
                >
                  <Text style={{ fontFamily: FONTS_FAMILY.Ubuntu_400Regular }}>
                    {props.totalRegisterAmount} / {props.totalAmountPosition}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={{ flexGrow: 1, flexDirection: 'column', marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                  fontSize: 18,
                }}
              >
                {props.title}
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                  fontSize: 12,
                  color: COLORS.red_date,
                }}
              >
                {props.dateTime}
              </Text>
            </View>
            <View style={{ flex: 1, marginBottom: 7 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                  fontSize: 14,
                }}
              >
                {props.schoolName}
              </Text>
            </View>
            <View style={{ flex: 0, marginBottom: 5 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic,
                  fontSize: 11,
                }}
              >
                {props?.timeAgo
                  ? 'Posted ' +
                    timeAgo({
                      dateProp: props.timeAgo ? props.timeAgo : null,
                    })
                  : ''}
              </Text>
            </View>
          </View>
        </View>
        {(Number(props.status) === POST_STATUS_ENUM.OPENING ||
          Number(props.status) === POST_STATUS_ENUM.RE_OPEN ||
          Number(props.status) === POST_STATUS_ENUM.AVOID_REGIST) && (
          <View
            style={{
              position: 'absolute',
              transform: [{ rotate: '-45deg' }],
              top: -13 + 25,
              left: -60 + 25,
              width: 120,
              height: 26,
              backgroundColor:
                Number(props.status) === POST_STATUS_ENUM.OPENING
                  ? 'green'
                  : Number(props.status) === POST_STATUS_ENUM.RE_OPEN
                  ? COLORS?.orange_icon
                  : 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                color:
                  Number(props.status) === POST_STATUS_ENUM.OPENING
                    ? 'white'
                    : Number(props.status) === POST_STATUS_ENUM.RE_OPEN
                    ? "white"
                    : 'yellow',
              }}
            >
              {Number(props.status) === POST_STATUS_ENUM.OPENING
                    ? 'Opening'
                    : Number(props.status) === POST_STATUS_ENUM.RE_OPEN
                    ? "Re-Open"
                    : 'Closed'}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default EventCardWrap;

const styles = StyleSheet.create({});
