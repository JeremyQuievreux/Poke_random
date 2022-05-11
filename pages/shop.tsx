//Base React + Componsant Image de Next.js
import React from 'react'
import Image from 'next/image'
// Style
import styles from '../styles/pages/Shop.module.scss'
//Surcouche TypeScript de Next.js
import { GetStaticProps } from 'next'
//Connect DB + Model
import PokemonModel from '../models/Pokemon'
import dbConnect from '../utils/dbConnect'
//Fetch data before render
export const getStaticProps: GetStaticProps = async () => {
  dbConnect();
  
  const data = await PokemonModel.find({});

  return {
    props: {
      cards: JSON.parse(JSON.stringify(data))
    }
  }
}

//types
interface IPokemon {
  _id: string;
  gen: number;
  dex_number: number;
  name: string;
  type: string[];
  description: string;
  picURL: string;
  price: number;
  height: number;
  weight: number;
  rarity: string;
}

interface ShopProps  {
  cards: IPokemon[]
}

const Shop = ({cards}: ShopProps) => {

  return (
    <div className={styles.shop_container}>
        <h2>Shop Page</h2>
        {cards.map((card) => {
          return (
            <div key={card._id}>
              <h3>{card.name}</h3>
              <Image src={card.picURL} width={200} height={200} />
            </div>
          )
        })}
    </div>
  )
}
export default Shop
