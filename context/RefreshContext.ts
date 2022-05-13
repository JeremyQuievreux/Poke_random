import { createContext } from 'react';

type CheckStorageContextType = {
    checkStorage: () => void,
    userIsLog: boolean,
    userID: string|null,
  }
  
  export const CheckStorageContext = createContext<CheckStorageContextType>({
    checkStorage: () => {},
    userIsLog: false,
    userID: null,
  })