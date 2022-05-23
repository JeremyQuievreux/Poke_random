//base
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/comps/Header.module.scss'
//Context
import { ModalContext } from '../context/ModalContext'

import { GlobalContext } from '../context/GlobalContext'

//component
const Header = () => {

  const router = useRouter()
  const { setIsLogModalOpen } = useContext(ModalContext)
  const { userIsLogged, checkLocalStorage } = useContext(GlobalContext)

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
          <a>Boutique</a>
        </Link>
        {userIsLogged && 
          <Link href={"/profil"}>
            <a>Profil</a>
          </Link>
        }
        {userIsLogged && 
          <Link href={"/collection"}>
            <a>Ma Collection</a>
          </Link>
        }
        {userIsLogged 
        ? 
        <Link href={"/"}>
          <a onClick={(e) => {
            e.preventDefault()
            localStorage.removeItem("@pkm-cnc")
            checkLocalStorage()
            router.push({
              pathname: '/'
          })
          }}>
            Déconnection
          </a>
        </Link> 
        :
        <Link href={"/"}>
        <a onClick={(e) => {e.preventDefault(),setIsLogModalOpen(true)}}>
          Se Connecter
        </a>
        </Link>
        }
      </nav>
    </div>
  )
}

export default Header
