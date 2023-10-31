import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../app/store';
import { getAllContract } from '../../../features/collaborator/collab.contractSlice';

const useIndex = () => {
  const dispatch = useAppDispatch();
  const handlers = {};
  const props = {};
  const state = {};

  const fetchContract = async () => {
    try {
      await dispatch(getAllContract()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContract();
  }, []);

  return {
    handlers,
    props,
    state,
  };
};

export default useIndex;
