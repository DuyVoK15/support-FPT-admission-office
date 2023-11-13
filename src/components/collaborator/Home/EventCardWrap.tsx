import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { SHADOWS } from '../../../constants/Shadows';
import { cardWidth } from '../../../constants/Demesions';
import { TouchableOpacityProps } from 'react-native';

interface EventCardWrapProps extends TouchableOpacityProps {
  imageUrl?: string;
  title?: string;
  dateTime?: string;
  schoolName?: string;
  totalRegisterAmount?: string;
  totalAmountPosition?: string;
  status?: number;
}

const EventCardWrap: FC<EventCardWrapProps> = (props) => {
  const { ...otherProps } = props;
  
  return (
    <TouchableOpacity
      style={{
        height: cardWidth + 60,
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
            <View style={{ flex: 0, marginBottom: 7 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                  fontSize: 14,
                }}
              >
                {props.schoolName}
              </Text>
            </View>
          </View>
        </View>
        { props.status === 2 &&
          <View
            style={{
              position: 'absolute',
              transform: [{ rotate: '-45deg' }],
              top: -13 + 25,
              left: -60 + 25,
              width: 120,
              height: 26,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                color: 'yellow',
              }}
            >
              Closed
            </Text>
          </View>
        }
      </View>
    </TouchableOpacity>
  );
};

export default EventCardWrap;

const styles = StyleSheet.create({});
