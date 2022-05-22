//test

import '../styles/globals.scss'
import { useState, useEffect} from 'react'
import type { AppProps } from 'next/app'

import Layout from '../comps/Layout'

import { ModalContext } from '../context/ModalContext'
import { BuyCardModalContext } from '../context/BuyCardModalContext'
import { SellCardModalContext } from '../context/SellCardModalContext'

import { GlobalContext }  from '../context/GlobalContext'
import axios from 'axios'


import { BuyCardModalInfosType } from '../types/BuyCardModalInfosType'

import { SellCardModalInfosType } from '../types/SellCardModalInfosType'

import { UserInfosType } from '../types/UserInfosType'//<-use

function MyApp({ Component, pageProps }: AppProps) {
  
  const [ isLogModalOpen, setIsLogModalOpen ] = useState<boolean>(false)

  const [ showBuyCardModal, setShowBuyCardModal ] = useState<boolean>(false)
  const [ buyCardModalInfos, setBuyCardModalInfos ] = useState<BuyCardModalInfosType>({cardID: '', cardName: '', cardPrice: 0, userID: '', userCoin: 0})
  
  const [ showSellCardModal, setShowSellCardModal ] = useState<boolean>(false)
  const [ sellCardModalInfos, setSellCardModalInfos ] = useState<SellCardModalInfosType>({cardID: '', cardName: '', cardPrice: 0, userID: '', userCoin: 0})

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

  const SellCardModalContextValue = {
    showSellCardModal,
    setShowSellCardModal,
    sellCardModalInfos,
    setSellCardModalInfos,
  }

  const BuyCardModalContextValue = {
    showBuyCardModal,
    setShowBuyCardModal,
    buyCardModalInfos,
    setBuyCardModalInfos
  }
  
  const modalContextValue = {
    isLogModalOpen,
    setIsLogModalOpen
  }

  useEffect(() => {
    hardRefresh()
  },[])

  return (
    <GlobalContext.Provider value={GlobalContextValue}>
    <SellCardModalContext.Provider value={SellCardModalContextValue}>
    <BuyCardModalContext.Provider value={BuyCardModalContextValue}>
    <ModalContext.Provider value={modalContextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModalContext.Provider>
    </BuyCardModalContext.Provider>
    </SellCardModalContext.Provider>
    </GlobalContext.Provider>
  )
}

export default MyApp
