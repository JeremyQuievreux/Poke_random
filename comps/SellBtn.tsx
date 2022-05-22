//Base
import React, { useContext } from 'react'
import styles from '../styles/comps/SellBtn.module.scss'
import { BsCoin } from "react-icons/bs";
//Context
import { SellCardModalContext } from '../context/SellCardModalContext'
import { GlobalContext } from '../context/GlobalContext';
//Type
import { CollectionLineType } from '../types/CollectionLineType';


type SellBtnProps = {
    card: CollectionLineType
}

const BuyBtn = ({card}:SellBtnProps) => {
    //Context
    const { userFullInfos } = useContext(GlobalContext);
    const { setShowSellCardModal, setSellCardModalInfos} = useContext(SellCardModalContext);

  return (
    <div className={styles.sell_line}>
        <p>{card.card.price} <BsCoin/></p>
        <button onClick={()=> {
            setShowSellCardModal(true);
            setSellCardModalInfos({cardID: card.card._id, cardName: card.card.name, cardPrice: card.card.price, userID: userFullInfos?._id, userCoin: userFullInfos?.pokeCoin})
        }}>Vendre</button>
    </div>
  )
}

export default BuyBtn