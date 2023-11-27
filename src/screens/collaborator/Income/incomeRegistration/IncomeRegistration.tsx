import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { COLORS } from '../../../../constants/Colors';
import BackwardBlur from '../../../../components/shared/Direction/Backward/BackwardBlur';
import { imageNotFoundUri } from '../../../../utils/images';
import ReactNativeModal from 'react-native-modal';
import { ViewRegistrationReportResponse } from '../../../../dtos/collaborator/response/viewReport.dto';
import CloseBlur from '../../../../components/shared/Direction/Close/CloseBlur';

interface IncomeRegistrationProps {
  isVisible: boolean;
  incomeRegistration: ViewRegistrationReportResponse | null;
  onCloseButton: () => void;
}
const IncomeRegistration: FC<IncomeRegistrationProps> = (Props) => {
  return (
    <ReactNativeModal
      style={{ flex: 1, margin: 0, backgroundColor: '#FFF' }}
      isVisible={Props.isVisible}
    >
      <View style={styles.container}>
        <ImageBackground
          style={{ width: '100%', height: 250 }}
          source={{
            uri: imageNotFoundUri,
          }}
        >
          <CloseBlur style={{ marginTop: 50 }} onPress={Props.onCloseButton} />
        </ImageBackground>
        <View style={styles.containerRegistration}>
          <View style={styles.containerMargin}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 0 }}>
                <View
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: 5,
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: COLORS.orange_icon,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      color: COLORS?.orange_icon,
                      fontSize: 14,
                    }}
                  >
                    OPEN DAY
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                    color: COLORS?.orange_icon,
                    fontSize: 16,
                  }}
                >
                  + 37 Attendees
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                  fontSize: 26,
                }}
              >
                OPEN DAY
              </Text>
            </View>

            <View style={{ marginBottom: 15, marginTop: 20 }}>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                    fontSize: 18,
                  }}
                >
                  Post
                </Text>
              </View>
              <Text>Oct 13, 2023 - Oct 15, 2023</Text>
              <Text>5:00 - 9:00</Text>
            </View>

            <View style={{ marginBottom: 15 }}>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                    fontSize: 18,
                  }}
                >
                  Position
                </Text>
              </View>
              <Text>Thursday, October 14, 2023</Text>
              <Text>5:00 - 9:00</Text>
              <Text>FPT University HCM</Text>
              <Text>
                Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                Thành phố Hồ Chí Minh
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default IncomeRegistration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 30,
  },
  containerRegistration: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerMargin: {
    margin: 15,
  },
});
