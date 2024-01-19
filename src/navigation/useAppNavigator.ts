import { View, Text, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import usePushNotifications from '../../usePushNotifications';
import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/store';
import {
  admission_getUserInfo,
  collab_getUserInfo,
  collab_loadAuthState,
  collab_logout,
  collab_reloadGetUserInfo,
  resetUserLoading,
} from '../features/collaborator/collab.authSlice';
import LoadAuthStateResponse from '../dtos/collaborator/response/loadAuthState.dto';
import RoleIdEnum from '../enums/shared/RoleIdEnum';
import ErrorStatus from '../dtos/collaborator/response/errorStatus.dto';
import useCustomToast from '../utils/toasts';

const useAppNavigator = () => {
  const dispatch = useAppDispatch();
  const { showToastWarning } = useCustomToast();
  const collab_isAuthenticated = useAppSelector(
    (state) => state.collab_auth.isAuthenticated
  );
  const collab_userInfo = useAppSelector((state) => state.collab_auth.userInfo);

  const collab_userInfoSignup = useAppSelector(
    (state) => state.collab_account.userInfoSignup
  );

  const collab_isUserLoading = useAppSelector(
    (state) => state.collab_auth.user_loading
  );

  const collab_isAuthLoading = useAppSelector(
    (state) => state.collab_auth.auth_loading
  );

  const collab_isLoadAuthStateLoading = useAppSelector(
    (state) => state.collab_auth.load_auth_state_loading
  );

  const collab_isSignupAccountInfo = useAppSelector(
    (state) => state.collab_account.loading_signup_accinfo
  );

  const roleId = useAppSelector((state) => state.collab_auth.role);

  const handleLogout = async () => {
    await dispatch(collab_logout()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  const checkIsKeepLoggedIn = async () => {
    try {
      await dispatch(collab_loadAuthState()).then(async (res) => {
        // console.log(JSON.stringify(res, null, 2));
        const data = res.payload as LoadAuthStateResponse;
        const combinedCondition: string =
          data.isAuthenticated + '-' + data.roleId;
        console.log(combinedCondition);
        switch (combinedCondition) {
          case 'true-1':
            {
              await dispatch(admission_getUserInfo());
            }
            break;
          case 'true-2':
            {
              await dispatch(collab_getUserInfo()).then((res) => {
                if (res?.meta?.requestStatus === 'rejected') {
                  const resData = res?.payload as ErrorStatus;
                  switch (resData?.errorCode) {
                    case 4011:
                      showToastWarning('Login session has expired! Try login again!');
                      handleLogout();
                    default:
                      console.log('error');
                  }
                }
                console.log(JSON.stringify(res, null, 2));
              });
            }
            break;
          default:
            {
              await dispatch(resetUserLoading());
            }
            break;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIsKeepLoggedIn();
  }, []);

  const getUserInfoWhenAccountInfomationChange = async () => {
    await dispatch(collab_reloadGetUserInfo());
  };
  useEffect(() => {
    if (collab_isAuthenticated && roleId === RoleIdEnum.COLLAB_ROLE) {
      getUserInfoWhenAccountInfomationChange();
    }
  }, [collab_userInfoSignup]);

  if (Platform.OS !== 'ios') {
    const {} = usePushNotifications();
  }

  const handlers = {};
  const state = {
    collab_isAuthenticated,
    collab_userInfo,
    collab_userInfoSignup,
    collab_isUserLoading,
    collab_isAuthLoading,
    collab_isSignupAccountInfo,
    collab_isLoadAuthStateLoading,
    roleId,
  };
  const setState = {};
  const props = {};
  return { handlers, state, props, setState };
};

export default useAppNavigator;
