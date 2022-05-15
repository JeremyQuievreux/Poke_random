import '../styles/globals.scss'
import { useState , createContext, useEffect} from 'react'
import type { AppProps } from 'next/app'

import Layout from '../comps/Layout'

import { ModalContext } from '../context/ModalContext'
import { CheckStorageContext } from '../context/CheckStorageContext'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

type UserInfosType = {
  id: string,
  email: string,
  pseudo: string,
  isAdmin: boolean,
  pokeCoin: number,
  cardsList:{}[]
}

function MyApp({ Component, pageProps }: AppProps) {
  
  const [ isLogModalOpen, setIsLogModalOpen ] = useState<boolean>(false)
  const [ userIsLog, setUserIsLog ] = useState<boolean>(false)
  const [ userInfos, setUserInfos ] = useState<UserInfosType|null>(null)

  const getUserInfos = (IDtoken: string) => {
    axios.get('/api/users/getUserInfos', {
      headers: {
        'Authorization': `Bearer ${IDtoken}`
      }
    })
    .then(res => {
      if(res.data.error === true){
        setUserIsLog(false)
        setUserInfos(null)
      } else {
        setUserIsLog(true)
        setUserInfos(res.data.data);
      }
    })
  }

  const checkStorageFunction = () => {
    const localToken = localStorage.getItem('@pkm-cnc')
    if(localToken) {
      getUserInfos(localToken)
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
