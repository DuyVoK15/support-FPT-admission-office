import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../../type';
import { useAppDispatch } from '../../../../../app/store';
import { useAppSelector } from '../../../../../app/hooks';
import {
  cancelTrainingCertificateRegistration,
  createCertificateRegistration,
  getAllTrainingCertificateRegistration,
  getAllTrainingCertificateRegistration_Pending,
} from '../../../../../features/collaborator/collab.certificateSlice';
import { TRAINING_CERTI_REGIS_STATUS_ENUM } from '../../../../../enums/collaborator/TrainingCertificateRegistrationStatus';
import useCustomToast from '../../../../../utils/toasts';
import { ROUTES } from '../../../../../constants/Routes';
import ErrorStatus from '../../../../../dtos/collaborator/response/errorStatus.dto';

const useTrainingRegistrationPending = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { showToastSuccess, showToastError } = useCustomToast();
  const trainingCertificateRegistrationList = useAppSelector(
    (state) => state.collab_certificate.trainingCertificateRegistration_Pending
  );
  const fetchTrainingCertificateRegistration = async () => {
    try {
      await dispatch(
        getAllTrainingCertificateRegistration_Pending({
          Page: 1,
          PageSize: 1000,
          Sort: 'CreateAt',
          Order: 'DESCENDING',
          Status: TRAINING_CERTI_REGIS_STATUS_ENUM.PENDING,
        })
      ).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelTrainingCertificateRegistration = async (
    certificateRegistrationId: number | null
  ) => {
    try {
      await dispatch(
        cancelTrainingCertificateRegistration({ certificateRegistrationId })
      ).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          showToastSuccess('Cancel success!');
          navigation.navigate(ROUTES.TRAINING_REGISTRATION_CANNCELED);
        } else {
          const resData = res?.payload as ErrorStatus;
          console.log(resData)
          showToastError(resData?.message);
        }
      });
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
  const handlers = { handleCancelTrainingCertificateRegistration };
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

export default useTrainingRegistrationPending;
