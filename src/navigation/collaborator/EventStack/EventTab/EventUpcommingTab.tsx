import {
  StyleSheet,
} from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import EventUpcomming from '../../../../screens/collaborator/Event/EventUpcomming/EventUpcomming';

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
