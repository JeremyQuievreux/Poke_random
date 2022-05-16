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
  quantity: number,
}
export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    const {cardID, userID} = req.body

    dbConnect()
    //Find the pokemon card
    PokemonModel.findById(cardID, (err: any, pokemonCard: any) => {
      if (pokemonCard) {
        console.log("card found");
        //Find the user
        UserModel.findById(userID, (err: any, user: IUser) => {
          if (user) {
            console.log("user find");
            //Check if the user has enough pokecoin
            if(user.pokeCoin >= pokemonCard.price){
              console.log("assez de pokecoin");
              const newPokeCoin = user.pokeCoin - pokemonCard.price
              //Add the card to the user's card list
              let newCardsList = user.cardsList;
              const index = newCardsList.findIndex(card => card.card === cardID)
              //If the article is not in the array
              if (index == -1) {
              //Add the article in the cart context
              newCardsList = ([...newCardsList, {card: cardID, quantity: 1}])
              } else {
              newCardsList[index].quantity += 1
              }
              UserModel.updateOne({_id: userID}, {cardsList: newCardsList, pokeCoin: newPokeCoin}, (err: any) => {
              res.status(200).send({error: false, message: "Card added to your cart"})          
              })
            } else {
              console.log("pas assez de pokecoin");
              res.status(200).send({error: true, message: "not enouth pokecoin"})
            }
          
          } else {
            console.log("user not find");
            res.status(200).send({error: true, message: "user not found"})
          }
      })
    } else {
      console.log("card not found");
      res.status(200).send({error: true, message: "card not found"})
    }
  })
}
