import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { getAllCertificate, getAllCertificate_Completed } from '../../../../features/collaborator/collab.certificateSlice';
import { useAppSelector } from '../../../../app/hooks';
import CERTIFICATE_STATUS_ENUM from '../../../../enums/collaborator/CertificateStatus';
import { useFocusEffect } from '@react-navigation/native';

const useCompletedCertificate = () => {
  const dispatch = useAppDispatch();
  const certificateList = useAppSelector(
    (state) => state.collab_certificate.certificateCompleted
  );
  const fetchCertificateData = async () => {
    await dispatch(
      getAllCertificate_Completed({
        Page: 1,
        PageSize: 100,
        Sort: 'CreateAt',
        Order: 'Descending',
        Status: CERTIFICATE_STATUS_ENUM.COMPLETED,
      })
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await fetchCertificateData();
      };
      fetchData();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCertificateData();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const state = { refreshing };
  const props = { certificateList };
  const handlers = { onRefresh };
  return {
    state,
    props,
    handlers,
  };
};

export default useCompletedCertificate;
