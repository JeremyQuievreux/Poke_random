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

import { PokemonType } from '../types/PokemonType'

import { UserInfosType } from '../types/UserInfosType'//<-use

function MyApp({ Component, pageProps }: AppProps) {
  
  const [ isLogModalOpen, setIsLogModalOpen ] = useState<boolean>(false)

  const [ showBuyCardModal, setShowBuyCardModal ] = useState<boolean>(false)
  const [ buyCardModalInfos, setBuyCardModalInfos ] = useState<BuyCardModalInfosType>({cardID: '', cardName: '', cardPrice: 0, userID: '', userCoin: 0})
  
  const [ showSellCardModal, setShowSellCardModal ] = useState<boolean>(false)
  const [ sellCardModalInfos, setSellCardModalInfos ] = useState<SellCardModalInfosType>({cardID: '', cardName: '', cardPrice: 0, userID: '', userCoin: 0})

  //reforge
  const [ userIsLogged, setUserIsLogged ] = useState<boolean>(false)
  const [ userFullInfos, setUserFullInfos ] = useState<UserInfosType|null>(null)

  const [ showGetRandomCardModal, setShowGetRandomCardModal ] = useState<boolean>(false)
  const [ randomCardModalInfos, setRandomCardModalInfos ] = useState<PokemonType|null>(null)

  const getUserInfos = (localToken:string) => {
    console.log("je recherche les infos");
    axios.get('/api/users/getuserallcards', {
      headers: {
        'Authorization': `Bearer ${localToken}`
      }
    })
    .then((res) => {
      if(res.data.error){
        console.log(res.data.message);
      } else {
        setUserIsLogged(true)
        setUserFullInfos(res.data.data)
      }
    })
  }

  const checkLocalStorage = () => {
    const localToken = localStorage.getItem('@pkm-cnc')
    if(localToken){
      console.log("token found");
      getUserInfos(localToken)
    }
    else {
      console.log("token not found");
      setUserIsLogged(false)
    }
  }

  

  const GlobalContextValue = {
    userIsLogged,
    setUserIsLogged,
    userFullInfos,
    setUserFullInfos,
    checkLocalStorage,
    showGetRandomCardModal,
    setShowGetRandomCardModal,
    randomCardModalInfos,
    setRandomCardModalInfos,
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
    checkLocalStorage()
  },[])





  return (
    <SellCardModalContext.Provider value={SellCardModalContextValue}>
    <BuyCardModalContext.Provider value={BuyCardModalContextValue}>
    <GlobalContext.Provider value={GlobalContextValue}>
    <ModalContext.Provider value={modalContextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModalContext.Provider>
    </GlobalContext.Provider>
    </BuyCardModalContext.Provider>
    </SellCardModalContext.Provider>
  )
}

export default MyApp
