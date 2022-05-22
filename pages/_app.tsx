//test

import '../styles/globals.scss'
import { useState, useEffect} from 'react'
import type { AppProps } from 'next/app'

import Layout from '../comps/Layout'

import { ModalContext } from '../context/ModalContext'
import { CheckStorageContext } from '../context/CheckStorageContext'
import { UserContext } from '../context/UserContext'
import { BuyCardModalContext } from '../context/BuyCardModalContext'
import { SellCardModalContext } from '../context/SellCardModalContext'

import { GlobalContext }  from '../context/GlobalContext'
import axios from 'axios'

import { CollectionLineType } from '../types/CollectionLineType'

import { BuyCardModalInfosType } from '../types/BuyCardModalInfosType'

import { SellCardModalInfosType } from '../types/SellCardModalInfosType'

import { UserInfosType } from '../types/UserInfosType'//<-use

function MyApp({ Component, pageProps }: AppProps) {
  
  const [ isLogModalOpen, setIsLogModalOpen ] = useState<boolean>(false)
  const [ userIsLog, setUserIsLog ] = useState<boolean>(false)
  const [ userInfos, setUserInfos ] = useState<UserInfosType|null>(null)

  const [ showBuyCardModal, setShowBuyCardModal ] = useState<boolean>(false)
  const [ buyCardModalInfos, setBuyCardModalInfos ] = useState<BuyCardModalInfosType>({cardID: '', cardName: '', cardPrice: 0, userID: '', userCoin: 0})
  
  const [ showSellCardModal, setShowSellCardModal ] = useState<boolean>(false)
  const [ sellCardModalInfos, setSellCardModalInfos ] = useState<SellCardModalInfosType>({cardID: '', cardName: '', cardPrice: 0, userID: '', userCoin: 0})

  const [ userCardsList, setUserCardsList ] = useState<[CollectionLineType]|null>(null)

  //reforge
  const [ userIsLogged, setUserIsLogged ] = useState<boolean>(true)
  const [ userFullInfos, setUserFullInfos ] = useState<UserInfosType|null>(null)

  const hardRefresh = () => {
    const localToken = localStorage.getItem('@pkm-cnc')
    if(localToken) {
      axios.get('/api/users/getuserallcards', {
        headers: {
          'Authorization': `Bearer ${localToken}`
        }
      })
      .then(res => {
        if(res.data.error === true){
          setUserIsLogged(false)
          setUserFullInfos(null)
        } else {
          setUserIsLogged(true)
          setUserFullInfos(res.data.data);
        }
      })
    } else {
      setUserIsLogged(false)
    }
  }

  const GlobalContextValue = {
    userIsLogged,
    setUserIsLogged,
    userFullInfos,
    setUserFullInfos,
    hardRefresh
  }

  //end reforge

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

  const refreshUserCollection = (localToken:string|null) => {
    axios.get('/api/users/getuserallcards', {
      headers: {
        'Authorization': `Bearer ${localToken}`
      }
    })
    .then((result)=> {
      return result.data.data.cardsList
    })
    .then((result)=> {
      setUserCardsList(result)
    })
  }

  const SellCardModalContextValue = {
    showSellCardModal,
    setShowSellCardModal,
    sellCardModalInfos,
    setSellCardModalInfos,
    userCardsList,
    setUserCardsList,
    refreshUserCollection

  }

  const BuyCardModalContextValue = {
    showBuyCardModal,
    setShowBuyCardModal,
    buyCardModalInfos,
    setBuyCardModalInfos
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
    hardRefresh()
  },[])

  return (
    <GlobalContext.Provider value={GlobalContextValue}>
    <SellCardModalContext.Provider value={SellCardModalContextValue}>
    <BuyCardModalContext.Provider value={BuyCardModalContextValue}>
    <UserContext.Provider value={userContextValue}>
    <CheckStorageContext.Provider value={CheckStorageContextValue}>
    <ModalContext.Provider value={modalContextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModalContext.Provider>
    </CheckStorageContext.Provider>
    </UserContext.Provider>
    </BuyCardModalContext.Provider>
    </SellCardModalContext.Provider>
    </GlobalContext.Provider>
  )
}

export default MyApp
