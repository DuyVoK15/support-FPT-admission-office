import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
interface SortRegistrationButtonProps extends TouchableOpacityProps {}
const SortRegistrationButton: FC<SortRegistrationButtonProps> = (props) => {
  const { ...otherProps } = props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E1DAE6',
        borderRadius: 15,
        paddingVertical: 6,
        paddingHorizontal: 8,
      }}
    >
      <View style={{ marginRight: 2 }}>
        <FontAwesome name="sort" size={24} color="black" />
      </View>
      <View style={{ marginLeft: 2 }}>
        <Text
          style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular, fontSize: 15 }}
        >
          Sort By
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SortRegistrationButton;

const styles = StyleSheet.create({});
