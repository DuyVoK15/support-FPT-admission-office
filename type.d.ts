import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeCollaboratorStackNavigatorParamList = {
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

export type HomeCollaboratorScreenNavigationProp = NativeStackScreenProps<
  HomeCollaboratorScreenNavigationProp,
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
