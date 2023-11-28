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
        paddingVertical: 10,
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#436C89',
      }}
    >
      <View style={{ flex: 1, marginLeft: 17 }}>
        <Text
          style={{
            fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
            fontSize: 15,
          }}
        >
          Cancel
        </Text>
      </View>

      <View style={{ flex: 0, marginRight: 17 }}>
        <MaterialIcons name="cancel-presentation" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default CancelButton;

const styles = StyleSheet.create({});
