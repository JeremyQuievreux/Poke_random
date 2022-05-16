import React, { useContext } from 'react'
import Image from 'next/image';

import styles from '../styles/comps/Card.module.scss'

import { setBGColor } from '../utils/BGColorFunction';

import { UserContext } from '../context/UserContext';

import { PokemonType } from '../types/PokemonType';
import axios from 'axios';

type CardComponantProps = {
    card: PokemonType,
    setShowBuyCardModal: (showBuyCardModal: boolean) => void,
    setModalInfos: (modalInfos: { cardID: string,cardName: string, userID: string, userCoin: number|any }) => void
}

const Card = ({card, setShowBuyCardModal, setModalInfos}:CardComponantProps) => {

    const { userInfos } = useContext(UserContext);


    const type = card.type[0]

    

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
            <button onClick={() => {
                setModalInfos({cardID: card._id,cardName: card.name, userID: userInfos?._id, userCoin: userInfos?.pokeCoin})
                setShowBuyCardModal(true)
            }}>Acheter</button>
        </div>
    </div>
  )
}

export default Card