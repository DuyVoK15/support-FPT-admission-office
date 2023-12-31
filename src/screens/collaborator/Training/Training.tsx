import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/Colors';
import { SHADOWS } from '../../../constants/Shadows';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { LinearGradient } from 'expo-linear-gradient';
import useTraining from './useTraining';
import { DataCertificateAdmission } from '../../../models/collaborator/dataCertificateAdmission.model';
import { ROUTES } from '../../../constants/Routes';
import RegistrationEmpty from '../../../components/shared/Empty/RegistrationEmpty';
import { format_ISODateString_To_DayOfWeekMonthDDYYYY } from '../../../utils/formats';
import ConfirmAlert from '../../../components/shared/AwesomeAlert/ConfirmAlert';
import { responsiveFontSize } from '../../../utils/responsive';
import { TRAINING_CERTI_REGIS_STATUS_ENUM } from '../../../enums/collaborator/TrainingCertificateRegistrationStatus';

const CARD_HEIGHT = 830;
const CARD_WIDTH = 380;

const Training = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 7];
  const colors = [
    '#B57BEE',
    '#FFCE06',
    '#30C5D2',
    '#EA98DA',
    '#7AEFB4',
    '#CAD0FF',
    '#FF5858',
    '#BA2E28',
  ]; // Đây là một mảng màu sắc ví dụ

  let currentIndex = 0;

  const generateCustomColor = () => {
    if (colors.length > 0) {
      const currentColor = colors[currentIndex];
      currentIndex = (currentIndex + 1) % colors.length;
      return currentColor;
    }
    return ''; // Hoặc giá trị mặc định khác nếu không có màu sắc trong mảng
  };

  const { state, setState, stateRedux, props, handlers } = useTraining();

  const renderListEmptyComponent = () => {
    return <RegistrationEmpty />;
  };

  const renderItem = ({ item }: { item: DataCertificateAdmission }) => {
    return (
      <View
        style={{
          marginBottom: 15,
          marginHorizontal: 15,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: '#F4A92F',
          ...SHADOWS.SHADOW_04,
        }}
      >
        <View style={{ margin: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                  color: 'black',
                  fontSize: responsiveFontSize(18),
                }}
              >
                Certificate: {''}
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_700Bold_Italic,
                    color: 'black',
                    fontSize: responsiveFontSize(18),
                  }}
                >
                  {item?.certificateName ? item?.certificateName : 'No value'}
                </Text>
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                  fontSize: responsiveFontSize(16),
                }}
              >
                ID: {''}
                <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_700Bold }}>
                  {item?.id ? item?.id : 'No value'}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              alignItems: 'flex-end',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                  fontSize: responsiveFontSize(14),
                }}
              >
                Create at:{' '}
                <Text
                  style={{ fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic }}
                >
                  {item?.createAt
                    ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
                        item?.createAt
                      )
                      ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
                          item?.createAt
                        )
                      : 'No date'
                    : 'No date'}
                </Text>
              </Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              {item?.isHasThisCertificate ? (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(ROUTES.CERTIFICATE_HISTORY, {
                      screen: ROUTES.CERTIFICATE_ALL,
                      params: { certificateId: item?.id },
                    })
                  }
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 18,
                    borderRadius: 11,
                    backgroundColor: '#46910d',

                    shadowColor: COLORS?.orange_button,
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      color: 'white',
                    }}
                  >
                    View your certificate
                  </Text>
                </TouchableOpacity>
              ) : item?.isRegistered ? (
                <TouchableOpacity
                  onPress={() => {
                    item?.certificateStatus ===
                    TRAINING_CERTI_REGIS_STATUS_ENUM.ASSIGNED
                      ? props.navigation.navigate(
                          ROUTES.TRAINING_REGISTRATION,
                          { screen: ROUTES.TRAINING_REGISTRATION_ASSIGNED }
                        )
                      : props.navigation.navigate(
                          ROUTES.TRAINING_REGISTRATION,
                          { screen: ROUTES.TRAINING_REGISTRATION_PENDING }
                        );
                  }}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 18,
                    borderRadius: 11,
                    backgroundColor: 'white',
                    ...SHADOWS.SHADOW_02,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                    }}
                  >
                    You've registered
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    handlers.showAlertHandler(
                      props.TYPE_BUTTON_ENUM.REGISTER,
                      item
                    )
                  }
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 18,
                    borderRadius: 13,
                    backgroundColor: 'white',
                    ...SHADOWS.SHADOW_02,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                    }}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF8C00', '#FFA07A']} // Mã màu cam và màu cam kết hợp
        start={{ x: 0.5, y: 0 }} // Bắt đầu từ giữa màn hình ở dưới cùng
        end={{ x: 0.5, y: 1 }} // Kết thúc ở giữa màn hình ở trên cùng
        locations={[0, 1]} // Chỉ có 2 vị trí: 0 và 1
        style={{ height: CARD_HEIGHT * 0.25 }}
      >
        <View
          style={{
            marginTop: Platform.OS === 'ios' ? 56 : 44,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
              fontSize: responsiveFontSize(26),
            }}
          >
            Certificate Interview
          </Text>
        </View>
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: FONTS_FAMILY?.Ubuntu_500Medium_Italic,
              fontSize: responsiveFontSize(16),
            }}
          >
            Hello, {''}
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                fontSize: responsiveFontSize(16),
              }}
            >
              {stateRedux?.userInfo?.name
                ? stateRedux?.userInfo?.name
                : 'good morning'}
            </Text>
          </Text>
        </View>
      </LinearGradient>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          height: CARD_HEIGHT * 0.3 * 0.55,
          width: ScreenWidth - 30,
          borderRadius: 15,
          top: CARD_HEIGHT * 0.25 - CARD_HEIGHT * 0.3 * 0.55 * 0.5,
          left: 15,
          backgroundColor: '#FFF',
          ...SHADOWS.SHADOW_04,
        }}
      >
        <View style={{ flex: 1, margin: 15, marginTop: 10, marginBottom: 10 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                fontSize: responsiveFontSize(15),
              }}
            >
              Total of Certificate:{' '}
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                  fontSize: responsiveFontSize(18),
                  color: '#F4762D',
                }}
              >
                {stateRedux?.certificateFromAdmissionList?.data
                  ? stateRedux?.certificateFromAdmissionList?.data?.length
                  : 0}
              </Text>
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                fontSize: responsiveFontSize(15),
              }}
            >
              Total of Completed:{' '}
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                  fontSize: responsiveFontSize(18),
                  color: '#F4762D',
                }}
              >
                {stateRedux?.certificateList?.data
                  ? stateRedux?.certificateList?.data?.length
                  : 0}
              </Text>
            </Text>
          </View>
          <View style={{ flex: 0 }}>
            <View
              style={{
                marginTop: 10,
                alignItems: 'center',
                padding: 2,
                borderWidth: 2,
                alignSelf: 'center',
                borderRadius: 12,
                borderColor: '#F4762D',
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(ROUTES.TRAINING_REGISTRATION)
                }
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  backgroundColor: '#F4762D',
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                    color: 'white',
                  }}
                >
                  View Your Registration
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: ScreenHeight * 0.3 * 0.5 * 0.5 + 20 }}>
        <FlatList
          data={stateRedux?.certificateFromAdmissionList?.data}
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
              case props.TYPE_BUTTON_ENUM.REGISTER:
                handlers.createTrainingCertificateRegistration(
                  state?.Item?.id ?? null
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

export default Training;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
