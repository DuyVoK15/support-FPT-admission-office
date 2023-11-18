import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { useAppDispatch } from '../../../../app/store';
import { RegistrationStatus } from '../../../../enums/collaborator/RegistrationStatus';
import {
  getAllPostRegistration,
  getAllPostRegistration_Pending,
} from '../../../../features/collaborator/collab.postRegistrationSlice';

const useIndex = () => {
  const dispatch = useAppDispatch();
  const postRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistrationPending
  );
  const fetchPostRegistration = async () => {
    await dispatch(
      getAllPostRegistration_Pending({
        RegistrationStatus: [RegistrationStatus.PENDING],
      })
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  useEffect(() => {
    fetchPostRegistration();
  }, []);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPostRegistration();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlers = { onRefresh };
  const state = { refreshing };
  const props = { postRegistrationList };

  return {
    handlers,
    state,
    props,
  };
};

export default useIndex;
