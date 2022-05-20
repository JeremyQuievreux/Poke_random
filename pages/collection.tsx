import React,{ useEffect, useState, useContext } from 'react'

import styles from "../styles/pages/Collection.module.scss"

import axios from 'axios'
import Card from '../comps/Card';
import SellBtn from '../comps/SellBtn';

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
  const [allcardsFromDB, setAllcardsFromDB ] = useState<CardType[]>([])
  const [cardsToSee, setCardsToSee] = useState<CardType[]>([])

  const [ whatToSee, setWhatToSee ] = useState<string>("all")

  const setFilter = (quantity:number) => {
    if(quantity === 0){
      return {filter: "grayscale(100%)"}
    }
  }
  
  const handleRadioChange = (e:any) => {
    setWhatToSee(e.target.value)
  }

  useEffect(() => {
    const localToken = localStorage.getItem('@pkm-cnc')
    if(localToken){
      axios.get('/api/users/getuserallcards', {
        headers: {
          'Authorization': `Bearer ${localToken}`
        }
      })
      .then((result)=> {
        return result.data.data.cardsList
      })
      .then((result)=> {
        setAllcardsFromDB(result)
      })
    }
  },[])


  useEffect(()=> {
    if(allcardsFromDB){
      if (whatToSee === "all") {
        setCardsToSee(allcardsFromDB)
      }
      if (whatToSee === "mine") {
        setCardsToSee(allcardsFromDB.filter(card => card.quantity > 0))
      }
      if (whatToSee === "duplicate") {
        setCardsToSee(allcardsFromDB.filter(card => card.quantity > 1))
      }
      if (whatToSee === "missing") {
        setCardsToSee(allcardsFromDB.filter(card => card.quantity == 0))
      }
    }
  },[whatToSee, allcardsFromDB])

    
  return (
    <div className={styles.collection_container}>
        <div className={styles.radio_btn_block} onChange={(e) => handleRadioChange(e)}>
          <input type="radio" name="seeing" id="all" value="all" defaultChecked={whatToSee === "all"}/>
          <label> Toutes les cartes </label>
          <input type="radio" name="seeing" id="mine" value="mine" defaultChecked={whatToSee === "mine"}/>
          <label> Mes cartes </label>
          <input type="radio" name="seeing" id="duplicate" value="duplicate" defaultChecked={whatToSee === "duplicate"}/>
          <label> Mes doubles </label>
          <input type="radio" name="seeing" id="duplicate" value="missing" defaultChecked={whatToSee === "missing"}/>
          <label> Cartes manquantes </label>
        </div>
        <div className={styles.cards_container}>
          {cardsToSee &&
              cardsToSee?.map((cardAndQuantity, index) => {
                return (
                <div className={styles.sub_container} key={index}>
                  <div style={setFilter(cardAndQuantity.quantity)}>
                  <Card card={cardAndQuantity.card}/>
                  </div>
                  {cardAndQuantity.quantity > 1 && 
                  <div className={styles.sellBtn_line}>
                    <SellBtn card={cardAndQuantity}/>
                  </div>
                  }
                    {cardAndQuantity.quantity > 1 &&
                    <div className={styles.quantity_number}>
                      <p > x {cardAndQuantity.quantity}</p>
                    </div>}
                </div>
                )
              })
          }
        </div>
    </div>
  )
}

export default Collection