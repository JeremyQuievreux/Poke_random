//Base
import React, { useContext, useState } from 'react'
import styles from '../styles/comps/BuyCardModal.module.scss'
import axios from 'axios';
//Context
import { SellCardModalContext } from '../context/SellCardModalContext';
import { GlobalContext } from '../context/GlobalContext';

const SellCardModal = () => {
    const [ btnIsDisabled, setBtnIsDisabled ] = useState(false);
    //Context
    const { setShowSellCardModal, sellCardModalInfos } = useContext(SellCardModalContext);

    const { checkLocalStorage } = useContext(GlobalContext);
    //Function to sell card, pass card id and user id, after check storage and refresh collection page
    const sellCard = (cardID: string, userID: string) =>  {
        axios.post('/api/cards/sellCard',{cardID,userID})
        .then(() => {
            //Check storage to refresh userBar
            checkLocalStorage();
        })
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
                    <button disabled={btnIsDisabled} onClick={() => {
                        sellCard(sellCardModalInfos.cardID, sellCardModalInfos.userID)
                        setBtnIsDisabled(true)
                        setTimeout(() => {
                            setShowSellCardModal(false)
                            setBtnIsDisabled(false)
                        },1000)
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