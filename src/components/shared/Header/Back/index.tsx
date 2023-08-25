import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { ScreenHeight, ScreenWidth } from '../../../../constants/Demesions';

type HeaderProps = {
    children: ReactNode; // Allow children to be passed
};

const Header = ({ children }: HeaderProps) => {
    return (
        <View style={styles.viewHeader}>
            {children}
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    viewHeader: {
        flexDirection: "row",
        alignItems: "center",
        height: ScreenHeight / 6,
        width: ScreenWidth,
        backgroundColor: "orange",
        borderBottomLeftRadius: 33,
        borderBottomRightRadius: 33,
    }
})