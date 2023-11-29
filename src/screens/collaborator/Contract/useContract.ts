import { View, Text, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import { getAllContract } from '../../../features/collaborator/collab.contractSlice';
import * as FileSystem from 'expo-file-system';
import FileViewer from 'react-native-file-viewer';
import useCustomToast from '../../../utils/toasts';
import { useAppSelector } from '../../../app/hooks';
import * as Sharing from 'expo-sharing';

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

  // const [downloadProgress, setDownloadProgress] = useState<number>();
  // const callback = (downloadProgress: any) => {
  //   const progress =
  //     downloadProgress.totalBytesWritten /
  //     downloadProgress.totalBytesExpectedToWrite;
  //   setDownloadProgress(progress);
  // };

  // const downloadResumable = FileSystem.createDownloadResumable(
  //   'https://firebasestorage.googleapis.com/v0/b/supfamof-c8c84.appspot.com/o/images%2Fadmission%2Fevent148ef32d-deea-4626-b872-cf3a8ac81e7d?alt=media&token=29978a67-a006-4b1c-9bd4-e934f7f8c1e1',
  //   FileSystem.documentDirectory + 'HAHA.doc',
  //   {},
  //   callback
  // );
  const downloadAndOpenFile = async (stringFile: string | null) => {
    console.log('downloading...');
    try {
      await FileSystem.createDownloadResumable(
        stringFile ?? '',
        FileSystem.documentDirectory + 'Contract.doc',
        {}
      )
        .downloadAsync()
        .then(async (res) => {
          const resData = res?.status;
          if (resData === 200) {
            showToastSuccess('Download file success!');
            Sharing.shareAsync(res?.uri ?? '').then((res) => {
              console.log(res)
            });
            
          } else {
            showToastError('Download file failed!');
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  const handlers = { downloadAndOpenFile, onRefresh };
  const props = {};
  const state = { refreshing };
  const stateRedux = { contractList };

  return {
    handlers,
    props,
    state,
    stateRedux,
  };
};

export default useIndex;
