import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS_FAMILY } from '../../../constants/Fonts';

const CampusSelection = () => {
    return (
        <View style={{flex: 2}}>
            <Text style={{ fontFamily: FONTS_FAMILY.Ubuntu_400Regular ,fontSize: 20, marginTop: 30 }}>Only for FU_Hồ Chí Minh</Text>
        </View>
    )
}

export default CampusSelection;

const styles = StyleSheet.create({})