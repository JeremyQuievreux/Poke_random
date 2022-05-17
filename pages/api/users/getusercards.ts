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

  dbConnect();

  UserModel.findById(userDI)
  .populate({ path: 'cardsList.card', model: 'pokemon' })
  .then((resultat) => {
    res.send({error: false, message: 'ok', data: resultat})
  })
}