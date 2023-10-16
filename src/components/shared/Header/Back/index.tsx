import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { ScreenHeight, ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import { SHADOWS } from '../../../../constants/Shadows';
import { LinearGradient } from 'expo-linear-gradient';

type HeaderProps = {
  children?: ReactNode; // Allow children to be passed
  style?: StyleProp<ViewStyle>;
};

const Header = ({ children, style }: HeaderProps) => {
  return (
    <LinearGradient
      colors={['#FF8C00', '#FFA07A']} // Mã màu cam và màu cam kết hợp
      start={{ x: 0.5, y: 0 }} // Bắt đầu từ giữa màn hình ở dưới cùng
      end={{ x: 0.5, y: 1 }}   // Kết thúc ở giữa màn hình ở trên cùng
      locations={[0, 1]} // Chỉ có 2 vị trí: 0 và 1
      style={[styles.viewHeader, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: ScreenHeight / 8.5,
    width: ScreenWidth,
    backgroundColor: COLORS.orange_button,
    ...SHADOWS.SHADOW_02,
  },
});
