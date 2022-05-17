import React, { useContext } from 'react'

import { BsCoin } from "react-icons/bs";

import styles from '../styles/comps/BuyBtn.module.scss'

import { BuyCardModalContext } from '../context/BuyCardModalContext'

import { UserContext } from '../context/UserContext';

import { PokemonType } from '../types/PokemonType';


type BuyBtnProps = {
    card: PokemonType,
}


const BuyBtn = ({card}:BuyBtnProps) => {

    const { userInfos } = useContext(UserContext);

    const { setShowBuyCardModal, setBuyCardModalInfos} = useContext(BuyCardModalContext);

  return (
    <div className={styles.buy_line}>
        <p>{card.price} <BsCoin/></p>
        <button onClick={() => {
            setShowBuyCardModal(true)
            setBuyCardModalInfos({cardID: card._id, cardName: card.name, cardPrice: card.price, userID: userInfos?._id, userCoin: userInfos?.pokeCoin})
        }}>Acheter</button>
    </div>
  )
}

export default BuyBtn