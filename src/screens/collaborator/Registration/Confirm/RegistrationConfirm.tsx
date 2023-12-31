import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { ScreenWidth } from '../../../../constants/Demesions';
import DashedLine from 'react-native-dashed-line';
import { RefreshControl } from 'react-native';
import {
  format_ISODateString_To_DayOfWeekMonthDD,
  format_Time_To_HHss,
} from '../../../../utils/formats';
import { imageNotFoundUri } from '../../../../utils/images';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { REGISTRATION_STATUS_ENUM } from '../../../../enums/collaborator/RegistrationStatus';
import CheckInButton from '../../../../components/shared/Button/CheckInButton';
import CheckOutButton from '../../../../components/shared/Button/CheckOutButton';
import DetailButton from '../../../../components/shared/Button/DetailButton';
import RegistrationEmpty from '../../../../components/shared/Empty/RegistrationEmpty';
import DataViewPostRegistration from '../../../../models/collaborator/postRegistration.model';
import FilterRegistationButton from '../../../../components/shared/Button/FilterRegistationButton';
import SortRegistrationButton from '../../../../components/shared/Button/SortRegistrationButton';
import { FlashList } from '@shopify/flash-list';
import ChangePositionButton from '../../../../components/shared/Button/ChangePositionButton';
import useRegistrationConfirm from './useRegistrationConfirm';
import CancelButton from '../../../../components/shared/Button/CancelButton';
import { SHADOWS } from '../../../../constants/Shadows';
import ConfirmAlert, {
  TITLE_ENUM,
} from '../../../../components/shared/AwesomeAlert/ConfirmAlert';
import { ROUTES } from '../../../../constants/Routes';
import Registration_Confirm_Detail from './confirmDetail/RegistrationConfirmDetail';
import RegistrationDetail from '../RegistrationDetail';
import RegistrationStatus from '../RegistrationStatus';
import Spinner from 'react-native-loading-spinner-overlay';
import LoadingLocation from '../../../../components/shared/Spinner/LoadingSpinner';
import LoadingSpinner from '../../../../components/shared/Spinner/LoadingSpinner';
import BannedPopup from '../../Banned/BannedPopup';

