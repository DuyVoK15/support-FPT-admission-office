import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';

interface CampusSelectionProps {
  style?: StyleProp<ViewStyle>;
}
const CampusSelection: FC<CampusSelectionProps> = (props) => {
  return (
    <View style={props.style}>
      <Text
        style={{
          fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
          fontSize: 20,
          marginTop: 30,
        }}
      >
        Only for FU_Hồ Chí Minh
      </Text>
    </View>
  );
};

export default CampusSelection;

const styles = StyleSheet.create({});
