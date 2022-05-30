import type { NextPage } from 'next'
import { useContext } from 'react'
import Head from 'next/head'
import styles from '../styles/pages/Home.module.scss'

import { GlobalContext } from '../context/GlobalContext'
import axios from 'axios'

const Home: NextPage = () => {

  const { userIsLogged, checkLocalStorage } = useContext(GlobalContext)

  const GetRandomCard = () => {
    const localToken = localStorage.getItem('@pkm-cnc')
    axios.get(`/api/cards/getRandomCard`, {
      headers: {
        'Authorization': `Bearer ${localToken}`
      }
    })
    .then(res => {
      checkLocalStorage()
    })
  }

  return (
    <div className={styles.home_container}>
      <Head>
        <title>Pokémon Click N Collect | Accueil</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/pokeball2.png" />
      </Head>
      <h2>Bienvenue sur Pokemon Click'n'Collect</h2>
      <div className={styles.home_block}>
        <h4>Qu'est ce que Pokemon Click'n'Collect ?</h4>
        <p>- Le site a pour but de vous permettre de vous amuser à completer une collection virtuelle de cartes Pokemon &#40;le PokéCardex&#41;.</p>
      </div>
      <div className={styles.home_block}>
        <h4>Comment faire pour avoir de cartes ?</h4>
        <p>- En vous connectant régulierement vous pouvez obtenir une carte aléatoire parmis toute la collection &#40;151 cartes&#41;</p>
        <p>- En les achetants dans la boutique avec vos PokéCoins, qui est la monnaie virtuelle de Pokemon Click'N'Collect</p>
      </div>
      <div className={styles.home_block}>
        <h4>Comment avoir des PokéCoins ?</h4>
        <p>- En obtenant des cartes de maniere aléatoire , il y des chances que vous receviez une carte que vous possédez deja. En allant dans votre collection vous pourrez revendre les cartes que vous avez en "double" et ainsi recupérer une certaine quantité de PokéCoins.</p>
        <p>- Lors de certains événements saisonnier il vous sera possible de recupérer une quantité bonus de PokéCoins.</p>
      </div>
      <div className={styles.home_block}>
        <p className={styles.home_signature}>Bonne chance a vous, collectionnez les tous. Prof. Hÿllen</p>
      </div>
      {/* {userIsLogged &&
      <>
      <p><button onClick={() => GetRandomCard()}>Get 1 Random Card</button> &laquo;-----Bouton de test</p>   
      <p>A chaque click un pokemon random sera ajouté a la collection</p>
      </>
      } */}
    </div>
  )
}

export default Home
