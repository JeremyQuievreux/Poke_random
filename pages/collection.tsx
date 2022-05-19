import React,{ useEffect, useState, useContext } from 'react'

import styles from "../styles/pages/Collection.module.scss"

import axios from 'axios'
import Card from '../comps/Card';
import SellBtn from '../comps/SellBtn';

import { SellCardModalContext } from '../context/SellCardModalContext'

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
  dex_number: number,
  quantity: number
}


const Collection = () => {

  const { userCardsList, setUserCardsList , refreshUserCollection} = useContext(SellCardModalContext)

  useEffect(() => {
    const localToken = localStorage.getItem('@pkm-cnc')
    if(localToken){
      refreshUserCollection(localToken)
    }
  },[])
  
    
  return (
    <div className={styles.collection_container}>
        <h2>Collection Page</h2>
        <div className={styles.cards_container}>
          {userCardsList ?
            userCardsList.length >= 1 
              ?
              userCardsList?.map((cardAndQuantity, index) => {
                return (
                <div className={styles.sub_container} key={index}>
                  <Card card={cardAndQuantity.card}/>
                  <p>{cardAndQuantity.quantity}</p>
                  {cardAndQuantity.quantity > 1 && 
                    <SellBtn card={cardAndQuantity}/>
                  }
                </div>
                )
              })
              : 
              <p>You have no cards in your collection</p>
            :
            <p>Loading ...</p>
          }
        </div>
    </div>
  )
}

export default Collection