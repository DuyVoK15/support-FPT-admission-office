import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { DataContract } from '../../../models/collaborator/contract.model';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';

const ViewContractDocument = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const route = useRoute();
  const { item } = route?.params as { item: DataContract };
  const encode = 
    'https://firebasestorage.googleapis.com/v0/b/supfamof-c8c84.appspot.com/o/images%2Fadmission%2FeventH%E1%BB%A3p-%C4%91%E1%BB%93ng-kho%C3%A1n-g%E1%BB%8Dn-Modify%20(4).docx?alt=media&token=63baf4e6-0a0a-4942-9718-ff533c8e91bc'
  ;

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Backward
          titleBackward="Contract Document"
          onPress={() => navigation.goBack()}
        />
      </Header>
      <WebView
        style={{ width: ScreenWidth, height: ScreenHeight }}
        source={{
          uri: item?.contract?.sampleFile
            ? encode
            : '404 Not Found',
        }}
        androidHardwareAccelerationDisabled={true}
        startInLoadingState={true}
        onLoadStart={() => console.log('WebView starting to load')}
        onLoadEnd={() => console.log('WebView finished loading')}
        onError={(error) => console.error('WebView error:', error)}
        onContentProcessDidTerminate={(s) => console.log(s)}
        onHttpError={(error) => console.log('error ',error)}
      />
    </View>
  );
};

export default ViewContractDocument;

const styles = StyleSheet.create({});
