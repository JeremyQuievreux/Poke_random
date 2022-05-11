import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../utils/dbConnect'
import UserModel from '../../../models/User'

const bcrypt = require('bcrypt');
const salt = 10

type Data = {
    error: boolean,
    message: string,
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { pseudo, mail, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, salt)

    /* dbConnect()

    UserModel.create({
        pseudo,
        mail,
        password: hashPassword,
    })
        .then(() => {
            res.status(200).json({error: false, message: "User created"});
        })
    console.log(req.body); */
    
    res.status(200).json({error: false, message: "User created"});
    //res.status(200).json({error: false, message: "User created"});
}
