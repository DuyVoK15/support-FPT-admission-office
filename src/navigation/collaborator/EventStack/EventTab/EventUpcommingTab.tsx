import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useAppDispatch } from '../../../../app/store';
import {
  getAllPost,
  searchPostByPostCode,
} from '../../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../../app/hooks';
import { Data } from '../../../../models/collaborator/dataPost.model';
import { cardGap } from '../../../../constants/Demesions';
import { format_ISODateString_To_DayOfWeekMonthDDYYYY } from '../../../../utils/formats';
import EventCardWrap from '../../../../components/collaborator/Home/EventCardWrap';
import EventUpcomming from '../../../../screens/collaborator/Event/EventUpcomming';

const EventUpcommingTab: FC = () => {
  return (
    <EventUpcomming />
  );
};

export default EventUpcommingTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
