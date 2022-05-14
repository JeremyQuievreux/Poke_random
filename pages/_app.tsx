import '../styles/globals.scss'
import { useState , createContext, useEffect} from 'react'
import type { AppProps } from 'next/app'

import Layout from '../comps/Layout'

import { ModalContext } from '../context/ModalContext'
import { CheckStorageContext } from '../context/CheckStorageContext'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

function MyApp({ Component, pageProps }: AppProps) {
  
  const [ isLogModalOpen, setIsLogModalOpen ] = useState<boolean>(false)
  const [ userIsLog, setUserIsLog ] = useState<boolean>(false)
  const [ userInfos, setUserInfos ] = useState<{}|null>(null)

  const checkStorageFunction = () => {
    if(localStorage.getItem('@pkm-cnc')) {
      setUserIsLog(true)

    } else {
      setUserIsLog(false)
    }
  }

  const userContextValue = {
    userIsLog,
    userInfos
  }
  
  const modalContextValue = {
    isLogModalOpen,
    setIsLogModalOpen
  }
  
  const CheckStorageContextValue = {
    checkStorageFunction
  }

  useEffect(() => {
    checkStorageFunction()
  },[])

  return (
    <UserContext.Provider value={userContextValue}>
    <CheckStorageContext.Provider value={CheckStorageContextValue}>
    <ModalContext.Provider value={modalContextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModalContext.Provider>
    </CheckStorageContext.Provider>
    </UserContext.Provider>
  )
}

export default MyApp
