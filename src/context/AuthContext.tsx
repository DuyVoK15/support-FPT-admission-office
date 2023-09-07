import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import AppConstants from '../enums/student/app';
import auth from '@react-native-firebase/auth';

// Tạo một Context mới
export interface AuthContextType {
  isLoggined: boolean;
  checkIsLoggined: () => void;
  logout: () => void;
}

type HeaderProps = {
  children: ReactNode; // Allow children to be passed
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: HeaderProps) => {
  const [isLoggined, setIsLoggined] = useState(false);

  useEffect(() => {
    checkIsLoggined();
  }, []);

  // Check loggined
  const checkIsLoggined = async () => {
    console.log("có vô đây")
    const access_token = await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN); 
    if (access_token) {
      setIsLoggined(true);
    } else {
      setIsLoggined(false);
      console.log('NO access token!');
    }
  };

  // Logout
  const logout = async () => {
    await AsyncStorage.removeItem(AppConstants.ACCESS_TOKEN);
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    checkIsLoggined();
  };

  return (
    <AuthContext.Provider value={{ isLoggined, logout, checkIsLoggined }}>
      {children}
    </AuthContext.Provider>
  );
};
