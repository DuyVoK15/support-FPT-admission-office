import {
  Animated,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CertificateCard from '../../../../components/collaborator/Certificate/CertificateCard';
import { format_ISODateString_To_DDMMYYYY } from '../../../../utils/formats';
import CERTIFICATE_STATUS_ENUM from '../../../../enums/collaborator/CertificateStatus';
import RegistrationEmpty from '../../../../components/shared/Empty/RegistrationEmpty';
import { CertificateData } from '../../../../models/collaborator/certificate.model';
import { useRoute } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { SHADOWS } from '../../../../constants/Shadows';
import { COLORS } from '../../../../constants/Colors';
import { ScreenWidth } from '../../../../constants/Demesions';
import useRejectedCertificate from './useCertificateRejected';

const Certificate_Rejected_Status = () => {
  const { state, props, handlers } = useRejectedCertificate();

  const renderEmptyComponent = () => {
    return <RegistrationEmpty />;
  };
  const renderItem = ({ item }: { item: CertificateData }) => {
    return (
      <View style={[styles.containerItem]}>
        <CertificateCard
          dateReceive={
            item?.createAt
              ? format_ISODateString_To_DDMMYYYY(item?.createAt)
                ? format_ISODateString_To_DDMMYYYY(item?.createAt)
                : 'No date'
              : 'No date'
          }
          certificateID={
            item?.id ? 'ID: ' + String(item?.trainingCertificate?.id) : 'No value'
          }
          certificateName={
            item?.trainingCertificate?.certificateName
              ? item?.trainingCertificate?.certificateName
              : 'No value'
          }
          confirmBy={
            item?.certificateIssuer?.name
              ? item?.certificateIssuer?.name
              : 'Automatic System'
          }
          status={
            item?.status === CERTIFICATE_STATUS_ENUM.COMPLETED
              ? 'Completed'
              : 'Rejected'
          }
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={props.certificateList?.data}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={handlers.onRefresh}
            />
          }
          ListEmptyComponent={renderEmptyComponent}
        />
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
  containerItem: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    ...SHADOWS.SHADOW_06
  },
});
