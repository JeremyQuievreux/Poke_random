import React,{ useContext, useEffect, useState } from 'react'

import styles from "../styles/pages/Collection.module.scss"

import { UserContext } from '../context/UserContext'
import axios from 'axios'
import Card from '../comps/Card';
import BuyBtn from '../comps/BuyBtn';

interface PokemonType {
  _id: string;
  gen: number;
  dex_number: number;
  name: string;
  type: string[];
  description: string;
  picURL: string;
  price: number;
  height: number;
  weight: number;
  rarity: string;
}

type CardType = {
  card: PokemonType,
  quantity: number
}


const Collection = () => {

  const { userInfos } = useContext(UserContext)
  const [ userCardsList, setUserCardsList ] = useState<[CardType]>()

  

  const getUserInfos = (IDtoken: string|null) => {
    axios.get('/api/users/getUserInfos', {
      headers: {
        'Authorization': `Bearer ${IDtoken}`
      }
    })
    .then(res => {
      if(res.data.error === true){
        console.log("error with token");
      } else {
        getallusercards(res.data.data._id)
      }
    })
  }

  const getallusercards = (userID:string) => {
    axios.get(`/api/users/getusercards`, {
      params: {
        userID
      }
    })
    .then(res => {
      setUserCardsList(res.data.data.cardsList)
    })
  }

  useEffect(() => {
    const localToken:string|null = localStorage.getItem('@pkm-cnc')
    getUserInfos(localToken)
  },[])
  
    
  return (
    <div className={styles.collection_container}>
        <h2>Collection Page</h2>
        <div className={styles.cards_container}>
          {userCardsList?.map((cardAndQuantity, index) => {
            return (
            <div className={styles.sub_container} key={index}>
              <Card card={cardAndQuantity.card}/>
              <p>{cardAndQuantity.quantity}</p>
            </div>
              )
          })}
        </div>
    </div>
  )
}

export default Collection