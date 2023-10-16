import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { getAllCertificate } from '../../../../features/collaborator/collab.certificateSlice';
import { useAppSelector } from '../../../../app/hooks';

const useAllCertificate = () => {
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

  const props = { certificateList };
  const handlers = {};
  return {
    props,
    handlers,
  };
};

export default useAllCertificate;
