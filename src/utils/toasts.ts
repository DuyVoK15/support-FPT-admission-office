import { useToast } from 'react-native-toast-notifications';

const useCustomToast = () => {
  const toast = useToast();
  const showToastError = (message: string) => {
    toast.show(message, { type: 'danger' });
  };
  const showToastSuccess = (message: string) => {
    toast.show(message, { type: 'success' });
  };
  const showToastWarning = (message: string) => {
    toast.show(message, { type: 'warning' });
  };
  return { showToastError, showToastSuccess, showToastWarning };
};
export default useCustomToast;