const Registration_Confirm = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { handlers, state, props, stateRedux, setState } =
    useRegistrationConfirm();
  enum TYPE_BUTTON_ENUM {
    REGISTER = 1,
    CANCEL = 2,
    CHECKIN = 3,
    CHECKOUT = 4,
  }
  type ConfirmInfo = {
    title: string | null;
    titleType?: number | null;
    message: string | null;
    typeButton: number | null;
  };
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [confirmInfo, setConfirmInfo] = useState<ConfirmInfo | null>(null);
  const [Item, setItem] = useState<DataViewPostRegistration | null>(null);
  const showAlertHandler = (
    action: number | null,
    item: DataViewPostRegistration | null
  ) => {
    switch (action) {
      case TYPE_BUTTON_ENUM.CANCEL:
        setConfirmInfo({
          title: 'CONFIRMATION',
          titleType: TITLE_ENUM.WARNING,
          message: `Are you sure you want to CANCEL "${item?.postPosition?.positionName}" position?`,
          typeButton: TYPE_BUTTON_ENUM.CANCEL,
        });

        break;
      case TYPE_BUTTON_ENUM.CHECKIN:
        setConfirmInfo({
          title: 'CONFIRMATION',
          titleType: TITLE_ENUM.WARNING,
          message: `Do you want to CHECKIN "${item?.postPosition?.positionName}" position?`,
          typeButton: TYPE_BUTTON_ENUM.CHECKIN,
        });

        break;
      case TYPE_BUTTON_ENUM.CHECKOUT:
        setConfirmInfo({
          title: 'CONFIRMATION',
          titleType: TITLE_ENUM.WARNING,
          message: `Do you want to CHECKOUT "${item?.postPosition?.positionName}" position?`,
          typeButton: TYPE_BUTTON_ENUM.CHECKOUT,
        });

        break;
      default:
        setConfirmInfo({
          title: '',
          message: '',
          typeButton: 0,
        });
    }
    setItem(item);
    setShowAlert(true);
  };

  const hideAlertHandler = () => {
    setShowAlert(false);
  };

  const renderListEmptyComponent = () => {
    return <RegistrationEmpty />;
  };
  const renderItem = ({ item }: { item: DataViewPostRegistration }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ROUTES.REGISTRATION_DETAIL, { item })
        }
        key={item?.registrationCode}
        style={styles.containerItem}
      >
        <View style={styles.containerRow}>
          <View style={styles.firstRow}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{
                  uri: item?.post?.postImg
                    ? item?.post?.postImg
                    : imageNotFoundUri,
                }}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.textFirst}>General</Text>
              <Text style={styles.textFirst_2}>
                {item?.post?.postCategory?.postCategoryDescription
                  ? item?.post?.postCategory?.postCategoryDescription
                  : 'No value'}
              </Text>
              <Text style={styles.textFirst_3}>
                {item?.registrationCode
                  ? 'PRCode: ' + item?.registrationCode
                  : 'No value'}
              </Text>
            </View>
          </View>

          <DashedLine
            style={{ marginTop: 15, marginBottom: 10 }}
            dashGap={0}
            dashThickness={1}
            dashLength={8}
            dashColor={COLORS.super_light_grey}
          />

          <View style={styles.secondRow}>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textSecond}>Position</Text>
              <Text style={styles.textSecond_2}>
                {item?.postPosition?.positionName
                  ? item?.postPosition?.positionName
                  : 'No value'}
              </Text>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textSecond}>Date</Text>
              <Text style={styles.textSecond_2}>
                {item?.postPosition?.date
                  ? format_ISODateString_To_DayOfWeekMonthDD(
                      item?.postPosition?.date
                    )
                    ? format_ISODateString_To_DayOfWeekMonthDD(
                        item?.postPosition?.date
                      )
                    : 'No value'
                  : 'No value'}
              </Text>
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textSecond}>Time</Text>
              <Text style={styles.textSecond_2}>
                {item?.postPosition?.timeFrom &&
                  item?.postPosition?.timeTo &&
                  format_Time_To_HHss(item?.postPosition?.timeFrom) &&
                  format_Time_To_HHss(item?.postPosition?.timeTo) &&
                  format_Time_To_HHss(item?.postPosition?.timeFrom) +
                    ' - ' +
                    format_Time_To_HHss(item?.postPosition?.timeTo)}
              </Text>
            </View>
          </View>

          <RegistrationStatus
            status={(() => {
              switch (item?.status) {
                case REGISTRATION_STATUS_ENUM.CONFIRM:
                  return REGISTRATION_STATUS_ENUM.CONFIRM;
                case REGISTRATION_STATUS_ENUM.CHECKIN:
                  return REGISTRATION_STATUS_ENUM.CHECKIN;

                default:
                  return 0; // Set your default border color here
              }
            })()}
          />

          <DashedLine
            style={{ marginVertical: 10 }}
            dashGap={0}
            dashThickness={1}
            dashLength={8}
            dashColor={COLORS.super_light_grey}
          />

          {/* Container Button */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              // alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            {item?.status === REGISTRATION_STATUS_ENUM.CONFIRM ? (
              <CheckInButton
                onPress={() => showAlertHandler(TYPE_BUTTON_ENUM.CHECKIN, item)}
              />
            ) : item?.status === REGISTRATION_STATUS_ENUM.CHECKIN ? (
              <CheckOutButton
                onPress={() =>
                  showAlertHandler(TYPE_BUTTON_ENUM.CHECKOUT, item)
                }
              />
            ) : (
              <View />
            )}
            {/* View Detail Button */}
            {item?.status === REGISTRATION_STATUS_ENUM.CONFIRM && (
              <CancelButton
                onPress={() => showAlertHandler(TYPE_BUTTON_ENUM.CANCEL, item)}
              />
            )}
          </View>

          <DashedLine
            style={{ marginTop: 20, marginBottom: 15 }}
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
                  fontSize: 13,
                }}
              >
                Registered at:{' '}
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                    fontSize: 13,
                  }}
                >
                  {item?.createAt
                    ? format_ISODateString_To_DayOfWeekMonthDD(
                        item?.createAt,
                        true
                      )
                    : 'No value'}
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                  fontSize: 13,
                }}
              >
                Confirmed at:{' '}
                <Text
                  style={{
                    marginTop: 3,
                    fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                    fontSize: 13,
                  }}
                >
                  {item?.confirmTime
                    ? format_ISODateString_To_DayOfWeekMonthDD(
                        item?.confirmTime,
                        true
                      )
                    : 'No value'}
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                  fontSize: 13,
                }}
              >
                CheckedIn at:{' '}
                <Text
                  style={{
                    marginTop: 3,
                    fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                    fontSize: 13,
                  }}
                >
                  {item?.checkAttendances?.[0]?.checkInTime
                    ? format_ISODateString_To_DayOfWeekMonthDD(
                        item?.checkAttendances?.[0]?.checkInTime,
                        true
                      )
                    : "You've not CheckIn"}
                </Text>
              </Text>
            </View>
            {item?.postPositionsUnregistereds?.length > 0 && (
              <View>
                <TouchableOpacity
                  style={{ paddingVertical: 15, paddingLeft: 10 }}
                  onPress={() =>
                    navigation.navigate('REQUEST_CHANGE_POSITION_CONFIRM', {
                      id: item?.id,
                    })
                  }
                >
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                      fontSize: 13,
                      textDecorationLine: 'underline',
                    }}
                  >
                    {item?.isUpdated ? "You've changed" : 'Change position?'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={state.loadingLocation}
        children={<LoadingSpinner title="Waiting for Checking Your Location" />}
      />
      {/* <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginHorizontal: 10,
          zIndex: 1,
        }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <FilterRegistationButton />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <SortRegistrationButton />
        </View>
      </View> */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={props.postRegistrationList?.data}
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
          show={showAlert}
          title="CONFIRMATION"
          message={confirmInfo?.message}
          confirmText="Yes"
          cancelText="No"
          confirmButtonColor={COLORS.orange_button}
          onConfirmPressed={() => {
            hideAlertHandler();
            switch (confirmInfo?.typeButton) {
              case TYPE_BUTTON_ENUM.CANCEL:
                handlers.cancelRegistrationById(Item?.id ?? null);
                console.log(Item?.id);
                break;
              case TYPE_BUTTON_ENUM.CHECKIN:
                handlers.checkInPostRegistation(Item?.id ?? null);
                console.log(Item?.id);
                break;
              case TYPE_BUTTON_ENUM.CHECKOUT:
                handlers.checkOutPostRegistation(Item?.id ?? null);
                console.log(Item?.id);
                break;
              default:
                hideAlertHandler();
                break;
            }
          }}
          onCancelPressed={hideAlertHandler}
        />
      </View>
      <BannedPopup
        isVisible={state.isVisibleBannedPopup}
        showModal={handlers.showBannedPopup}
        hideModal={handlers.hideBannedPopup}
        currentAccountBanned={stateRedux.currentAccountBanned}
      />
    </View>
  );
};

