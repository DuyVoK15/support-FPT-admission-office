import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateAvatar } from '../../../features/collaborator/collab.accountSlice';
import { searchPostByPostCode } from '../../../features/collaborator/collab.postSlice';
import UpdateAvatarDto from '../../../dtos/collaborator/payload/updateAvatar.dto';

const Event = () => {
  const dispatch = useAppDispatch();
  const data : UpdateAvatarDto = {
    imgUrl: "https://static.miraheze.org/greatcharacterswiki/e/e0/Vegeta-dragon-ball-z-budokai-3-goku-uub-trunks-png-favpng-Txcgkct8VdLkP0yp3A5E8wNkb.jpg"
  }
  const testUpdateAvatar = async () => {
    await dispatch(
      updateAvatar(
        data
      )
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  const postCode: string = '8tonayjm7j';
  const testSearchPost = async () => {
    await dispatch(searchPostByPostCode(postCode)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  return (
    <View style={styles.container}>
      <Button title="Update Avatar" onPress={testUpdateAvatar} />
      <Button title="Search Post By Post Code" onPress={testSearchPost} />
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
