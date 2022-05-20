// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const jwt = require('jsonwebtoken');

type DataType = {
  error: boolean,
  message: string,
  data?: any
}

import dbConnect from '../../../utils/dbConnect'
import UserModel from '../../../models/User'

export default function handler(req: NextApiRequest, res: NextApiResponse<DataType>) {
    dbConnect()

    const token = req.headers.authorization?.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        //token invalid
        if (err) {
            res.status(200).send({error: true, message: 'Invalid token'});
        //token valid    
        } else {

            UserModel.findById(decoded.id)
                .populate({ path: 'cardsList.card', model: 'pokemon' })
                .then((result) => {
                    res.status(200).send({error: false, message: 'ok', data: result})
                })
                .catch((err) => {
                    res.status(200).send({error: true, message: 'No user found'})
                })
            }
    })
}