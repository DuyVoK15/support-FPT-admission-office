import { ColorValue, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';

interface InformationRowProps {
  title: string | null;
  value: string | null;
  fontFamilyTitle?: string | undefined;
  fontFamilyValue?: string | undefined;
  colorTextTitle?: ColorValue | undefined;
  colorTextValue?: ColorValue | undefined;
  fontSizeTitle?: number | undefined;
  fontSizeValue?: number | undefined;
  marginTop?: number | undefined;
}
const InformationRow:FC<InformationRowProps> = (Props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Props.marginTop ?? 0 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: Props.fontFamilyTitle ?? FONTS_FAMILY?.Ubuntu_500Medium,
                  fontSize: Props.fontSizeTitle,
                  color: Props.colorTextTitle
                }}
              >
                {Props.title}
              </Text>
            </View>
            <View style={{ flex: 0 }}>
              <Text
                style={{
                  fontFamily: Props.fontFamilyValue ?? FONTS_FAMILY?.Ubuntu_400Regular,
                  fontSize: Props.fontSizeValue,
                  color: Props.colorTextValue,
                }}
              >
                {Props.value}
              </Text>
            </View>
          </View>
  );
};

export default InformationRow;

const styles = StyleSheet.create({});
