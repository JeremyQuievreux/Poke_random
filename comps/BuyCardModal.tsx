//base
import React, { useContext } from 'react'
import styles from '../styles/comps/BuyCardModal.module.scss'
import axios from 'axios';
//context
import { BuyCardModalContext } from '../context/BuyCardModalContext';
import { ModalContext } from '../context/ModalContext';
import { GlobalContext } from '../context/GlobalContext';

const BuyCardModal = () => {
    //set context 
    const { setShowBuyCardModal, buyCardModalInfos } = useContext(BuyCardModalContext);
    const { setIsLogModalOpen } = useContext(ModalContext);
    
    const { userIsLogged, hardRefresh } = useContext(GlobalContext);

    const haveMoney = buyCardModalInfos.userCoin >= buyCardModalInfos.cardPrice;
    //function to buy card, pass card id and user id, after check storage
    const buycard = (cardID: string, userID: string) =>  {
        axios.post('/api/cards/buyCard',{cardID,userID})
        .then(() => {
            hardRefresh();
        })
    }
    //function who return conditional content of modal
    const modalRender = () => {
        if(userIsLogged){
            if (haveMoney) {
                return (<>
                        <div className={styles.modal_header}>
                            <h2>Confirmation achat</h2>
                        </div>
                        <div className={styles.modal_body}>
                            <p>Voulez vous acheter cette carte de {buyCardModalInfos.cardName} ?</p>
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
                        <p>Vous devez être connecté ou créer un compte pour acheter cette carte</p>
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