import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { ScreenHeight, ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import { SHADOWS } from '../../../../constants/Shadows';

type HeaderProps = {
    children?: ReactNode; // Allow children to be passed
    style?: StyleProp<ViewStyle>;
};

const Header = ({ children, style }: HeaderProps) => {
    return (
        <View style={[styles.viewHeader, style]} >
            {children}
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    viewHeader: {
        flexDirection: "row",
        alignItems: "flex-end",
        height: ScreenHeight / 8.5,
        width: ScreenWidth,
        backgroundColor: COLORS.orange_button,
        ...SHADOWS.SHADOW_02
        
    }
})