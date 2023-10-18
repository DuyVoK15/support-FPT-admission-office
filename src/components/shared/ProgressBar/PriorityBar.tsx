import { Ionicons } from '@expo/vector-icons';
import { Button } from '@rneui/base';
import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DimensionValue,
  ColorValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { ScreenWidth } from '../../../constants/Demesions';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { SHADOWS } from '../../../constants/Shadows';

interface PriorityBarProps {
  getPriority?: (priority: number) => void;
}

const PriorityBar = (props: PriorityBarProps) => {
  const priorityList = [1, 2, 3, 4, 5];
  const [prioritySelected, setPrioritySelected] = useState<number>(1);
  const [isPriorityChecked, setIsPriorityChecked] = useState<boolean[]>(
    Array(5).fill(false)
  );
  const togglePriority = (priority: number, index: number) => {
    setPrioritySelected(priority);
    console.log(priority)
    const updatedStatus = Array(isPriorityChecked.length).fill(false);
    updatedStatus[index] = true;
    setIsPriorityChecked(updatedStatus);
  };

  const customStyle : StyleProp<ViewStyle> = {
   top: -10,
   ...SHADOWS.SHADOW_04
  }


  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 20,
        }}
      >
        {priorityList?.map((priority, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => togglePriority(priority, index)}
            style={{
              flex: 1,
              borderRadius: 20,
              alignItems: 'center',
              backgroundColor: isPriorityChecked[index]
                ? COLORS.orange_button
                : COLORS.grey_icon,
          
              marginHorizontal: 1,
              paddingVertical: 5,
              ...(isPriorityChecked[index] ? customStyle : {})
            }}
          >
            <Text
              style={{
                fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                fontSize: 20,
                color: '#FFF',
              }}
            >
              {priority ? priority : 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default PriorityBar;
