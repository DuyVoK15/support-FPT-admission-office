import { View, Text, useWindowDimensions } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { DataPost } from '../../../models/collaborator/dataPost.model';
import { ROUTES } from '../../../constants/Routes';
import { useAppSelector } from '../../../app/hooks';
import { getPostById } from '../../../features/collaborator/collab.postSlice';
import ErrorStatus from '../../../dtos/collaborator/response/errorStatus.dto';
import { createPostRegistration } from '../../../features/collaborator/collab.postRegistrationSlice';
import CreatePostRegistrationParam from '../../../dtos/collaborator/parameter/createPostRegistration.dto';
import { DataPosition } from '../../../models/collaborator/dataPosition.model';
import useCustomToast from '../../../utils/toasts';
import { TITLE_ENUM } from '../../../components/shared/AwesomeAlert/ConfirmAlert';
import { collab_getCurrentAccountBanned } from '../../../features/collaborator/collab.accountSlice';

const usePositionRegistration = () => {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const [isVisibleBannedPopup, setIsVisibleBannedPopup] =
    useState<boolean>(false);
  const showBannedPopup = () => setIsVisibleBannedPopup(true);
  const hideBannedPopup = () => setIsVisibleBannedPopup(false);
  const currentAccountBanned = useAppSelector(
    (state) => state.collab_account.currentAccountBanned
  );
  // Get item data from
  const route = useRoute();
  const { post } = route?.params as { post: DataPost };
  const handleNavigate = (post: DataPost | null) => {
    navigation.navigate(ROUTES.POSITION_REGISTRATION, { post });
  };
  const item = useAppSelector((state) => state.collab_post.postById);
  const loading = useAppSelector((state) => state.collab_post.loading);
  const fetchPostById = async () => {
    try {
      await dispatch(getPostById({ postId: post?.id })).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, []);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchPostById();
    setTimeout(() => {
      setRefreshing(false);
    }, 0);
  }, []);

  enum TYPE_BUTTON_ENUM {
    REGISTER = 1,
    NAVIGATE_TO_CERTIFICATE = 2,
    NAVIGATE_TO_REGISTRATION = 3,
  }

  type ConfirmInfo = {
    title: string | null;
    titleType?: number | null;
    message: string | null;
    typeButton: number | null;
  };
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [confirmInfo, setConfirmInfo] = useState<ConfirmInfo | null>(null);
  const [Item, setItem] = useState<DataPosition | null>(null);
  const showAlertHandler = (
    action: number | null,
    item: DataPosition | null
  ) => {
    switch (action) {
      case TYPE_BUTTON_ENUM.REGISTER:
        setConfirmInfo({
          title: 'CONFIRMATION',
          titleType: TITLE_ENUM.WARNING,
          message: `Are you sure you want to apply for "${item?.positionName}" position?`,
          typeButton: TYPE_BUTTON_ENUM.REGISTER,
        });

        break;
      case TYPE_BUTTON_ENUM.NAVIGATE_TO_CERTIFICATE:
        setConfirmInfo({
          title: 'CONFIRMATION',
          titleType: TITLE_ENUM.WARNING,
          message: `You need Certificate "${item?.certificateName}" for this position? View Training NOW?`,
          typeButton: TYPE_BUTTON_ENUM.NAVIGATE_TO_CERTIFICATE,
        });
        break;
      case TYPE_BUTTON_ENUM.NAVIGATE_TO_REGISTRATION:
        setConfirmInfo({
          title: 'SUCCESSFUL',
          titleType: TITLE_ENUM.SUCCESS,
          message: 'Register successful. View your Registration NOW!',
          typeButton: TYPE_BUTTON_ENUM.NAVIGATE_TO_REGISTRATION,
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

  const [isSelectedBusOption, setIsSelectedBusOption] = useState(
    Array(post?.postPositions.length).fill(false)
  );

  const selectedBusOption = (index: number) => {
    const updatedStatus = [...isSelectedBusOption];
    updatedStatus[index] = !updatedStatus[index];
    console.log(updatedStatus);
    setIsSelectedBusOption(updatedStatus);
  };

  const { showToastError, showToastSuccess } = useCustomToast();

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (
    position: DataPosition | null,
    schoolBusOption?: boolean
  ) => {
    try {
      const params = {
        schoolBusOption,
        positionId: position?.id,
      } as CreatePostRegistrationParam;
      await dispatch(createPostRegistration(params))
        .then(async (res) => {
          const requestStatus = res?.meta?.requestStatus;
          console.log(JSON.stringify(res, null, 2));
          if (requestStatus === 'fulfilled') {
            showToastSuccess('Register successfully!');
            showAlertHandler(
              TYPE_BUTTON_ENUM.NAVIGATE_TO_REGISTRATION,
              position
            );
          } else {
            const resRejectedData = res.payload as ErrorStatus;

            switch (resRejectedData?.errorCode) {
              case 4012:
                showAlertHandler(
                  TYPE_BUTTON_ENUM.NAVIGATE_TO_CERTIFICATE,
                  position
                );
                break;

              case 4024:
                showToastError(
                  'You have applied for a position that overlaps with this position'
                );
                break;
              case 4026:
                await dispatch(collab_getCurrentAccountBanned()).then((res) =>
                  console.log(JSON.stringify(res, null, 2))
                );
                showBannedPopup();
                break;
              default:
                showToastError(resRejectedData?.message);
            }
          }
        })
        .catch((error) => {
          hideAlertHandler();
          console.log(error);
        });
    } catch (error) {
      hideAlertHandler();
      console.log(error);
    }
  };

  const [positionId, setPosisitionId] = useState<number | null>(null);
  const handleSetPositionId = (id: number | null) => {
    if (positionId !== id) {
      setPosisitionId(id);
    } else {
      setPosisitionId(null);
    }
  };

  const handlers = {
    handleNavigate,
    showAlertHandler,
    hideAlertHandler,
    handleSetPositionId,
    handleSubmit,
    selectedBusOption,
    onRefresh,
    showBannedPopup,
    hideBannedPopup,
  };
  const props = { navigation, width, TYPE_BUTTON_ENUM };
  const state = {
    showAlert,
    confirmInfo,
    positionId,
    isSelectedBusOption,
    refreshing,
    Item,
    isVisibleBannedPopup
  };
  const setState = { setPosisitionId, selectedBusOption };
  const stateRedux = { item, loading, currentAccountBanned };
  return {
    handlers,
    props,
    state,
    setState,
    stateRedux,
  };
};

export default usePositionRegistration;
