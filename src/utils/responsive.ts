import { PixelRatio } from 'react-native';
import { ScreenWidth } from '../constants/Demesions';

const scale = ScreenWidth / 411.42857142857144; // 320 is a reference width, change it according to your design

export const responsiveFontSize = (fontSize: number) => {
  const scaledFontSize = fontSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(scaledFontSize));
};

export const responsiveComponentWidth = (width: number) => {
  const scaledFontSize = width * scale;
  return Math.round(PixelRatio.roundToNearestPixel(scaledFontSize));
};
