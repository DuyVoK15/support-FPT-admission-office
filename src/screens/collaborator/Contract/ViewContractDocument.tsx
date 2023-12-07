import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { DataContract } from '../../../models/collaborator/contract.model';

const ViewContractDocument = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const route = useRoute();
  const { item } = route?.params as { item: DataContract };
  return (
    <View style={{flex: 1}}>
      <Header>
        <Backward
          titleBackward="Contract Document"
          onPress={() => navigation.goBack()}
        />
      </Header>
      <WebView
        style={{ flex: 1, minHeight: 200, height: 300, opacity: 0.99 }}
        source={{
          uri: item?.contract?.sampleFile
            ? `https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(
                item?.contract?.sampleFile
              )}`
            : '404 Not Found',
        }}
        androidHardwareAccelerationDisabled={true}
        startInLoadingState={true}
      ></WebView>
    </View>
  );
};

export default ViewContractDocument;

const styles = StyleSheet.create({});
