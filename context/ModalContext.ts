import { createContext } from 'react';

type ModalContextType = {
    isLogModalOpen: boolean,
    setIsLogModalOpen: (isLogModalOpen: boolean) => void
  }
  
  export const ModalContext = createContext<ModalContextType>({
    isLogModalOpen: false,
    setIsLogModalOpen: () => {}
  })