import React, {useContext} from 'react'
import styles from '../styles/comps/RandomCardModal.module.scss'

import { GlobalContext } from '../context/GlobalContext';
import Card from './Card';

const RandomCardModal = () => {

    const { setShowGetRandomCardModal, randomCardModalInfos } = useContext(GlobalContext);
  return (
    <div className={styles.randomCardModal_externe} onClick={() => setShowGetRandomCardModal(false)}>
    <div className={styles.randomCardModal_interne} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_button} onClick={() => setShowGetRandomCardModal(false)}>X</button>
        <div className={styles.modal_header}>
            <h2>Vous avez obtenue cette carte </h2>
        </div>
        {randomCardModalInfos && <Card card={randomCardModalInfos} />}
    </div>
</div>
  )
}

export default RandomCardModal