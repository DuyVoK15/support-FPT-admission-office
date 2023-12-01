import { FlatList, Platform, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ROUTES } from '../../../../constants/Routes';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';
import useViewApplication from './useViewApplication';
import { DataApplication } from '../../../../models/collaborator/application.model';
import { SHADOWS } from '../../../../constants/Shadows';

const ViewApplication = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { handlers, props, setState, state, stateRedux } = useViewApplication();

  const renderItem = ({ item }: { item: DataApplication }) => {
    return (
      <View
        style={{
          marginBottom: 15,
          marginHorizontal: 10,
          backgroundColor: '#FFF',
          borderRadius: 20,
          ...SHADOWS.SHADOW_03,
        }}
      >
        <View style={{ margin: 15 }}>
          <View>
            <Text>
              ID <Text>{item?.id ? item?.id : 'No value'}</Text>
            </Text>
          </View>
          <View>
            <Text>{item?.accountId ? item?.accountId : 'No value'}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header>
        <Backward
          titleBackward="View Application"
          onPress={() => navigation.navigate(ROUTES.ACCOUNT)}
        />
      </Header>
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          data={stateRedux?.applicationList?.data}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={handlers.onRefresh}
            />
          }
          contentContainerStyle={{marginHorizontal: Platform.OS === 'ios' ? 10 : 0}}
        />
      </View>
    </View>
  );
};

export default ViewApplication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
