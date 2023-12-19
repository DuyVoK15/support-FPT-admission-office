import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { useAppDispatch } from '../../../app/store';
import { collab_getCurrentAccountBanned } from '../../../features/collaborator/collab.accountSlice';

const useBannedPopup = () => {
  const dispatch = useAppDispatch();
  const currentAccountBanned = useAppSelector(
    (state) => state.collab_account.currentAccountBanned
  );
  const fetchCurrentAccountBanned = async () => {
    try {
      await dispatch(collab_getCurrentAccountBanned()).then((res) =>
        console.log(JSON.stringify(res, null, 2))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCurrentAccountBanned();
  }, []);
  const handlers = {};
  const props = {};
  const state = {};
  const setState = {};
  const stateRedux = { currentAccountBanned };
  return {
    handlers,
    props,
    state,
    setState,
    stateRedux,
  };
};

export default useBannedPopup;

const styles = StyleSheet.create({});
