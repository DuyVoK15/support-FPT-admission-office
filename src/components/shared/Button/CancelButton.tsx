import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { TouchableOpacityProps } from 'react-native';

interface CancelButtonProps extends TouchableOpacityProps {}
const CancelButton: FC<CancelButtonProps> = (props) => {
  const { ...otherProps } = props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 15,
        backgroundColor: '#F64C18',
      }}
    >
      <View style={{ flex: 0 }}>
        <Text
          style={{
            fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
            fontSize: 15,
            color: 'white',
          }}
        >
          Cancel
        </Text>
      </View>

      <View style={{ flex: 0, marginLeft: 5 }}>
        <MaterialIcons name="cancel-presentation" size={20} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default CancelButton;

const styles = StyleSheet.create({});
