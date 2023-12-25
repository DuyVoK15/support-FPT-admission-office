import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { getAllCertificate } from '../../../../features/collaborator/collab.certificateSlice';
import { useAppSelector } from '../../../../app/hooks';
import { useFocusEffect } from '@react-navigation/native';

const useAllCertificate = () => {
  const dispatch = useAppDispatch();
  const certificateList = useAppSelector(
    (state) => state.collab_certificate.certificate
  );
  const fetchCertificateData = async () => {
    await dispatch(
      getAllCertificate({
        Page: 1,
        PageSize: 100,
        Sort: 'CreateAt',
        Order: 'Descending',
      })
    ).then((res) => {
      // console.log(JSON.stringify(res, null, 2));
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

export default useAllCertificate;
