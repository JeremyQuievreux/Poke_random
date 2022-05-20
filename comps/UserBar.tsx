//Base
import React, { useContext } from 'react'
import styles from '../styles/comps/UserBar.module.scss'
import { MdCatchingPokemon } from "react-icons/md";
import { BsCoin } from "react-icons/bs";
//Context
import { UserContext } from '../context/UserContext'

const UserBar = () => {
  //Context
  const { userInfos } = useContext(UserContext)

  const alreadyGotCards = userInfos?.cardsList.filter((card) => card.quantity > 0)

  return (
    <div className={styles.userbar_container}>
        <p><MdCatchingPokemon  className={styles.ball_icon}/> {alreadyGotCards?.length} / 151 </p>
        <p>Bienvenue : {userInfos?.pseudo}</p>
        <p>{userInfos?.pokeCoin} <BsCoin className={styles.coin_icon}/></p>
    </div>
  )
}

export default UserBar