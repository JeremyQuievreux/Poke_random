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
      UserModel.findById(userID, (err: any, user: any) => {
        if(user){
          if(user.pokeCoin >= pokemonCard.price){
            const newPokeCoin = user.pokeCoin - pokemonCard.price
            const tempList: test[] = user.cardsList
            const index = tempList.findIndex(cardline => cardline.dex_number == pokemonCard.dex_number)
            if(index == -1){
              tempList.push({
                card: pokemonCard._id,
                dex_number: pokemonCard.dex_number,
                quantity: 1
              })
            } else {
              tempList[index].quantity += 1
            }
            const orderedList = tempList.sort((a, b) => (a.dex_number > b.dex_number) ? 1 : -1)
            UserModel.updateOne({_id: userID}, {cardsList: orderedList, pokeCoin: newPokeCoin}, (err: any) => {
              if(!err){
                TransactionModel.create({
                  userID: userID,
                  userName: user.pseudo,
                  type: "buy",
                  cardID: cardID,
                  cardName: pokemonCard.name
                })
                .then(() => {
                  res.send({error: false, message: "Card added to user's collection"})
                })
              }
            })
          } else {
            res.send({error: true, message: "Not enough PokeCoin"})
          }
      } else {
        res.send({error: false, message: "user not found"})
      }
    })
    } else {
      res.status(200).send({error: true, message: "card not found"})
    }
  })
}
