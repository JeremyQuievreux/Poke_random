import type { NextApiRequest, NextApiResponse } from 'next'

const jwt = require('jsonwebtoken');

import dbConnect from '../../../utils/dbConnect'
import UserModel from '../../../models/User'

type Data = {
    error: boolean,
    message: string,
    data?: {}
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const token = req.headers.authorization?.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            res.status(200).send({error: true, message: 'Invalid token'});
        } else {

            dbConnect();

            UserModel.findOne({_id: decoded.id}, (err: any, user: any) => {
                if (user){
                    const tempUser = {
                        _id: user._id,
                        pseudo: user.pseudo,
                        mail: user.mail,
                        isAdmin: user.isAdmin,
                        pokeCoin: user.pokeCoin,
                        cardsList: user.cardsList
                    }
                    res.status(200).send({error: false, message: 'User found', data: tempUser});
                } else {
                    res.status(200).send({error: true, message: 'User not found'});
                }
            })
        }
    })
}
