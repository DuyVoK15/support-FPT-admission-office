import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useTrainingRegistrationAssigned from './useTrainingRegistrationAssigned';
import { DataTrainingCertificateRegistration } from '../../../../../models/collaborator/dataTrainingCertificateRegistration';
import { SHADOWS } from '../../../../../constants/Shadows';
import DashedLine from 'react-native-dashed-line';
import { COLORS } from '../../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../../constants/Fonts';
import TrainingStatus from '../TrainingStatus';
import RegistrationEmpty from '../../../../../components/shared/Empty/RegistrationEmpty';
import { format_ISODateString_To_DDMonthYYYY, format_ISODateString_To_DayOfWeekMonthDDYYYY, format_ISODateString_To_Full } from '../../../../../utils/formats';
import InformationRow from '../../../../../components/collaborator/Training/InformationRow';

const TrainingRegistrationAssigned = () => {
  const { state, setState, stateRedux, props, handlers } =
    useTrainingRegistrationAssigned();
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
                  {item?.id ? item?.id : 'No date'}
                </Text>
              </Text>
            </View>
            <TrainingStatus style={{ flex: 0 }} status="ASSIGNED" />
          </View>
          <DashedLine
            style={{ marginVertical: 10 }}
            dashGap={0}
            dashThickness={1}
            dashLength={8}
            dashColor={COLORS.super_light_grey}
          />

          <InformationRow
            title={'Certificate'}
            value={
              item?.trainingCertificate?.certificateName
                ? item?.trainingCertificate?.certificateName.trim()
                : 'No class'
            }
            fontSizeTitle={15}
            fontSizeValue={15}
            fontFamilyValue={FONTS_FAMILY?.Ubuntu_500Medium}
            colorTextValue={COLORS?.orange_icon}
          />
          <InformationRow
            title={'Room'}
            value={item?.eventDay?.class ? item?.eventDay?.class : 'Not yet'}
            marginTop={10}
          />
          <InformationRow
            title={'Date'}
            value={
              item?.eventDay?.date
                ? format_ISODateString_To_DDMonthYYYY(
                    item?.eventDay?.date
                  )
                : 'Not yet'
            }
            marginTop={10}
          />
          <InformationRow
            title={'Time'}
            value={
              item?.eventDay?.timeFrom && item?.eventDay?.timeTo
                ? item?.eventDay?.timeFrom + ' - ' + item?.eventDay?.timeTo
                : 'Not yet'
            }
            marginTop={10}
          />
          <DashedLine
            style={{ marginVertical: 10 }}
            dashGap={0}
            dashThickness={1}
            dashLength={8}
            dashColor={COLORS.super_light_grey}
          />
          <InformationRow
            title={'Registered at'}
            value={
              item?.createAt
                ? format_ISODateString_To_Full(item?.createAt)
                  ? format_ISODateString_To_Full(item?.createAt)
                  : 'Not yet'
                : 'Not yet'
            }
          />
          <InformationRow
            title={'Assigned at'}
            value={
              item?.createAt
                ? format_ISODateString_To_Full(item?.updateAt)
                  ? format_ISODateString_To_Full(item?.updateAt)
                  : 'Not yet'
                : 'Not yet'
            }
            marginTop={10}
          />

          {/* <View
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
                  backgroundColor: '#e63419',
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                    fontSize: 15,
                    color: '#FFF',
                  }}
                >
                  Cancel
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
          </View> */}
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
          refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={handlers.onRefresh} />}
          ListEmptyComponent={renderListEmptyComponent}
        />
      </View>
    </View>
  );
};

export default TrainingRegistrationAssigned;

const styles = StyleSheet.create({});
