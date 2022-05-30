// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const jwt =require('jsonwebtoken')

import  UserModel from '../../../models/User'
import  PokemonModel from '../../../models/Pokemon'
import TransactionModel from '../../../models/Transaction'

type Data = {
    error: boolean,
    message: string|number,
    data?: any
}

type UserType = {
    _id: string,
    pseudo: string;
    mail: string;
    password: string;
    isAdmin: boolean;
    pokeCoin: number;
    cardsList: CardType[]
  }
  type CardType = {
    card: string,
    dex_number: number,
    quantity: number,
  }

  type test = {
    card: string,
    dex_number: number,
    quantity: number,
  }

const setPokemonArrayIndex = (pokemons:any) => {
    const numberOfPokemons = pokemons.length;
    const index = Math.floor(Math.random() * (numberOfPokemons))
    return index
}

const lafonction = (res: NextApiResponse<Data>, rarity: string, user:UserType, new_next_click:any) => {
    PokemonModel.find({rarity: rarity}, (err: any, pokemons: any) => {
        if (err) {
            res.status(200).send({error: true, message: 'No Pokemon Found'});
        } else {
            console.log("dans la fonction : " + new_next_click);
            
            // chiffre random par rapport a l'array des pokemons d'une certaine rareté
            const randomIndex = setPokemonArrayIndex(pokemons)
            // pokemon random
            const randomPokemon = pokemons[randomIndex]
            // dulication de la liste des cards du user
            const tempList: test[] = user.cardsList
            // recherche dans la liste des cards du user si le pokemon existe déjà et sort un index
            const index = tempList.findIndex((cardline) => cardline.dex_number === randomPokemon.dex_number)
            //si le pokemon n'exite pas
            if(index == -1){
                //ajout du pokemon dans la liste des cards du user
                tempList.push({
                card: randomPokemon._id,
                dex_number: randomPokemon.dex_number,
                quantity: 1
              })
            } else {
                //si le pokemon existe déjà
                //modification de la quantité du pokemon dans la liste des cards du user
                tempList[index].quantity += 1
            }
            // tri de la liste des cards du user par ordre croissant du dex_number
            const orderedList = tempList.sort((a, b) => (a.dex_number > b.dex_number) ? 1 : -1)
            //update du profil du user
            UserModel.updateOne({_id: user._id }, {cardsList: orderedList, next_click:new_next_click}, (err: any) => {
              if(!err){
                  //si pas d'erreur ajout d'une transaction dans la bdd
                    TransactionModel.create({
                    userID: user._id,
                    userName: user.pseudo,
                    type: "random",
                    cardID: randomPokemon._id,
                    cardName: randomPokemon.name
                })
                .then(() => {
                  res.send({error: false, message:"Card added to user's collection"})
                })
              }
            })
        }
    })
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    const token = req.headers.authorization?.split(' ')[1];
    const new_next_click = req.query.next_click

    

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            res.status(200).send({error: true, message: 'Invalid token'});
        } else {
            const userID = decoded.id;
            UserModel.findById(userID, (err: any, user: UserType) => {
                if (err) {
                    res.status(200).send({error: true, message: 'No User Found'});
                } else {
                    //random number between 1 and 10
                    const rarity = Math.floor(Math.random() * (10 - 1 + 1)) + 1
                    if (rarity >= 1 && rarity <= 4) {
                        lafonction(res, "Commune", user, new_next_click)
                        
                    } else if (rarity >= 5 && rarity <= 7) {
                        lafonction(res, "Peu Commune", user, new_next_click)
                        
                    } else if (rarity >= 8 && rarity <= 9) {
                        lafonction(res, "Rare", user, new_next_click)

                    } else if (rarity === 10) {
                        lafonction(res, "Légendaire", user, new_next_click)
                    }
                }
            })
        }
    })
}
