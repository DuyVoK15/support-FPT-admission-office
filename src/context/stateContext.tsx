import React, { ReactNode, createContext, useContext, useState } from 'react';

export type MyContextProps = {
  postReOpenCategoryId: number | null;
  setPostReOpenCategoryId: (id: number | null) => void;
  postUpcommingCategoryId: number | null;
  setPostUpcommingCategoryId: (id: number | null) => void;
}
// Tạo một context mới
export const MyContext = createContext<MyContextProps | null>(null);

// Provider component
export const MyContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [postReOpenCategoryId, setPostReOpenCategoryId ] = useState<number | null>(null);
  const [postUpcommingCategoryId, setPostUpcommingCategoryId ] = useState<number | null>(null);

  return (
    <MyContext.Provider value={{postReOpenCategoryId, postUpcommingCategoryId, setPostReOpenCategoryId , setPostUpcommingCategoryId}} >
      {children}
    </MyContext.Provider>
  );
};
