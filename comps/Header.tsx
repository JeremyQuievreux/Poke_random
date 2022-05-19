//base
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/comps/Header.module.scss'
//Context
import { ModalContext } from '../context/ModalContext'
import { CheckStorageContext } from '../context/CheckStorageContext'
import { UserContext } from '../context/UserContext'

//component
const Header = () => {

  const router = useRouter()
  const { setIsLogModalOpen } = useContext(ModalContext)
  const { checkStorageFunction } = useContext(CheckStorageContext)
  const { userIsLog, userInfos } = useContext(UserContext)

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
        {userIsLog && 
          <Link href={"/profil"}>
            <a>Profil</a>
          </Link>
        }
        {userIsLog && 
          <Link href={"/collection"}>
            <a>Collection</a>
          </Link>
        }
        {userIsLog 
        ? 
        <Link href={"/"}>
          <a onClick={(e) => {
            e.preventDefault()
            localStorage.removeItem("@pkm-cnc")
            checkStorageFunction()
            router.push({
              pathname: '/'
          })
          }}>
            Log Out
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
