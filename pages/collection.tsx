import React,{ useContext, useEffect, useState } from 'react'

import styles from "../styles/pages/Collection.module.scss"

import { UserContext } from '../context/UserContext'
import axios from 'axios'
import Card from '../comps/Card';

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


const Collection = () => {

  const { userInfos } = useContext(UserContext)
  const [ userCards, setUserCards ] = useState<[PokemonType]>()

  const userID = userInfos?._id

  const getallusercards = () => {
    axios.get(`/api/users/getusercards`, {
      params: {
        userID
      }
    })
    .then(res => {
      setUserCards(res.data.data)
    })
  }

  useEffect(() => {
    getallusercards()
  },[])
  
    
  return (
    <div className={styles.collection_container}>
        <h2>Collection Page</h2>
        <div className={styles.cards_container}>
          {userCards?.map((card) => {
            return (
              <Card card={card}/>
              )
          })}
        </div>
    </div>
  )
}

export default Collection