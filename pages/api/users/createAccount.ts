import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    error: boolean,
    message: string,
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    console.log(req.body);
    res.status(200).send({ error: false, message: `requete recu` });
}
