import React, { ReactNode, createContext, useContext, useState } from 'react';

export type MyContextProps = {
  id: number | null;
  setId: (id: number | null) => void;
}
// Tạo một context mới
export const MyContext = createContext<MyContextProps | null>(null);

// Provider component
export const MyContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [id, setId] = useState<number | null>(null);
  
  return (
    <MyContext.Provider value={{id, setId}} >
      {children}
    </MyContext.Provider>
  );
};
