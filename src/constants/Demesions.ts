import { Dimensions } from 'react-native';

export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;
export const containerGap = 15;
export const cardGap = 15;
export const cardWidth = (ScreenWidth - cardGap - containerGap * 2) / 2;
