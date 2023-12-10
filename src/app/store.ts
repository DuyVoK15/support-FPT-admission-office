// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import collab_authReducer from '../features/collaborator/collab.authSlice';
import collab_postReducer from '../features/collaborator/collab.postSlice';
import collab_postRegistrationReducer from '../features/collaborator/collab.postRegistrationSlice';
import collab_accountReducer from '../features/collaborator/collab.accountSlice';
import collab_certificateReducer from '../features/collaborator/collab.certificateSlice';
import collab_contractReducer from '../features/collaborator/collab.contractSlice';
import collab_reportReducer from '../features/collaborator/collab.reportSlice';
import collab_applicationReducer from '../features/collaborator/collab.applicationSlice';
import collab_checkAttendanceReducer from '../features/collaborator/collab.checkAttendanceSlice';
import collab_notificationReducer from '../features/collaborator/collab.notificationSlice';
import collab_informationReducer from '../features/collaborator/collab.scanIDRecognitionSlice';
import collab_bankingReducer from '../features/collaborator/collab.bankingSlice';

import admission_authReducer from '../features/admission/admission.authSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
      serializableCheck: false, // If you want to disable serializableCheck as well
    });
  },
  reducer: {
    collab_auth: collab_authReducer,
    collab_post: collab_postReducer,
    collab_account: collab_accountReducer,
    collab_postRegistration: collab_postRegistrationReducer,
    collab_certificate: collab_certificateReducer,
    collab_contract: collab_contractReducer,
    collab_report: collab_reportReducer,
    collab_application: collab_applicationReducer,
    collab_checkAttendance: collab_checkAttendanceReducer,
    collab_notification: collab_notificationReducer,
    collan_information: collab_informationReducer,
    collab_banking: collab_bankingReducer,
    // Thêm reducers khác nếu cần thiết
    admission_auth: admission_authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
