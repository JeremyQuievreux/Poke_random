import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../utils/dbConnect'
import UserModel from '../../../models/User'

type Data = {
    error: boolean,
    message: string,
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { pseudo, mail, password } = req.body;

    dbConnect()

    UserModel.create({
        pseudo,
        mail,
        password
    })
        .then(() => {
            res.status(200).json({error: false, message: "User created"});
        })
    console.log(req.body);
    
    //res.status(200).json({error: false, message: "User created"});
}
