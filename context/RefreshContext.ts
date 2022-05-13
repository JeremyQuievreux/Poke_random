import { createContext } from 'react';

type CheckStorageContextType = {
    checkStorage: () => void,
    userIsLog: boolean
  }
  
  export const CheckStorageContext = createContext<CheckStorageContextType>({
    checkStorage: () => {},
    userIsLog: false
  })