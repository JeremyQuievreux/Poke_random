import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/comps/Header.module.scss'

const Header: React.FC = () => {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar_logo}>
        <div className={styles.navbar_icon}>
          <Image src="/../public/pokeball.png" width={40} height={40} />
        </div>
        <h1>Pokémon Click'n'Collect</h1>
      </div>
      <nav>
        <Link href={"/"}><a>Accueil</a></Link>
        <Link href={"/"}><a>Shop</a></Link>
        <Link href={"/"}><a>Se Connecter</a></Link>
      </nav>
    </div>
  )
}

export default Header
