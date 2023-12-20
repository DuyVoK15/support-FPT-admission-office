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
import { format_ISODateString_To_DDMMYYYY } from '../../../../utils/formats';
import CERTIFICATE_STATUS_ENUM from '../../../../enums/collaborator/CertificateStatus';

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
                dateReceive={
                  certificate?.createAt
                    ? format_ISODateString_To_DDMMYYYY(certificate?.createAt)
                      ? format_ISODateString_To_DDMMYYYY(certificate?.createAt)
                      : 'No date'
                    : 'No date'
                }
                certificateID={
                  certificate?.id
                    ? String(certificate?.trainingCertificate?.id)
                    : 'No value'
                }
                certificateName={
                  certificate?.trainingCertificate?.certificateName
                    ? certificate?.trainingCertificate?.certificateName
                    : 'No value'
                }
                confirmBy={
                  certificate?.certificateIssuer?.name
                    ? certificate?.certificateIssuer?.name
                    : 'System'
                }
                status={
                  certificate?.status === CERTIFICATE_STATUS_ENUM.COMPLETED
                    ? 'Completed'
                    : 'Rejected'
                }
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
