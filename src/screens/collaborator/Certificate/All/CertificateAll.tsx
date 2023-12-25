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
import useAllCertificate from './useCertificateAll';
import { format_ISODateString_To_DDMMYYYY } from '../../../../utils/formats';
import CERTIFICATE_STATUS_ENUM from '../../../../enums/collaborator/CertificateStatus';
import RegistrationEmpty from '../../../../components/shared/Empty/RegistrationEmpty';
import { CertificateData } from '../../../../models/collaborator/certificate.model';
import { useRoute } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { SHADOWS } from '../../../../constants/Shadows';
import { COLORS } from '../../../../constants/Colors';
import { ScreenWidth } from '../../../../constants/Demesions';

const Certificate_All_Status = () => {
  const { state, props, handlers } = useAllCertificate();
  const flatListRef = useRef<FlatList>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const route = useRoute<HomeCollaboratorScreenNavigationProp>();
  const [shadowColor, setShadowColor] = useState('#000');

  const scrollToIndex = (_index: number) => {
    setTimeout(() => {
      if (flatListRef.current)
        flatListRef.current.scrollToIndex({
          index: _index !== -1 ? _index : 0,
          animated: true,
          viewPosition: 0.5,
        });
    }, 100);
  };
  const animationAfterScroll = () => {
    setTimeout(() => {
      setShadowColor(COLORS?.orange_button);
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
    setTimeout(() => {
      setShadowColor('#000');
    }, 2500);
  };
  useEffect(() => {
    // Validate route.params and productId
    if (
      props.certificateList?.data &&
      props.certificateList?.data?.length > 0
    ) {
      const certificateId = route.params?.certificateId;
      const _index = props.certificateList?.data.findIndex(
        (item) => item?.trainingCertificate?.id === certificateId
      ); // return number | -1

      if (flatListRef.current) {
        scrollToIndex(_index);
        animationAfterScroll();
      }
    }
  }, [route.params]);

  const zoomStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.05],
        }),
      },
    ],
  };
  const renderEmptyComponent = () => {
    return <RegistrationEmpty />;
  };
  const renderItem = ({ item }: { item: CertificateData }) => {
    return (
      <Animated.View
        style={[
          styles.containerItem,
          item.trainingCertificate?.id === route.params?.certificateId
            ? zoomStyle
            : null,
          {
            shadowColor:
              item.trainingCertificate?.id === route.params?.certificateId
                ? shadowColor
                : '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
          },
        ]}
      >
        <CertificateCard
          dateReceive={
            item?.createAt
              ? format_ISODateString_To_DDMMYYYY(item?.createAt)
                ? format_ISODateString_To_DDMMYYYY(item?.createAt)
                : 'No date'
              : 'No date'
          }
          certificateID={
            item?.id ? String(item?.trainingCertificate?.id) : 'No value'
          }
          certificateName={
            item?.trainingCertificate?.certificateName
              ? item?.trainingCertificate?.certificateName
              : 'No value'
          }
          confirmBy={
            item?.certificateIssuer?.name
              ? item?.certificateIssuer?.name
              : 'System'
          }
          status={
            item?.status === CERTIFICATE_STATUS_ENUM.COMPLETED
              ? 'Completed'
              : 'Rejected'
          }
        />
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={props.certificateList?.data}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={handlers.onRefresh}
            />
          }
          ListEmptyComponent={renderEmptyComponent}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        />
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
  containerItem: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
