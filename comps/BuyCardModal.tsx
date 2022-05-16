import React, { useContext } from 'react'

import styles from '../styles/comps/BuyCardModal.module.scss'

import { CheckStorageContext } from '../context/CheckStorageContext';

import axios from 'axios';


type BuyCardModalProps = {
    setShowBuyCardModal: (showBuyCardModal: boolean) => void,
    modalInfos: {
        cardID: string,
        cardName: string,
        userID: string,
        userCoin: string
    }
}

const BuyCardModal = ({setShowBuyCardModal, modalInfos}:BuyCardModalProps) => {

    const { checkStorageFunction } = useContext(CheckStorageContext);


    const buycard = (cardID: string, userID: string) =>  {
        console.log("card id : " + cardID + " userID : " + userID);
        axios.post('/api/cards/buyCard',{cardID,userID})
        .then(res => {
            console.log(res.data);
            setShowBuyCardModal(false);
            checkStorageFunction();
        })
    }

  return (
    <div className={styles.buyCardModal_externe} onClick={()=>setShowBuyCardModal(false)}>
        <div className={styles.buyCardModal_interne} onClick={(e) => e.stopPropagation()}>
            <p>CardID : {modalInfos.cardID}</p>
            <p>Card Name : {modalInfos.cardName}</p>
            <p>UserID : {modalInfos.userID}</p>
            <p>UserCoin : {modalInfos.userCoin}</p>
            <h2>Confirmation d'achat de carte</h2>
            <p>Voulez vous vraiment acheter cette carte ?</p>
            <button onClick={()=> buycard(modalInfos.cardID,modalInfos.userID)}>OUI</button>
            <button onClick={() =>setShowBuyCardModal(false)}>NON</button>
        </div>
    </div>
  )
}

export default BuyCardModal