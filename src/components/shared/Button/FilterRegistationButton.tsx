import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { FC, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
interface FilterRegistationButtonProps extends TouchableOpacityProps {}
const FilterRegistationButton: FC<FilterRegistationButtonProps> = (props) => {
  const { ...otherProps } = props;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  return (
    <View>
      <TouchableOpacity
      {...otherProps}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F6C4ED',
          borderRadius: 15,
          paddingVertical: 6,
          paddingHorizontal: 8,
        }}
      >
        <View style={{ marginRight: 2 }}>
          <Ionicons name="color-filter" size={24} color="black" />
        </View>
        <View style={{ marginLeft: 2 }}>
          <Text
            style={{
              fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
              fontSize: 15,
            }}
          >
            Filter
          </Text>
        </View>
      </TouchableOpacity>
      {/* <View style={{ position: 'absolute' }}>
        <View style={{}}>
          <Text></Text>
        </View>
      </View> */}
    </View>
  );
};

export default FilterRegistationButton;

const styles = StyleSheet.create({});
