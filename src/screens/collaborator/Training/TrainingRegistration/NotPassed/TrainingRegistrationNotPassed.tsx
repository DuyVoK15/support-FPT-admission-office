import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { FONTS_FAMILY } from '../../../../../constants/Fonts';
import TrainingStatus from '../TrainingStatus';
import DashedLine from 'react-native-dashed-line';
import { COLORS } from '../../../../../constants/Colors';
import { SHADOWS } from '../../../../../constants/Shadows';
import { DataTrainingCertificateRegistration } from '../../../../../models/collaborator/dataTrainingCertificateRegistration';
import useTrainingRegistrationNotPassed from './useTrainingRegistrationNotPassed';
import RegistrationEmpty from '../../../../../components/shared/Empty/RegistrationEmpty';
import { format_ISODateString_To_DayOfWeekMonthDDYYYY } from '../../../../../utils/formats';
const TrainingRegistrationNotPassed = () => {
  const { state, setState, stateRedux, props, handlers } =
    useTrainingRegistrationNotPassed();
  const renderListEmptyComponent = () => <RegistrationEmpty />;

  const renderItem = ({
    item,
  }: {
    item: DataTrainingCertificateRegistration;
  }) => {
    return (
      <View
        style={{
          backgroundColor: '#FFF',
          // shadowColor: '#65B4E2',
          // shadowOffset: {
          //   width: 0,
          //   height: 0,
          // },
          // shadowOpacity: 0.22,
          // shadowRadius: 2.22,

          // elevation: 3,
          ...SHADOWS.SHADOW_03,
          marginHorizontal: 15,
          marginBottom: 15,
          borderRadius: 10,
        }}
      >
        <View style={{ margin: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                }}
              >
                Registration ID: {''}
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                  }}
                >
                  {item?.id ? item?.id : 'No value'}
                </Text>
              </Text>
            </View>
            <TrainingStatus style={{ flex: 0 }} status="NOT PASSED" />
          </View>
          <DashedLine
            style={{ marginVertical: 10 }}
            dashGap={0}
            dashThickness={1}
            dashLength={8}
            dashColor={COLORS.super_light_grey}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                }}
              >
                Class {''}
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                  }}
                >
                  {}
                </Text>
              </Text>
            </View>
            <View style={{ flex: 0 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                }}
              >
                {item?.eventDay?.class ? item?.eventDay?.class : 'No class'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                }}
              >
                Date {''}
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                  }}
                >
                  {}
                </Text>
              </Text>
            </View>
            <View style={{ flex: 0 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                }}
              >
                {item?.eventDay?.date ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
                      item?.eventDay?.date
                    ) : 'No value'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                }}
              >
                Time {''}
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                  }}
                >
                  {}
                </Text>
              </Text>
            </View>
            <View style={{ flex: 0 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                }}
              >
                {item?.eventDay?.timeFrom
                  ? item?.eventDay?.timeFrom
                  : 'No time' + '' + item?.eventDay?.timeTo
                  ? item?.eventDay?.timeTo
                  : 'No time'}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}
          >
            <View>
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: 'yellow',
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
                  View gì đó
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: 'yellow',
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
                  View gì đó
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          data={stateRedux?.trainingCertificateRegistrationList?.data}
          renderItem={renderItem}
          ListEmptyComponent={renderListEmptyComponent}
        />
      </View>
    </View>
  );
};

export default TrainingRegistrationNotPassed;

const styles = StyleSheet.create({});
