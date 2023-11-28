import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { Zocial } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { ScreenHeight } from '../../../constants/Demesions';

const RegistrationEmpty = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: ScreenHeight * 0.2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Zocial name="dropbox" size={66} color={COLORS?.light_black} />
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
              color: COLORS?.light_grey,
              fontSize: 24,
            }}
          >
            No Data
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RegistrationEmpty;

const styles = StyleSheet.create({});
