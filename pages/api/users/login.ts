import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../utils/dbConnect'
import UserModel from '../../../models/User'

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

type Data = {
    error: boolean,
    message: string,
    data?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { mail, password } = req.body;

    dbConnect()

    UserModel.findOne({ mail: mail }, (err: string, user: {password : string, _id: string}) => {
        if (user === null) {
            res.status(200).send({error: true, message: "Ce mail n'existe pas"})
        } else {
            const hashPassword = user.password
            const comparePassword = bcrypt.compareSync(password, hashPassword)
            if (comparePassword) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 5})
                res.status(200).send({error: false, message: "Vous êtes connecté", data: token})
            } else {
                res.status(200).send({error: true, message: "Mot de passe incorrect"})
            }
        }
    }
    )
}
