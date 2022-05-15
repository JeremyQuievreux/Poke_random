import React, { useContext } from 'react'
import Image from 'next/image';

import styles from '../styles/comps/Card.module.scss'

import { setBGColor } from '../utils/BGColorFunction';

import { UserContext } from '../context/UserContext';

type IPokemon = {
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

type CardComponantProps = {
    card: IPokemon
}

const Card = ({card}:CardComponantProps) => {

    const { userInfos } = useContext(UserContext);

    const type = card.type[0]

    const buycard = (cardID: string, userID: string) =>  {
        console.log("card id : " + cardID + " userID : " + userID);
        
    }

  return (
      <div className={styles.card_main_container}>
        <div className={styles.card_container}>
            <div className={styles.decoration_border}>
                <div className={styles.card_header} style={{backgroundColor: setBGColor(type)}}>
                    <p>N° {card.dex_number}</p>
                    <p>{card.name}</p>
                </div>
                <div className={styles.card_body}>
                    <img src={card.picURL} width={200} height={200} />
                </div>
                <div className={styles.card_typeline}>
                    {card.type.map((type, index) => {
                        return <p key={index} className={styles.type_square} style={{backgroundColor: setBGColor(type)}}>
                                    {type}
                                </p>
                    })}
                </div>
                <div className={styles.card_footer} style={{backgroundColor: setBGColor(type)}}>
                    <p>Taille : {card.height / 100} m </p>
                    <p>Poids : {card.weight / 1000} Kg</p>
                </div>
            </div>
        </div>
        <div className={styles.buy_line}>
            <p>{card.price} PkC</p>
            <button onClick={() => buycard(card.name, userInfos?._id)}>Acheter</button>
        </div>
    </div>
  )
}

export default Card