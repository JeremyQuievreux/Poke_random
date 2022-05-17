// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type DataType = {
  error: boolean,
  message: string,
  data?: any
}

type UserType = {
  pseudo: string;
  mail: string;
  password: string;
  isAdmin: boolean;
  pokeCoin: number;
  cardsList: CardType[]
}

type CardType = {
  card: string,
  quantity: number,
}
type PokemonType = {
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

import dbConnect from '../../../utils/dbConnect'
import UserModel from '../../../models/User'
import PokemonModel from '../../../models/Pokemon';

export default function handler(req: NextApiRequest, res: NextApiResponse<DataType>) {

  const userDI = req.query.userID

  UserModel.findById(userDI, (err:any, user:UserType) => {
    if (user){
      const cardsList = user.cardsList;
      const cardsIDList = cardsList.map(card => {
        return card.card
      })
      PokemonModel.find({_id: {$in: cardsIDList}}, (err:any, pokemons:PokemonType[]) => {
        if (pokemons) {
          res.status(200).send({error: false, message: "Success", data: pokemons})
        }
      })
    }
  })
}
