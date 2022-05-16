import React, { useContext } from 'react'

import styles from '../styles/comps/BuyCardModal.module.scss'

import { CheckStorageContext } from '../context/CheckStorageContext';
import { BuyCardModalContext } from '../context/BuyCardModalContext';
import { UserContext } from '../context/UserContext';
import { ModalContext } from '../context/ModalContext';

import axios from 'axios';

const BuyCardModal = () => {

    const { checkStorageFunction } = useContext(CheckStorageContext);
    const { setShowBuyCardModal, buyCardModalInfos } = useContext(BuyCardModalContext);
    const { userIsLog } = useContext(UserContext);
    const { setIsLogModalOpen } = useContext(ModalContext);

    const buycard = (cardID: string, userID: string) =>  {
        console.log("card id : " + cardID + " userID : " + userID);
        axios.post('/api/cards/buyCard',{cardID,userID})
        .then(res => {
            console.log(res.data);
            checkStorageFunction();
        })
    }

    const haveMoney = buyCardModalInfos.userCoin >= buyCardModalInfos.cardPrice;

  return (
        <div className={styles.buyCardModal_externe} onClick={() => setShowBuyCardModal(false)}>
            <div className={styles.buyCardModal_interne} onClick={(e) => e.stopPropagation()}>
                {userIsLog ?
                    <>
                        <p>Buy Card Modal</p>
                        <p>CardID : {buyCardModalInfos.cardID}</p>
                        <p>CardName : {buyCardModalInfos.cardName}</p>
                        <p>CardPrice : {buyCardModalInfos.cardPrice}</p>
                        <p>UserID : {buyCardModalInfos.userID}</p>
                        <p>UserCoin : {buyCardModalInfos.userCoin}</p>
    
                        <p>Voulez vous acheter cette la carte de {buyCardModalInfos.cardName} ?</p>
                        <button onClick={() => {
                            buycard(buyCardModalInfos.cardID, buyCardModalInfos.userID)
                            setShowBuyCardModal(false)
                        }
                        }>OUI</button>
                        <button onClick={() => setShowBuyCardModal(false)}>NON</button>
                    </> :
                    <>
                        <p>Vous devez être connecté pour acheter une carte</p>
                        <button onClick={() => {
                            setShowBuyCardModal(false)
                            setIsLogModalOpen(true)
                        }}>Se Connecter</button>
                    </>
                }
            </div>
        </div>
    )
}

export default BuyCardModal