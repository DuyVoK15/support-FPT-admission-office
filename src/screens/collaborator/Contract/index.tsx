import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import useIndex from './useIndex';

const Contract = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { handlers, state, props } = useIndex();

  return (
    <View style={styles.container}>
      <Header>
        <Backward titleBackward="Back" onPress={() => navigation.goBack()} />
      </Header>
      <Text>Contract</Text>
    </View>
  );
};

export default Contract;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
