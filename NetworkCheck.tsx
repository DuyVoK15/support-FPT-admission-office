import { FC } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScreenWidth } from './src/constants/Demesions';
import { FONTS_FAMILY } from './src/constants/Fonts';

interface NetworkCheckProps {
  visible: boolean;
}
const NetworkCheck: FC<NetworkCheckProps> = ({ visible }) => {
  return (
    <Spinner
      visible={!visible}
      children={
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(73, 77, 73, 0.3)',
          }}
        >
          <View
            style={{
              height: ScreenWidth * 0.5,
              width: ScreenWidth * 0.5,
              backgroundColor: 'rgba(158, 154, 147, 0.8)',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
            }}
          >
            <ActivityIndicator
              size={'large'}
              color={'rgba(255, 255, 255, 0.6)'}
            />
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                color: 'rgba(255, 255, 255, 0.6)',
                marginTop: 10,
                fontSize: 16,
              }}
            >
              Waiting for Internet. . .
            </Text>
          </View>
        </View>
      }
      textStyle={{
        fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
        fontSize: 10,
      }}
      textContent="Waiting to re-connected Internet..."
    />
  );
};

export default NetworkCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
  },
  statusText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});
