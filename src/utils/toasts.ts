import { useRef } from 'react';
import { Toast } from 'react-native-alert-notification';
import { useToast } from 'react-native-toast-notifications';

const useCustomToast = () => {
  const toast = useToast();
  const toastRef = useRef<any>();
  const showToastError = (message: string) => {
    toast.show(message, { type: 'danger' });
  };
  const showToastSuccess = (message: string) => {
    toast.show(message, { type: 'success' });
  };
  const showToastWarning = (message: string) => {
    toast.show(message, { type: 'warning' });
  };
  return { showToastError, showToastSuccess, showToastWarning, toastRef };
};
export default useCustomToast;
