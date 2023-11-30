import { View, Text, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import { getAllContract } from '../../../features/collaborator/collab.contractSlice';
import * as FileSystem from 'expo-file-system';
import FileViewer from 'react-native-file-viewer';
import useCustomToast from '../../../utils/toasts';
import { useAppSelector } from '../../../app/hooks';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
const useIndex = () => {
  const dispatch = useAppDispatch();

  const contractList = useAppSelector(
    (state) => state.collab_contract.contract
  );
  const fetchContract = async () => {
    try {
      await dispatch(getAllContract({})).then((res) => {
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

  const { showToastSuccess, showToastError } = useCustomToast();

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
            console.log(res?.uri)
            showToastSuccess('Download file success!');
            Sharing.shareAsync(res?.uri).then((res) => {
              console.log(res);
            });
          } else {
            showToastError('Download file failed!');
          }
        })
        .catch((e) => console.log('e :',e));
    } catch (e) {
      console.log(e);
    }
  };

  const handlers = { downloadAndOpenFile, onRefresh };
  const props = {};
  const state = { refreshing };
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
