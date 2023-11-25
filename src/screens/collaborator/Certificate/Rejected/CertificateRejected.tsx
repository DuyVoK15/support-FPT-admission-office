import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CertificateCard from '../../../../components/collaborator/Certificate/CertificateCard';
import useRejectedCertificate from './useCertificateRejected';

const Certificate_Rejected_Status = () => {
  const { state, props, handlers } = useRejectedCertificate();

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={handlers.onRefresh}
            />
          }
        >
          {props?.certificateList?.data ? (
            props?.certificateList?.data
              .map((certificate, index) => (
                <CertificateCard
                key={index}
                dateReceive="25-9-2023"
                certificateID={certificate?.id ? String(certificate?.id) : "No value"}
                certificateName={
                  certificate?.trainingCertificate?.certificateName
                    ? certificate?.trainingCertificate?.certificateName
                    : 'No value'
                }
                confirmBy="DatTD"
                status={'Rejected'}
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

export default Certificate_Rejected_Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
