import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';

const CategoryFilterList = () => {
  const list = [1, 2, 3, 4, 5, 6];
  const numberPage = 5;
  const [isChecked, setIsChecked] = useState<boolean[]>(
    Array(numberPage).fill(false)
  );
  const handleInitialSelectedItem = (index: number) => {
    const updatedStatus = Array(numberPage).fill(false);
    updatedStatus[index] = true;
    setIsChecked(updatedStatus);
  };
  return (
    <View style={{ margin: 15 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {list.map((index) => (
            <TouchableOpacity
              onPress={() => handleInitialSelectedItem(index)}
              key={index}
              style={{
                borderWidth: 3,
                borderColor: '#FF930F',
                backgroundColor: isChecked[index] ? '#FF930F' : '#FFF',
                marginRight: 10,
                borderRadius: 20,
              }}
            >
              <View style={{ margin: 10 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                    color: isChecked[index] ? '#FFF' : '#FF930F',
                  }}
                >
                  Tư vấn lớp
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryFilterList;

const styles = StyleSheet.create({});
