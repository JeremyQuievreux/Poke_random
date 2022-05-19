import React, { useContext } from 'react'

import styles from '../styles/comps/BuyCardModal.module.scss'

import { CheckStorageContext } from '../context/CheckStorageContext';
import { SellCardModalContext } from '../context/SellCardModalContext';
import { UserContext } from '../context/UserContext';


const SellCardModal = () => {

    const { checkStorageFunction } = useContext(CheckStorageContext);
    const { setShowSellCardModal, sellCardModalInfos } = useContext(SellCardModalContext);
    const { userIsLog } = useContext(UserContext);


    const sellCard = (cardID: string, userID: string) =>  {
        console.log("a vendre");
        console.log("card id : " + cardID + " userID : " + userID);
        /* axios.post('/api/cards/buyCard',{cardID,userID})
        .then(res => {
            console.log(res.data);
            checkStorageFunction();
        }) */
    }

  return (
        <div className={styles.buyCardModal_externe} onClick={() => setShowSellCardModal(false)}>
            <div className={styles.buyCardModal_interne} onClick={(e) => e.stopPropagation()}>
                <button className={styles.close_button} onClick={() => setShowSellCardModal(false)}>X</button>
                <div className={styles.modal_header}>
                    <h2>Confirmation de Vente</h2>
                </div>
                <div className={styles.modal_body}>
                    <p>Voulez vous vendre cette carte de {sellCardModalInfos.cardName} ?</p>
                </div>
                <div className={styles.modal_footer}>
                    <button onClick={() => {
                        setShowSellCardModal(false)
                        sellCard(sellCardModalInfos.cardID, sellCardModalInfos.userID)
                    }}>OUI</button>
                    <button onClick={() => {
                        setShowSellCardModal(false)
                    }}>NON</button>
                </div>
            </div>
        </div>
    )
}

export default SellCardModal