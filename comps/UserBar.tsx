import React, { useContext } from 'react'

import styles from '../styles/comps/UserBar.module.scss'

import { UserContext } from '../context/UserContext'

const UserBar = () => {

  const { userInfos } =useContext(UserContext)

  return (
    <div className={styles.userbar_container}>
        <p>PokeCardex : {userInfos?.cardsList.length} / 151 </p>
        <p>Bienvenue : {userInfos?.pseudo}</p>
        <p>{userInfos?.pokeCoin} : PokeCoins</p>
    </div>
  )
}

export default UserBar