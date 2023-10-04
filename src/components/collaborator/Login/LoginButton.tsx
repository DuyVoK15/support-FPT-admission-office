import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { SHADOWS } from '../../../constants/Shadows';

interface LoginButtonProps {
  onPress: () => void;
}

const LoginButton = (props: LoginButtonProps) => {
  return (
    <View style={{ flex: 1.1 }}>
      <Pressable style={styles.buttonContainerRow} onPress={props.onPress}>
        <Image
          style={styles.iconGoogle}
          source={require('../../../assets/Images/ic_google.png')}
        />
        <Text style={styles.text}>Sign in with Google</Text>
      </Pressable>
    </View>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  buttonContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 42,
    backgroundColor: '#F09101',
    borderRadius: 10,
    ...SHADOWS.SHADOW_09
  },
  iconGoogle: {
    height: 26,
    width: 26,
    marginHorizontal: 6,
  },
  text: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 16,
    marginHorizontal: 6,
  },
});
