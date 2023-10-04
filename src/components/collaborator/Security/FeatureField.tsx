import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { Entypo } from '@expo/vector-icons';

type FeatureFieldProps = TouchableOpacity['props'] & {
    featureName?: string;
}
export default class FeatureField extends Component<FeatureFieldProps> {
  render() {
    const {...otherProps} = this.props
    return (
      <View style={styles.containerBox}>
        <TouchableOpacity
          onPress={() => console.log('object')}
          style={styles.containerContent}
          {...otherProps}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.textFeature}>{this.props?.featureName}</Text>
          </View>
          <View>
            <Entypo
              name="chevron-small-right"
              size={28}
              color={COLORS.light_grey}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerBox: {
    backgroundColor: 'white',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.light_grey,
  },
  containerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  textFeature: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 16,
  },
});
