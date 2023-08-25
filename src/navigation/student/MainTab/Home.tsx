import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions'
import { useAppDispatch } from '../../../app/store'
import { logout } from '../../../features/student/authSlice'

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>

      </View>
      <Button title='Logout' onPress={() => dispatch(logout())} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

  },
  viewHeader: {
    height: ScreenHeight/4,
    width: ScreenWidth,
    backgroundColor: "orange",
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
  }
})