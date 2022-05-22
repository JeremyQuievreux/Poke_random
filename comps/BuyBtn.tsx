//base
import React, { useContext } from 'react'
import { BsCoin } from "react-icons/bs";
//style
import styles from '../styles/comps/BuyBtn.module.scss'
//context
import { BuyCardModalContext } from '../context/BuyCardModalContext'
import { GlobalContext } from '../context/GlobalContext';
//type
import { PokemonType } from '../types/PokemonType';
//propstype
type BuyBtnProps = {
    card: PokemonType,
}

const BuyBtn = ({card}:BuyBtnProps) => {

    const { userFullInfos } = useContext(GlobalContext);
    const { setShowBuyCardModal, setBuyCardModalInfos} = useContext(BuyCardModalContext);

  return (
    <div className={styles.buy_line}>
        <p>{card.price} <BsCoin/></p>
        <button onClick={() => {
            setShowBuyCardModal(true)
            setBuyCardModalInfos({cardID: card._id, cardName: card.name, cardPrice: card.price, userID: userFullInfos?._id, userCoin: userFullInfos?.pokeCoin})
        }}>Acheter</button>
    </div>
  )
}

export default BuyBtn