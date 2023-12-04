import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeCollaboratorStackNavigatorParamList = {
  HOME: undefined;
  HOME_TAB: undefined;
  HOME_STACK_NAVIGATOR: undefined;
  HOME_EVENT_DETAIL: undefined;
  MAP: undefined;
  MAP_STACK_NAVIGATOR: undefined;
  REGISTRATION: undefined;
  REGISTRATION_PENDING: undefined;
  REGISTRATION_PENDING_DETAIL: undefined;
  REQUEST_CHANGE_POSITION_PENDING: undefined;
  REGISTRATION_CONFIRM: undefined;
  REGISTRATION_CONFIRM_DETAIL: undefined;
  REQUEST_CHANGE_POSITION_CONFIRM: undefined;
  REQUEST_UPDATE_HISTORY: undefined;
  REGISTRATION_COMPLETED: undefined;
  REGISTRATION_CANCELLED: undefined;
  REGISTRATION_REJECTED: undefined;
  REGISTRATION_STACK_NAVIGATOR: undefined;
  ACCOUNT: undefined;
  ACCOUNT_STACK_NAVIGATOR: undefined;
  EVENT: undefined;
  EVENT_TAB: undefined;
  EVENT_STACK_NAVIGATOR: undefined;
  EVENT_DETAIL: undefined;
  EVENT_UPCOMMING: undefined;
  EVENT_MISSING_SLOT: undefined;
  EVENT_REOPEN: undefined;
  TRAINING: undefined;
  TRAINING_TAB: undefined;
  TRAINING_STACK_NAVIGATOR: undefined;
  TRAINING_REGISTRATION: undefined;
  USER_PROFILE: undefined;
  USER_PROFILE_SIGNUP: undefined;
  CERTIFICATE_HISTORY: undefined;
  CERTIFICATE_ALL: undefined;
  CERTIFICATE_COMPLETED: undefined;
  CERTIFICATE_REJECTED: undefined;
  WALLET: undefined;
  CONTRACT: undefined;
  ACCOUNT_NOTIFICATION: undefined;
  EVENT_NOTIFICATION: undefined;
  HOME_NOTIFICATION: undefined;
  VERIFICATION: undefined;
  POSITION_REGISTRATION: undefined;
  SECURITY: undefined;
  USER_PROFILE_DISABLE: undefined;
  APPLICATION: undefined;
  SCAN_FRONT_IMAGE: undefined;
  SCAN_BACK_IMAGE: undefined;
  ACCOUNT_INFORMATION_CREATION: undefined;
};

export type HomeCollaboratorScreenNavigationProp = NativeStackScreenProps<
  HomeCollaboratorStackNavigatorParamList,
  'HOME',
  'HOME_TAB',
  'HOME_STACK_NAVIGATOR',
  'POSITION_REGISTRATION',
  'EVENT',
  'EVENT_TAB',
  'EVENT_STACK_NAVIGATOR',
  'EVENT_DETAIL',
  'EVENT_UPCOMMING',
  'EVENT_MISSING_SLOT',
  'EVENT_REOPEN',
  'TRAINING',
  'TRAINING_TAB',
  'TRAINING_STACK_NAVIGATOR',
  'TRAINING_REGISTRATION',
  'MAP',
  'MAP_STACK_NAVIGATOR',
  'REGISTRATION',
  'REGISTRATION_PENDING',
  'REGISTRATION_PENDING_DETAIL',
  'REQUEST_CHANGE_POSITION_PENDING',
  'REGISTRATION_CONFIRM',
  'REGISTRATION_CONFIRM_DETAIL',
  'REQUEST_CHANGE_POSITION_CONFIRM',
  'REQUEST_UPDATE_HISTORY',
  'REGISTRATION_COMPLETED',
  'REGISTRATION_CANCELLED',
  'REGISTRATION_REJECTED',
  'REGISTRATION_STACK_NAVIGATOR',
  'ACCOUNT',
  'ACCOUNT_STACK_NAVIGATOR',
  'USER_PROFILE',
  'USER_PROFILE_SIGNUP',
  'CERTIFICATE_HISTORY',
  'CERTIFICATE_ALL',
  'CERTIFICATE_COMPLETED',
  'CERTIFICATE_REJECTED',
  'WALLET',
  'CONTRACT',
  'ACCOUNT_NOTIFICATION',
  'EVENT_NOTIFICATION',
  'HOME_NOTIFICATION',
  'VERIFICATION',
  'SECURITY',
  'USER_PROFILE_DISABLE',
  'APPLICATION',
  'SCAN_FRONT_IMAGE',
  'SCAN_BACK_IMAGE',
  'ACCOUNT_INFORMATION_CREATION'
>;

export type HomeAdmissionStackNavigatorParamList = {
  HOME: undefined;
  HOME_TAB: undefined;
  HOME_STACK_NAVIGATOR: undefined;
  MAP: undefined;
  MAP_STACK_NAVIGATOR: undefined;
  BOOKING: undefined;
  BOOKING_STACK_NAVIGATOR: undefined;
  ACCOUNT: undefined;
  ACCOUNT_STACK_NAVIGATOR: undefined;
  EVENT: undefined;
  EVENT_STACK_NAVIGATOR: undefined;
  EVENT_DETAIL: undefined;
  PROFILE: undefined;
  PROFILE_SIGNUP: undefined;
  CERTIFICATE_HISTORY: undefined;
  WALLET: undefined;
  NOTIFICATION: undefined;
  VERIFICATION: undefined;
  POSITION_REGISTRATION: undefined;
  SECURITY: undefined;
  USER_PROFILE_DISABLE: undefined;
};

export type HomeAdmissionScreenNavigationProp = NativeStackScreenProps<
  HomeAdmissionScreenNavigationProp,
  HOME,
  HOME_TAB,
  HOME_STACK_NAVIGATOR,
  POSITION_REGISTRATION,
  EVENT,
  EVENT_STACK_NAVIGATOR,
  EVENT_DETAIL,
  MAP,
  MAP_STACK_NAVIGATOR,
  BOOKING,
  BOOKING_STACK_NAVIGATOR,
  ACCOUNT,
  ACCOUNT_STACK_NAVIGATOR,
  PROFILE,
  PROFILE_SIGNUP,
  CERTIFICATE_HISTORY,
  WALLET,
  NOTIFICATION,
  VERIFICATION,
  SECURITY,
  USER_PROFILE_DISABLE
>;
