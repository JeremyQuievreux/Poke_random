import React, { useContext } from 'react'
import Image from 'next/image';

import styles from '../styles/comps/Card.module.scss'

import { setBGColor } from '../utils/BGColorFunction';
import { setPKBColor } from '../utils/PKBColor';

import { PokemonType } from '../types/PokemonType';

import { MdCatchingPokemon } from "react-icons/md";

type CardComponantProps = {
    card: PokemonType,
}

const Card = ({card}:CardComponantProps) => {

    const type = card.type[0]

  return (
      <div className={styles.card_main_container}>
        <div className={styles.card_container}>
            <div className={styles.decoration_border}>
                <div className={styles.card_header} style={{backgroundColor: setBGColor(type)}}>
                    <p>N° {card.dex_number}</p>
                    <p>{card.name}</p>
                </div>
                <div className={styles.card_body}>
                    <MdCatchingPokemon className={styles.rarity_icon} style={{color: setPKBColor(card.rarity)}}/>
                    <img src={card.picURL} width={200} height={200} />
                </div>
                <div className={styles.card_typeline}>
                    {card.type.map((type, index) => {
                        return <p key={index} className={styles.type_square} style={{backgroundColor: setBGColor(type)}}>
                                    {type}
                                </p>
                    })}
                </div>
                <div className={styles.card_footer} style={{backgroundColor: setBGColor(type)}}>
                    <p><span className={styles.infos}>Taille : </span>{card.height / 100} m </p>
                    <p><span className={styles.infos}>Poids : </span>{card.weight / 1000} Kg</p>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Card