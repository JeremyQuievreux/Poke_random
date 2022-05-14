import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../utils/dbConnect'
import UserModel from '../../../models/User'

type Data = {
    error: boolean,
    message: string,
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
}
