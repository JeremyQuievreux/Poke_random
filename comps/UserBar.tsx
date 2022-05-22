//Base
import React, { useContext } from 'react'
import styles from '../styles/comps/UserBar.module.scss'
import { MdCatchingPokemon } from "react-icons/md";
import { BsCoin } from "react-icons/bs";
//Context
import { GlobalContext } from '../context/GlobalContext';

const UserBar = () => {
  //Context
  const { userFullInfos } = useContext(GlobalContext)

  const alreadyGotCards = userFullInfos?.cardsList.filter((card) => card.quantity > 0)

  return (
    <div className={styles.userbar_container}>
        <p><MdCatchingPokemon  className={styles.ball_icon}/> {alreadyGotCards?.length} / 151 </p>
        <p>Bienvenue : {userFullInfos?.pseudo}</p>
        <p>{userFullInfos?.pokeCoin} <BsCoin className={styles.coin_icon}/></p>
    </div>
  )
}

export default UserBar