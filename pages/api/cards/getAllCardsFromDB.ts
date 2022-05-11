// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import PokemonModel from '../../../models/Pokemon'
import dbConnect from '../../../utils/dbConnect'

type Data = {
  error: boolean,
  data: {}[]
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {

    dbConnect()

    PokemonModel.find({})
      .then((response) => {
        res.send({error: false, data: response})
      })
}
