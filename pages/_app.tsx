import '../styles/globals.scss'
import { useState , createContext, useEffect} from 'react'
import type { AppProps } from 'next/app'

import Layout from '../comps/Layout'

import { ModalContext } from '../context/ModalContext'

import { CheckStorageContext } from '../context/RefreshContext'

function MyApp({ Component, pageProps }: AppProps) {
  
  const [ isLogModalOpen, setIsLogModalOpen ] = useState<boolean>(false)
  const [ userIsLog, setUserIsLog ] = useState<boolean>(false)
  const [ userID, setUserID ] = useState<string|null>(null)

  const checkStorage = () => {
    if(localStorage.getItem('@pkm-cnc')) {
      console.log("storage ok");
      setUserIsLog(true)
      setUserID(localStorage.getItem('@pkm-cnc'))
    } else {
      console.log("storage not ok");
      setUserIsLog(false)
      setUserID(null)
    }
  }
  
  const modalContextValue = {
    isLogModalOpen,
    setIsLogModalOpen
  }
  
  const CheckStorageContextValue = {
    checkStorage,
    userIsLog,
    userID
  }

  useEffect(() => {
    checkStorage()
  },[])

  return (
    <CheckStorageContext.Provider value={CheckStorageContextValue}>
    <ModalContext.Provider value={modalContextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModalContext.Provider>
    </CheckStorageContext.Provider>
  )
}

export default MyApp
