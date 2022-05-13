import type { NextPage } from 'next'
import { useContext } from 'react'
import Head from 'next/head'
import styles from '../styles/pages/Home.module.scss'

import { UserContext } from '../context/UserContext'

const Home: NextPage = () => {

  const { userIsLog } = useContext(UserContext)

  return (
    <div className={styles.home_container}>
      <Head>
        <title>Poké Random | Accueil</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/pokeball2.png" />
      </Head>
      <h2>Home</h2>
      {userIsLog ? <p>Vous êtes connecté</p> : <p>Vous n'êtes pas connecté</p>}     
    </div>
  )
}

export default Home
