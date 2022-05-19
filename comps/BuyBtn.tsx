//base
import React, { useContext } from 'react'
import { BsCoin } from "react-icons/bs";
//style
import styles from '../styles/comps/BuyBtn.module.scss'
//context
import { BuyCardModalContext } from '../context/BuyCardModalContext'
import { UserContext } from '../context/UserContext';
//type
import { PokemonType } from '../types/PokemonType';
//propstype
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