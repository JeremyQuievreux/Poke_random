import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../utils/dbConnect'
import UserModel from '../../../models/User'
import PokemonModel from '../../../models/Pokemon';

const bcrypt = require('bcrypt');
const salt = 10

type Data = {
    error: boolean,
    message: string,
}

type CardType = {
    card: string,
    dex_number: number,
    quantity: number,
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { pseudo, mail, mailConfirm, password } = req.body;

    /* if (pseudo === " " || mail === " " || password === " " || mailConfirm === " ") {
        res.status(200).send({error: true, message: "Veuillez remplir tous les champs"})
    } */
    //verifie que les mails sont identiques
    if (mail !== mailConfirm) {
        res.status(200).send({error: true, message: "Les mails ne correspondent pas"})
    } else {
        
        dbConnect()

        //verifie que le pseudo n'existe pas déjà
        UserModel.findOne({ pseudo: pseudo }, (err: string, user :{}) => {
            if (user === null) {
                //verifie que le mail n'existe pas déjà
                UserModel.findOne({ mail: mail }, (err: string, user: {}) => {
                    if (user === null){
                        //hashage du mot de passe
                        const hashPassword = bcrypt.hashSync(password, salt)
                        //création du nouvel utilisateur
                        PokemonModel.find({})
                        .then((pokemons) => {
                            const tempList:CardType[] = []
                            pokemons.forEach((pokemon) => {
                                tempList.push({
                                    card: pokemon._id,
                                    dex_number: pokemon.dex_number,
                                    quantity: 0,
                                })
                            })
                            UserModel.create({
                                pseudo,
                                mail,
                                password: hashPassword,
                                cardsList: tempList,
                            })
                            .then(() => {
                                res.status(200).json({error: false, message: "Votre compte a bien été créé"});
                            })
                        })
                    } else {
                        res.status(200).send({error: true, message: "Ce mail est déjà utilisé"})
                    }
                })
            } else {
                res.status(200).send({error: true, message: "Ce pseudo existe déjà"})
            }
        })
    }
}
