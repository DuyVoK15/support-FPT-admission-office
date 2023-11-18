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
import collab_complaintReducer from '../features/collaborator/collab.complaintSlice';
import collab_checkAttendanceReducer from '../features/collaborator/collab.checkAttendanceSlice';
import collab_notificationReducer from '../features/collaborator/collab.notificationSlice';


import admission_authReducer from '../features/admission/admission.authSlice';

export const store = configureStore({
  reducer: {
    collab_auth: collab_authReducer,
    collab_post: collab_postReducer,
    collab_account: collab_accountReducer,
    collab_postRegistration: collab_postRegistrationReducer,
    collab_certificate: collab_certificateReducer,
    collab_contract: collab_contractReducer,
    collab_report: collab_reportReducer,
    collab_complaint: collab_complaintReducer,
    collab_checkAttendance: collab_checkAttendanceReducer,
    collab_notification: collab_notificationReducer,
    // Thêm reducers khác nếu cần thiết
    admission_auth: admission_authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
