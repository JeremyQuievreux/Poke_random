// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import PokemonModel from '../../../models/Pokemon'
import UserModel from '../../../models/User'
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

    console.log("carte ID : " + cardID);
    console.log("user ID : " + userID);

    dbConnect()

    UserModel.findById(userID, (err: any, user: IUser) => {
      if (user) {
        let newCardsList = user.cardsList;
        const index = newCardsList.findIndex(card => card.card === cardID)
        //If the article is not in the array
        if (index == -1) {
          //Add the article in the cart context
          newCardsList = ([...newCardsList, {card: cardID, quantity: 1}])
        } else {
          newCardsList[index].quantity += 1
        }
        UserModel.updateOne({_id: userID}, {cardsList: newCardsList}, (err: any) => {
          res.status(200).send({error: false, message: "Card added to your cart"})          
        })
      }
    })
    

}

