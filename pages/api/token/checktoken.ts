import type { NextApiRequest, NextApiResponse } from 'next'

const jwt = require('jsonwebtoken');

type Data = {
    error: boolean,
    message: string,
    data?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const token = req.headers.authorization?.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            res.status(200).send({error: true, message: 'Invalid token'});
        } else {
            res.status(200).send({error: false, message: 'Valid token'});
        }
    })
}
