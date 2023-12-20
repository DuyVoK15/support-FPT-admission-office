import { View, Text, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import {
  getAllContract,
  updateContract,
} from '../../../features/collaborator/collab.contractSlice';
import * as FileSystem from 'expo-file-system';
import FileViewer from 'react-native-file-viewer';
import useCustomToast from '../../../utils/toasts';
import { useAppSelector } from '../../../app/hooks';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { DataTrainingCertificateRegistration } from '../../../models/collaborator/dataTrainingCertificateRegistration';
import { DataContract } from '../../../models/collaborator/contract.model';
import ErrorStatus from '../../../dtos/collaborator/response/errorStatus.dto';
import { CONTRACT_STATUS_ENUM } from '../../../enums/collaborator/ContractStatus.';
import { ROUTES } from '../../../constants/Routes';
const useIndex = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { showToastSuccess, showToastError } = useCustomToast();

  const contractList = useAppSelector(
    (state) => state.collab_contract.contract
  );
  const fetchContract = async () => {
    try {
      await dispatch(
        getAllContract({
          Page: 1,
          PageSize: 10000,
          Sort: 'CreateAt',
          Order: 'DESCENDING',
        })
      ).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContract();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchContract();
    setRefreshing(false);
  }, []);

  const downloadAndOpenFile = async (stringFile: string) => {
    console.log('downloading...');
    try {
      await FileSystem.downloadAsync(
        stringFile,
        FileSystem.documentDirectory + 'Contract.doc',
        {}
      )
        .then((res) => {
          const resData = res?.status;
          if (resData === 200) {
            console.log(res?.uri);
            showToastSuccess('Download file success!');
            Sharing.shareAsync(res?.uri).then((res) => {
              console.log(res);
            });
          } else {
            showToastError('Download file failed!');
          }
        })
        .catch((e) => console.log('e :', e));
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateContract = async (
    accountContractId: number | null,
    status: number | null
  ) => {
    try {
      await dispatch(updateContract({ accountContractId, status })).then(
        (res) => {
          console.log(JSON.stringify(res, null, 2));
          if (res?.meta?.requestStatus === 'fulfilled') {
            showToastSuccess('Update contract successful!');
            fetchContract();
          } else {
            const resData = res?.payload as ErrorStatus;
            switch (resData?.errorCode) {
              case 4005:
                showAlertHandler(TYPE_BUTTON_ENUM.NAVIGATE_TO_BANKING, null);
                break;
              default:
                showToastError(resData?.message);
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  enum TYPE_BUTTON_ENUM {
    APPROVE = 1,
    REJECT = 2,
    NAVIGATE_TO_BANKING = 3,
  }
  type ConfirmInfo = {
    title: string | null;
    message: string | null;
    typeButton: number | null;
  };
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [confirmInfo, setConfirmInfo] = useState<ConfirmInfo | null>(null);
  const [Item, setItem] = useState<DataContract | null>(null);
  const showAlertHandler = (
    action: number | null,
    item: DataContract | null
  ) => {
    switch (action) {
      case TYPE_BUTTON_ENUM.APPROVE:
        setConfirmInfo({
          title: 'CONFIRMATION',
          message: `Are you sure you want to APPROVE "${item?.contract?.contractName}" with ID "${item?.contract?.id}"?`,
          typeButton: TYPE_BUTTON_ENUM.APPROVE,
        });
        break;
      case TYPE_BUTTON_ENUM.REJECT:
        setConfirmInfo({
          title: 'CONFIRMATION',
          message: `Are you sure you want to REJECT "${item?.contract?.contractName}" with ID "${item?.contract?.id}"?`,
          typeButton: TYPE_BUTTON_ENUM.REJECT,
        });
        break;
      case TYPE_BUTTON_ENUM.NAVIGATE_TO_BANKING:
        setConfirmInfo({
          title: 'WARNING',
          message: `You mising account banking information, let's create a banking information!`,
          typeButton: TYPE_BUTTON_ENUM.NAVIGATE_TO_BANKING,
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

  const handleConfirm = () => {
    switch (confirmInfo?.typeButton) {
      case TYPE_BUTTON_ENUM.APPROVE:
        console.log(Item?.id);
        handleUpdateContract(Item?.id ?? null, CONTRACT_STATUS_ENUM.APRROVED);
        break;
      case TYPE_BUTTON_ENUM.REJECT:
        console.log(Item?.id);
        handleUpdateContract(Item?.id ?? null, CONTRACT_STATUS_ENUM.REJECTED);

        break;
      case TYPE_BUTTON_ENUM.NAVIGATE_TO_BANKING:
        console.log(Item?.id);
        navigation.navigate(ROUTES.BANKING);

        break;
      default:
        console.log('Type Button Null');
    }
    hideAlertHandler();
  };
  const handlers = {
    downloadAndOpenFile,
    onRefresh,
    showAlertHandler,
    hideAlertHandler,
    handleUpdateContract,
    handleConfirm,
  };

  const props = { navigation, TYPE_BUTTON_ENUM };
  const state = { refreshing, showAlert, confirmInfo, Item };
  const setState = {};
  const stateRedux = { contractList };

  return {
    handlers,
    props,
    state,
    stateRedux,
  };
};

export default useIndex;
