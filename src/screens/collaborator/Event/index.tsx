import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppDispatch } from '../../../app/store'
import { updateAvatar } from '../../../features/collaborator/accountSlice';
import { searchPostByPostCode } from '../../../features/collaborator/postSlice';

const Event = () => {
  const dispatch = useAppDispatch();
  const testUpdateAvatar = async () => {
    await dispatch(updateAvatar("https://gamek.mediacdn.vn/133514250583805952/2021/12/2/vegeta-ultra-ego-dbz-16384369793211174459742.jpg")).then((res) => {
      console.log(JSON.stringify(res, null, 2))
    })
  }
  const postCode :string = "8"
  const testSearchPost = async () => {
    await dispatch(searchPostByPostCode(postCode)).then((res) => {
      console.log(JSON.stringify(res, null, 2))
    })
  }
  return (
    <View style={styles.container}>
      <Button title='Update Avatar' onPress={testUpdateAvatar} />
      <Button title='Search Post By Post Code' onPress={testSearchPost} />
    </View>
  )
}

export default Event

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  }
})