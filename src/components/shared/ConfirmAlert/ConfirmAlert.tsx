import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { FC } from 'react';
import ReactNativeModal from 'react-native-modal';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { SHADOWS } from '../../../constants/Shadows';

type Type = {};

interface ConfirmAlertProps {
  isVisible?: boolean;
  title?: string | null;
  message?: string | null;
  showFirstButton?: boolean;
  onPressFirstButton?: () => void;
  firstButtonLabel?: string | null;
  showSecondButton?: boolean;
  onPressSecondButton?: () => void;
  secondButtonLabel?: string | null;
  onBackdropPress?: () => void;
}
const ConfirmAlertModal: FC<ConfirmAlertProps> = (Props) => {
  return (
      <ReactNativeModal
        isVisible={Props.isVisible}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onBackdropPress={Props.onBackdropPress}
      >
        <View
          style={{
            backgroundColor: 'white',
            height: ScreenHeight * 0.25,
            width: ScreenWidth * 0.8,
            borderRadius: 20,
            ...SHADOWS.SHADOW_09,
          }}
        >
          <View
            style={{
              backgroundColor: 'yellow',
              alignItems: 'center',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingVertical: 15,
            }}
          >
            <Text>{Props.title ?? ""}</Text>
          </View>
          <View style={{ flex: 1, margin: 15 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ textAlign: 'center' }}>
                {Props.message ?? ""}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            {Props.showFirstButton && (
              <View>
                <TouchableOpacity
                  onPress={Props.onPressFirstButton}
                  style={{
                    paddingVertical: 7,
                    paddingHorizontal: 18,
                    borderRadius: 8,
                    backgroundColor: 'grey',
                  }}
                >
                  <Text>{Props.firstButtonLabel ?? "Cancel" }</Text>
                </TouchableOpacity>
              </View>
            )}
            {Props.showSecondButton && (
              <View>
                <TouchableOpacity
                  onPress={Props.onPressSecondButton}
                  style={{
                    paddingVertical: 7,
                    paddingHorizontal: 18,
                    borderRadius: 8,
                    backgroundColor: 'green',
                  }}
                >
                  <Text>{Props.secondButtonLabel ?? "Confirm" }</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ReactNativeModal>
  );
};

export default ConfirmAlertModal;

const styles = StyleSheet.create({});
