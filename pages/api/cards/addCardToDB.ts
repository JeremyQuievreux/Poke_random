import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../utils/dbConnect'
import PokemonModel from '../../../models/Pokemon'

type Data = {
    error: boolean,
    message: string,
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { gen, dex_number, name, type1, type2, description, picURL, price, height, weight, rarity} = req.body;

    const typeCheck = (type1: string, type2: string) =>{
        if (type2 === "") {
            return [type1];
        } else {
            return [type1, type2];
        }
    }

    dbConnect()

    PokemonModel.create({
        gen,
        dex_number,
        name,
        type : typeCheck(type1, type2),
        description,
        picURL,
        price,
        height,
        weight,
        rarity
    })
        .then(() => {
            res.status(200).send({error: false, message: "pokemon created"});
        })
        .catch(err => {
            res.status(200).send({error: true, message: err.message});
        })
}
