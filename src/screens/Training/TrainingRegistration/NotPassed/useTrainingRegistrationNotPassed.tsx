import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useAppDispatch } from '../../../../app/store';
import { useAppSelector } from '../../../../app/hooks';
import { getAllTrainingCertificateRegistration } from '../../../../features/collaborator/collab.certificateSlice';

const useTrainingRegistrationNotPassed = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const trainingCertificateRegistrationList = useAppSelector(
    (state) => state.collab_certificate.trainingCertificateRegistration
  );
  const fetchTrainingCertificateRegistration = async () => {
    try {
      await dispatch(getAllTrainingCertificateRegistration({})).then(
        (res) => {}
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchTrainingCertificateRegistration();
    };
    fetchData();
  }, []);

  const handlers = {};
  const props = { navigation };
  const state = {};
  const setState = {};
  const stateRedux = { trainingCertificateRegistrationList };
  return {
    handlers,
    props,
    state,
    setState,
    stateRedux,
  };
};

export default useTrainingRegistrationNotPassed;
