import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useAppDispatch } from '../../../../app/store';
import {
  createApplication,
  getAllApplication,
} from '../../../../features/collaborator/collab.applicationSlice';
import { useAppSelector } from '../../../../app/hooks';
import { DataApplication } from '../../../../models/collaborator/application.model';
import { TITLE_ENUM } from '../../../../components/shared/AwesomeAlert/ConfirmAlert';
import useCustomToast from '../../../../utils/toasts';
import ErrorStatus from '../../../../dtos/collaborator/response/errorStatus.dto';
import APPLICATION_STATUS_ENUM from '../../../../enums/collaborator/ApplicationStatus';

const useViewApplication = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { showToastSuccess, showToastError, toastRef } = useCustomToast();
  const [selectedStatus, setSelectedStatus] = useState<{status: number}>(
    {status: APPLICATION_STATUS_ENUM.PENDING}
  );

  const applicationList = useAppSelector(
    (state) => state.collab_application.application
  );
  const fetchApplication = async () => {
    try {
      await dispatch(
        getAllApplication({
          Page: 1,
          PageSize: 10000,
          Status: selectedStatus.status,
          Sort: 'ReportDate',
          Order: 'DESCENDING',
        })
      ).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };
console.log("tong", selectedStatus.status)
  useEffect(() => {
    fetchApplication();
  }, [selectedStatus]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    fetchApplication();
    setRefreshing(false);
  };

  const createOneApplication = async () => {
    try {
      await dispatch(createApplication({ problemNote })).then(async (res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          console.log(JSON.stringify(res, null, 2));
          setProblemNote('');
          setSelectedStatus({status: APPLICATION_STATUS_ENUM.PENDING});
          hideAlertHandler();
          hideModal();
          showToastSuccess('Send application successful!');
          await fetchApplication();
        } else {
          const resData = res?.payload as ErrorStatus;
          console.log(JSON.stringify(res, null, 2));
          showToastError(resData?.message ?? '404 Not Found');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [problemNote, setProblemNote] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  enum TYPE_BUTTON_ENUM {
    SEND_APPLICATION = 1,
  }

  type ConfirmInfo = {
    title: string | null;
    titleType?: number | null;
    message: string | null;
    typeButton: number | null;
  };
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [confirmInfo, setConfirmInfo] = useState<ConfirmInfo | null>(null);

  const showAlertHandler = (
    action?: number | null,
    item?: DataApplication | null
  ) => {
    switch (action) {
      case TYPE_BUTTON_ENUM.SEND_APPLICATION:
        setConfirmInfo({
          title: 'CONFIRMATION',
          titleType: TITLE_ENUM.WARNING,
          message: `Are you sure you want to send application?`,
          typeButton: TYPE_BUTTON_ENUM.SEND_APPLICATION,
        });
        break;
      default:
        setConfirmInfo({
          title: '',
          message: '',
          typeButton: 0,
        });
    }
    setShowAlert(true);
  };

  const hideAlertHandler = () => {
    setShowAlert(false);
  };

  const handlers = {
    onRefresh,
    showModal,
    hideModal,
    createOneApplication,
    showAlertHandler,
    hideAlertHandler,
  };
  const props = { navigation, TYPE_BUTTON_ENUM, toastRef };
  const state = {
    refreshing,
    problemNote,
    isVisible,
    showAlert,
    confirmInfo,
    selectedStatus,
  };
  const setState = { setRefreshing, setProblemNote, setSelectedStatus };
  const stateRedux = { applicationList };
  return {
    handlers,
    props,
    state,
    setState,
    stateRedux,
  };
};

export default useViewApplication;
