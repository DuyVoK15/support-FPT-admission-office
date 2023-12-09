import { View, Text, useWindowDimensions } from 'react-native';
import React, { useEffect } from 'react';
import { ROUTES } from '../../../../constants/Routes';
import { DataPost } from '../../../../models/collaborator/dataPost.model';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useAppDispatch } from '../../../../app/store';
import { getPostById } from '../../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../../app/hooks';
import RegistrationEmpty from '../../../../components/shared/Empty/RegistrationEmpty';

const useHomeDetail = () => {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
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
        if (res?.meta?.requestStatus === 'rejected') {
          navigation.goBack();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, []);
  const handlers = { handleNavigate };
  const props = { navigation, width };
  const state = {};
  const setState = {};
  const stateRedux = { item, loading };
  return {
    handlers,
    props,
    state,
    setState,
    stateRedux,
  };
};

export default useHomeDetail;
