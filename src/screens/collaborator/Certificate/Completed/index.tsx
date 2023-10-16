import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CertificateCard from '../../../../components/collaborator/Certificate/CertificateCard';
import useCompletedCertificate from './useIndex';

const Certificate_Completed_Status = () => {
  const { props, handlers } = useCompletedCertificate();

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        <ScrollView>
          {props?.certificateList ? (
            props?.certificateList.data
              .filter((certificate) => certificate?.status === 1)
              .map((certificate, index) => (
                <CertificateCard
                  key={index}
                  dateReceive="25-9-2023"
                  certificateID={String(certificate?.traningCertificate?.id)}
                  certificateName={
                    certificate?.traningCertificate?.certificateName
                  }
                  confirmBy="DatTD"
                  status="Completed"
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

export default Certificate_Completed_Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
