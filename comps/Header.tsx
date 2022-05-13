import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/comps/Header.module.scss'
// Recupere le contexte de ModalContext
import { ModalContext } from '../context/ModalContext'
//component
const Header = () => {

  const { setIsLogModalOpen } = useContext(ModalContext)

  return (
    <div className={styles.navbar_container}>
      <Link href="/">
        <a>
          <div className={styles.navbar_logo}>
            <div className={styles.navbar_icon}>
              <Image src="/pokeball.png" width={40} height={40} />
            </div>
            <h1>Pokémon Click'n'Collect</h1>
          </div>
        </a>
      </Link>
      <nav>
        <Link href={"/"}>
          <a>Accueil</a>
        </Link>
        <Link href={"/shop"}>
          <a>Shop</a>
        </Link>
        <Link href={"/"}>
          <a onClick={(e) => {e.preventDefault(),setIsLogModalOpen(true)}}>
            Se Connecter
          </a>
        </Link>
      </nav>
    </div>
  )
}

export default Header
