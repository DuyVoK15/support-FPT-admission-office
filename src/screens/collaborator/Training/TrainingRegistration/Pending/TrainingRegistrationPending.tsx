import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { FONTS_FAMILY } from '../../../../../constants/Fonts';
import TrainingStatus from '../TrainingStatus';
import DashedLine from 'react-native-dashed-line';
import { COLORS } from '../../../../../constants/Colors';
import { SHADOWS } from '../../../../../constants/Shadows';
import { DataTrainingCertificateRegistration } from '../../../../../models/collaborator/dataTrainingCertificateRegistration';
import useTrainingRegistrationPending from './useTrainingRegistrationPending';
import RegistrationEmpty from '../../../../../components/shared/Empty/RegistrationEmpty';
import {
  format_ISODateString_To_DDMonthYYYY,
  format_ISODateString_To_DayOfWeekMonthDDYYYY,
  format_ISODateString_To_Full,
} from '../../../../../utils/formats';
import InformationRow from '../../../../../components/collaborator/Training/InformationRow';
import ConfirmAlert from '../../../../../components/shared/AwesomeAlert/ConfirmAlert';

const TrainingRegistrationPending = () => {
  const { state, setState, stateRedux, props, handlers } =
    useTrainingRegistrationPending();
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
            <TrainingStatus style={{ flex: 0 }} status="PENDING" />
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
          <DashedLine
            style={{ marginVertical: 10 }}
            dashGap={0}
            dashThickness={1}
            dashLength={8}
            dashColor={COLORS.super_light_grey}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 5,
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() =>
                  handlers.showAlertHandler(props.TYPE_BUTTON_ENUM.CANCEL,item)
                }
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
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={handlers.onRefresh}
            />
          }
          ListEmptyComponent={renderListEmptyComponent}
        />
        <ConfirmAlert
          show={state.showAlert}
          title="CONFIRMATION"
          message={state.confirmInfo?.message}
          confirmText="Yes"
          cancelText="No"
          confirmButtonColor={COLORS.orange_button}
          onConfirmPressed={() => {
            switch (state.confirmInfo?.typeButton) {
              case props.TYPE_BUTTON_ENUM.CANCEL:
                handlers.handleCancelTrainingCertificateRegistration(
                  state.Item?.id ?? null
                );
                console.log(state.Item?.id);
                break;

              default:
                console.log('Type Button Null');
            }
            handlers.hideAlertHandler();
          }}
          onCancelPressed={handlers.hideAlertHandler}
        />
      </View>
    </View>
  );
};

export default TrainingRegistrationPending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
