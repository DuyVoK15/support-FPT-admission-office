import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeCollaboratorStackNavigatorParamList = {
  HOME: undefined;
  HOME_TAB: undefined;
  EVENTS: undefined;
  MAP: undefined;
  BOOKING: undefined;
  ACCOUNT: undefined;
  ACCOUNT_STACK_NAVIGATOR: undefined;
  EVENT: undefined;
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
  EVENTS,
  MAP,
  BOOKING,
  ACCOUNT,
  ACCOUNT_STACK_NAVIGATOR,
  EVENT,
  EVENT_DETAIL,
  PROFILE,
  PROFILE_SIGNUP,
  CERTIFICATE_HISTORY,
  WALLET,
  NOTIFICATION,
  VERIFICATION,
  POSITION_REGISTRATION,
  SECURITY,
  USER_PROFILE_DISABLE
>;
