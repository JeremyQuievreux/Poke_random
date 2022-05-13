import { createContext } from 'react';

type CheckStorageContextType = {
    checkStorageFunction: () => void,
  }
  
  export const CheckStorageContext = createContext<CheckStorageContextType>({
    checkStorageFunction: () => {},
  })