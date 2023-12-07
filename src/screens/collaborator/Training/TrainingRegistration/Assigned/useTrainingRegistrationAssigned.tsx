import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../../type';
import { useAppDispatch } from '../../../../../app/store';
import { useAppSelector } from '../../../../../app/hooks';
import { getAllTrainingCertificateRegistration, getAllTrainingCertificateRegistration_Assigned } from '../../../../../features/collaborator/collab.certificateSlice';
import { TRAINING_CERTI_REGIS_STATUS_ENUM } from '../../../../../enums/collaborator/TrainingCertificateRegistrationStatus';

const useTrainingRegistrationAssigned = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const trainingCertificateRegistrationList = useAppSelector(
    (state) => state.collab_certificate.trainingCertificateRegistration_Assigned
  );
  const fetchTrainingCertificateRegistration = async () => {
    try {
      await dispatch(getAllTrainingCertificateRegistration_Assigned({Page: 1,
        PageSize: 1000,
        Sort: 'CreateAt',
        Order: 'DESCENDING',
        Status: TRAINING_CERTI_REGIS_STATUS_ENUM.ASSIGNED,})).then(
        (res) => {}
      );
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {}, []);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await fetchTrainingCertificateRegistration();
      };
      fetchData();
    }, [])
  );

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

export default useTrainingRegistrationAssigned;
