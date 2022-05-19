// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import PokemonModel from '../../../models/Pokemon'
import UserModel from '../../../models/User'
import TransactionModel from '../../../models/Transaction'
import dbConnect from '../../../utils/dbConnect'

type Data = {
  error: boolean,
  message: string,
  data?: {}
}
interface IUser {
      pseudo: string;
      mail: string;
      password: string;
      isAdmin: boolean;
      pokeCoin: number;
      cardsList: test[]
}
type test = {
  card: string,
  dex_number: number,
  quantity: number,
}
export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
  const {cardID, userID} = req.body

  dbConnect()
  //Find the pokemon card
  PokemonModel.findById(cardID, (err: any, pokemonCard: any) => {
    //si pokemon ok
    if (pokemonCard) {
      console.log("card found : " + pokemonCard.name);
      console.log("dex number : " + pokemonCard.dex_number);
      UserModel.findById(userID, (err: any, user: any) => {
        if(user){
          console.log("user found : " + user.pseudo);
            const newPokeCoin = user.pokeCoin + pokemonCard.price
            const tempList: test[] = user.cardsList
            const index = tempList.findIndex(cardline => cardline.dex_number == pokemonCard.dex_number)
            console.log("index : " + index);
              tempList[index].quantity -= 1
            UserModel.updateOne({_id: userID}, {cardsList: tempList, pokeCoin: newPokeCoin}, (err: any) => {
              if(!err){
                res.send({error: false, message: "Card added to user's collection"})
              }
            })
      } else {
        res.send({error: false, message: "user not found"})
      }
    })
    } else {
      res.status(200).send({error: true, message: "card not found"})
    }
  })
}
