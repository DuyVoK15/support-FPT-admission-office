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
import { DataCertificateAdmission } from '../../../models/collaborator/dataCertificateAdmission.model';

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
      ).then(async (res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          showToastSuccess('Registered success!');
          await fetchTrainingCertificateRegistration();
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

  enum TYPE_BUTTON_ENUM {
    REGISTER = 1,
    CANCEL = 2,
    CHECKIN = 3,
  }
  type ConfirmInfo = {
    title: string | null;
    message: string | null;
    typeButton: number | null;
  };
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [confirmInfo, setConfirmInfo] = useState<ConfirmInfo | null>(null);
  const [Item, setItem] = useState<DataCertificateAdmission | null>(null);
  const showAlertHandler = (
    action: number | null,
    item: DataCertificateAdmission | null
  ) => {
    switch (action) {
      case TYPE_BUTTON_ENUM.REGISTER:
        setConfirmInfo({
          title: 'CONFIRMATION',
          message: `Are you sure you want to REGISTER "${item?.certificateName}" training?`,
          typeButton: TYPE_BUTTON_ENUM.REGISTER,
        });
        break;
      default:
        setConfirmInfo({
          title: '',
          message: '',
          typeButton: 0,
        });
    }
    setItem(item);
    setShowAlert(true);
  };

  const hideAlertHandler = () => {
    setShowAlert(false);
  };

  const handlers = {
    createTrainingCertificateRegistration,
    onRefresh,
    showAlertHandler,
    hideAlertHandler,
  };
  const props = { navigation, TYPE_BUTTON_ENUM };
  const state = { refreshing, showAlert, confirmInfo, Item };
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
