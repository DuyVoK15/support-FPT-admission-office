import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../app/store';
import {
  createBankingInformation,
  getBankingInformation,
  updateBankingInformation,
} from '../../../features/collaborator/collab.bankingSlice';
import { ViewBankingResponse } from '../../../dtos/collaborator/response/viewBanking.dto';
import { useAppSelector } from '../../../app/hooks';
import CreateBankingParam from '../../../dtos/collaborator/parameter/createBanking.dto';
import useCustomToast from '../../../utils/toasts';
import ErrorStatus from '../../../dtos/collaborator/response/errorStatus.dto';

const useBanking = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { showToastSuccess, showToastError } = useCustomToast();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty, isSubmitted, isValidating, isValid, errors },
  } = useForm({});

  const bankingInformation = useAppSelector(
    (state) => state.collab_banking.bankingInformation
  );
  const isCreated = useAppSelector((state) => state.collab_banking.isCreated);
  const loading = useAppSelector((state) => state.collab_banking.loading);
  const loadingUpdate = useAppSelector(
    (state) => state.collab_banking.loadingUpdate
  );

  const fetchBankingInformation = async () => {
    try {
      await dispatch(getBankingInformation()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBankingInformation();
  }, []);

  useEffect(() => {
    if (bankingInformation) {
      console.log('voday');
      setValue('beneficiary', bankingInformation?.data?.beneficiary);
      setValue('accountNumber', bankingInformation?.data?.accountNumber);
      setValue('bankName', bankingInformation?.data?.bankName);
      setValue('branch', bankingInformation?.data?.branch);
      setIsDisable(true);
    } else {
      console.log('object');
      setValue('beneficiary', '');
      setValue('accountNumber', '');
      setValue('bankName', '');
      setValue('branch', '');
      setIsDisable(false);
    }
  }, [bankingInformation]);

  const onCreateBankingInformation = async (data: any) => {
    try {
      await dispatch(createBankingInformation(data)).then((res) => {
        console.log(JSON.stringify(res, null, 2));
        if (res?.meta?.requestStatus === 'fulfilled') {
          showToastSuccess('Create banking information success!');
        } else {
          const resData = res?.payload as ErrorStatus;
          showToastError(resData?.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateBankingInformation = async (data: any) => {
    try {
      await dispatch(updateBankingInformation(data)).then((res) => {
        console.log(JSON.stringify(res, null, 2));
        if (res?.meta?.requestStatus === 'fulfilled') {
          showToastSuccess('Update success!');
        } else {
          const resData = res?.payload as ErrorStatus;
          showToastError(resData?.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [isDisable, setIsDisable] = useState<boolean>(false);

  const handlers = {
    handleSubmit,
    onCreateBankingInformation,
    onUpdateBankingInformation,
    setValue,
  };
  const props = { navigation, control };
  const state = { isDisable };
  const setState = { setIsDisable };
  const stateRedux = { bankingInformation, isCreated, loading, loadingUpdate };
  return {
    handlers,
    props,
    state,
    setState,
    stateRedux,
  };
};

export default useBanking;
