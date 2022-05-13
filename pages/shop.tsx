//Base React + Componsant Image de Next.js + Axios
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
// Style
import styles from '../styles/pages/Shop.module.scss'
import Card from '../comps/Card';

//type
interface IPokemon {
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

const Shop = () => {
  //State
  const [cards, setCards] = useState<IPokemon[]>([])
  //Fetch data before render
  useEffect(() => {
    axios.get('/api/cards/getAllCardsFromDB')
      .then(res => {
        setCards(res.data.data)
      })
  },[])

  return (
    <div className={styles.shop_container}>
        <h2>Shop Page</h2>
        <div className={styles.cards_container}>
          {cards.map((card) => {
            return (
              <Card key={card._id} card={card}/>
            )
          })}
        </div>
    </div>
  )
}
export default Shop
