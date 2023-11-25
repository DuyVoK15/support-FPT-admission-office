import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CertificateCard from '../../../../components/collaborator/Certificate/CertificateCard';
import useAllCertificate from './useCertificateAll';

const Certificate_All_Status = () => {
  const { state, props, handlers } = useAllCertificate();

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={handlers?.onRefresh}
            />
          }
        >
          {props?.certificateList ? (
            props?.certificateList.data.map((certificate, index) => (
              <CertificateCard
                key={index}
                dateReceive="25-9-2023"
                certificateID={
                  certificate?.id ? String(certificate?.id) : 'No value'
                }
                certificateName={
                  certificate?.trainingCertificate?.certificateName
                    ? certificate?.trainingCertificate?.certificateName
                    : 'No value'
                }
                confirmBy={certificate?.certificateIssuer?.name}
                status={'Completed'}
              />
            ))
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Certificate_All_Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
