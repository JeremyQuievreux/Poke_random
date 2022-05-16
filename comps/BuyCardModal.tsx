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

    const haveMoney = buyCardModalInfos.userCoin >= buyCardModalInfos.cardPrice;

    const buycard = (cardID: string, userID: string) =>  {
        console.log("card id : " + cardID + " userID : " + userID);
        axios.post('/api/cards/buyCard',{cardID,userID})
        .then(res => {
            console.log(res.data);
            checkStorageFunction();
        })
    }

    const modalRender = () => {
        if(userIsLog){
            if (haveMoney) {
                return (<>
                        <div className={styles.modal_header}>
                            <h2>Confirmation achat</h2>
                        </div>
                        <div className={styles.modal_body}>
                            <p>Voulez vous acheter cette la carte de {buyCardModalInfos.cardName} ?</p>
                        </div>
                        <div className={styles.modal_footer}>
                            <button onClick={() => {
                                buycard(buyCardModalInfos.cardID, buyCardModalInfos.userID)
                                setShowBuyCardModal(false)
                            }
                            }>OUI</button>
                            <button onClick={() => setShowBuyCardModal(false)}>NON</button>
                        </div>
                    </>)
            } else {
                return (<>
                        <div className={styles.modal_header}>
                            <h2>Probleme budgétaire</h2>
                        </div>
                        <div className={styles.modal_body}>
                            <p>Vous n'avez pas assez d'argent pour acheter cette carte</p>
                        </div>
                        <div className={styles.modal_footer}>
                            <button onClick={() => setShowBuyCardModal(false)}>Fermer</button>
                        </div>
                    </>)
            }
        } else {
            return (<>
                    <div className={styles.modal_header}>
                        <h2>Connection requise</h2>
                    </div>
                    <div className={styles.modal_body}>
                        <p>Vous devez être connecté pour acheter une carte</p>
                    </div>
                    <div className={styles.modal_footer}>
                        <button onClick={() => {
                            setShowBuyCardModal(false)
                            setIsLogModalOpen(true)
                        }}>Se Connecter</button>
                    </div>
                </>)
        }
    }


  return (
        <div className={styles.buyCardModal_externe} onClick={() => setShowBuyCardModal(false)}>
            <div className={styles.buyCardModal_interne} onClick={(e) => e.stopPropagation()}>
                <button className={styles.close_button} onClick={() => setShowBuyCardModal(false)}>X</button>
                {modalRender()}
            </div>
        </div>
    )
}

export default BuyCardModal