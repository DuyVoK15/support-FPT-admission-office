import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { getAllCertificate } from '../../../../features/collaborator/collab.certificateSlice';
import { useAppSelector } from '../../../../app/hooks';

const useRejectedCertificate = () => {
  const dispatch = useAppDispatch();
  const certificateList = useAppSelector(
    (state) => state.collab_certificate.certificate
  );
  const fetchCertificateData = async () => {
    await dispatch(getAllCertificate()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  useEffect(() => {
    fetchCertificateData();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCertificateData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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

export default useRejectedCertificate;
