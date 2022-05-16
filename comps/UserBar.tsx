import React, { useContext } from 'react'

import styles from '../styles/comps/UserBar.module.scss'

import { UserContext } from '../context/UserContext'

import { MdCatchingPokemon } from "react-icons/md";
import { BsCoin } from "react-icons/bs";


const UserBar = () => {

  const { userInfos } =useContext(UserContext)

  return (
    <div className={styles.userbar_container}>
        <p><MdCatchingPokemon  className={styles.ball_icon}/> {userInfos?.cardsList.length} / 151 </p>
        <p>Bienvenue : {userInfos?.pseudo}</p>
        <p>{userInfos?.pokeCoin} <BsCoin className={styles.coin_icon}/></p>
    </div>
  )
}

export default UserBar