import React from 'react'

import styles from '../styles/comps/UserBar.module.scss'

const UserBar = () => {
  return (
    <div className={styles.userbar_container}>
        <p>PokeCardex : 0 / 151 </p>
        <p>Bienvenue : Username</p>
        <p>1000 : PokeCoins</p>
    </div>
  )
}

export default UserBar