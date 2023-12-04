import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../type';
import { useAppDispatch } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import {
  createCertificateRegistration,
  getAllCertificateFromAdmission,
  getAllTrainingCertificateRegistration,
} from '../../features/collaborator/collab.certificateSlice';

const useTraining = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const certificateFromAdmissionList = useAppSelector(
    (state) => state.collab_certificate.certificateFromAdmission
  );
  const trainingCertificateRegistrationList = useAppSelector(
    (state) => state.collab_certificate.trainingCertificateRegistration
  );
  const fetchCertificateFromAdmission = async () => {
    try {
      await dispatch(getAllCertificateFromAdmission({})).then((res) => {});
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTrainingCertificateRegistration = async () => {
    try {
      await dispatch(getAllTrainingCertificateRegistration({})).then(
        (res) => {}
      );
    } catch (error) {
      console.log(error);
    }
  };
  const createTrainingCertificateRegistration = async (
    trainingCertificateId: number | null
  ) => {
    try {
      await dispatch(
        createCertificateRegistration({ trainingCertificateId })
      ).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCertificateFromAdmission();
      await fetchTrainingCertificateRegistration();
    };
    fetchData();
  }, []);
  const handlers = { createTrainingCertificateRegistration };
  const props = { navigation };
  const state = {};
  const setState = {};
  const stateRedux = {
    certificateFromAdmissionList,
    trainingCertificateRegistrationList,
  };
  return {
    handlers,
    props,
    state,
    setState,
    stateRedux,
  };
};

export default useTraining;
