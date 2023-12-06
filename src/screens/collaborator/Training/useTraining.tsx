import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { useAppDispatch } from '../../../app/store';
import { useAppSelector } from '../../../app/hooks';
import {
  createCertificateRegistration,
  getAllCertificate,
  getAllCertificateFromAdmission,
  getAllTrainingCertificateRegistration,
} from '../../../features/collaborator/collab.certificateSlice';
import useCustomToast from '../../../utils/toasts';
import ErrorStatus from '../../../dtos/collaborator/response/errorStatus.dto';

const useTraining = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { showToastSuccess, showToastError } = useCustomToast();
  const certificateList = useAppSelector(
    (state) => state.collab_certificate.certificate
  );
  const certificateFromAdmissionList = useAppSelector(
    (state) => state.collab_certificate.certificateFromAdmission
  );
  const trainingCertificateRegistrationList = useAppSelector(
    (state) => state.collab_certificate.trainingCertificateRegistration
  );
  const fetchAllCertificate = async () => {
    try {
      await dispatch(getAllCertificate({})).then((res) => {});
    } catch (error) {
      console.log(error);
    }
  };
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
        if (res?.meta?.requestStatus === 'fulfilled') {
          showToastSuccess('Registered success!');
        } else {
          const resData = res?.payload as ErrorStatus;
          showToastError(resData?.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllCertificate();
      await fetchCertificateFromAdmission();
      await fetchTrainingCertificateRegistration();
    };
    fetchData();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const fetchData = async () => {
      await fetchAllCertificate();
      await fetchCertificateFromAdmission();
      await fetchTrainingCertificateRegistration();
    };
    fetchData();
    setRefreshing(false);
  }, []);
  const handlers = { createTrainingCertificateRegistration, onRefresh };
  const props = { navigation };
  const state = { refreshing };
  const setState = {};
  const stateRedux = {
    certificateList,
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