export default Registration_Confirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    zIndex: 1,
  },
  containerItem: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
    ...SHADOWS.SHADOW_06,
  },
  containerRow: {
    margin: 15,
  },
  firstRow: { flexDirection: 'row', alignItems: 'center' },
  containerImage: {
    flex: 0,
    borderRadius: 15,
  },
  image: {
    height: ScreenWidth * 0.2,
    width: ScreenWidth * 0.3,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  textFirst: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 13,
    color: COLORS.light_black,
  },
  textFirst_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  textFirst_3: {
    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
    fontSize: 12,
    color: COLORS?.light_grey,
    marginTop: 5,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginTop: 10,
    // marginBottom: 20,
  },
  column: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textColumn: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 14,
  },
  textColumn_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 13,
  },
  textSecond: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 13,
    color: COLORS.light_grey,
  },
  textSecond_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 14,
    color: 'black',
    marginVertical: 5,
    textAlign: 'center',
  },
  containerStatus: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 30,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 7,
  },
  thirdRow: { flexDirection: 'row', alignItems: 'center' },
  thirdText: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 14,
    color: COLORS.light_grey,
  },
  statusDot: {
    width: 12,
    height: 12,
    marginLeft: 5,
    borderRadius: 100,
    backgroundColor: COLORS.super_dark_orange,
  },
  containerViewDetail: {
    alignItems: 'center',
  },
});
