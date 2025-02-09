import React,{ useEffect, useState, useContext } from 'react'

import styles from "../styles/pages/Collection.module.scss"

import Card from '../comps/Card';
import SellBtn from '../comps/SellBtn';

import { GlobalContext } from '../context/GlobalContext';

import { CollectionLineType } from '../types/CollectionLineType';




const Collection = () => {

  const { userFullInfos } = useContext(GlobalContext)

  const [ whatToSee, setWhatToSee ] = useState<string>("all")

  const [cardsToSee, setCardsToSee] = useState<CollectionLineType[]>([])

  const setFilter = (quantity:number) => {
    if(quantity === 0){
      return {filter: "grayscale(100%)"}
    }
  }
  
  const handleRadioChange = (e:any) => {
    setWhatToSee(e.target.value)
  }

  const cardsList = userFullInfos?.cardsList

  useEffect(()=> {
    if(cardsList){
      if (whatToSee === "all") {
        setCardsToSee(cardsList)
      }
      if (whatToSee === "mine") {
        setCardsToSee(cardsList.filter(card => card.quantity > 0))
      }
      if (whatToSee === "duplicate") {
        setCardsToSee(cardsList.filter(card => card.quantity > 1))
      }
      if (whatToSee === "missing") {
        setCardsToSee(cardsList.filter(card => card.quantity == 0))
      }
    }
  },[whatToSee, cardsList])

    
  return (
    <div className={styles.collection_container}>
      <div className={styles.filter_bar}>
        <div className={styles.filter}>
          <label htmlFor="see">Je veux voir : </label>
          <select name="see" id="see" onChange={(e)=>handleRadioChange(e)}>
            <option value="all">Toutes les cartes</option>
            <option value="mine">Mes cartes</option>
            <option value="duplicate">Mes doubles</option>
            <option value="missing">Les cartes qu&apos;il me manque</option>
          </select>
        </div>
      </div>
        <div className={styles.cards_container}>
          {cardsToSee.length >= 1 ?
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
              }) :
              <p>Pas de carte trouvées</p>
          }
        </div>
    </div>
  )
}

export default Collection