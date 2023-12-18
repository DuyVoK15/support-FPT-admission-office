import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { ScreenWidth } from '../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../constants/Fonts';

interface LoadingSpinnerProps {
  title: string;
}
const LoadingSpinner: FC<LoadingSpinnerProps> = ({ title }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      }}
    >
      <View
        style={{
          height: ScreenWidth * 0.5,
          width: ScreenWidth * 0.5,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
        }}
      >
        <View style={{ margin: 10 }}>
          <ActivityIndicator size={'large'} color={'green'} />
          <Text
            style={{
              fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
              color: 'green',
              marginTop: 10,
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({});
