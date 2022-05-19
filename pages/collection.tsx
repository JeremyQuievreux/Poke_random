import React,{ useEffect, useState } from 'react'

import styles from "../styles/pages/Collection.module.scss"

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

type CardType = {
  card: PokemonType,
  quantity: number
}


const Collection = () => {

  const [ userCardsList, setUserCardsList ] = useState<[CardType]|null>(null)

  const getUserAllCards = (localToken:string) => {
    axios.get('/api/users/getuserallcards', {
      headers: {
        'Authorization': `Bearer ${localToken}`
      }
    })
    .then((result)=> {
      setUserCardsList(result.data.data.cardsList)
    })
  }

  useEffect(() => {
    const localToken:string|null = localStorage.getItem('@pkm-cnc')
    if(localToken){
      getUserAllCards(localToken)
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