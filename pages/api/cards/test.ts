// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import UserModel from '../../../models/User'

import {UserInfosType} from "../../../types/UserInfosType"

const {DateTime} = require('luxon')

const jwt = require('jsonwebtoken')

type Data = {
  error: boolean,
  message: string,
  data?:any
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    const token = req.headers.authorization?.split(' ')[1];
    const new_next_click = req.query.next_click
    

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        if(err){
            res.status(200).send({error: true, message: "invalid token"})
        }else {
            UserModel.findById(decoded.id, (err: any, user:UserInfosType) => {

                if(err){
                    res.status(200).send({error:true, message: "user not found"})
                } else {
                    UserModel.updateOne({_id: decoded.id }, {next_click: new_next_click}, (err: any) => {
                        res.status(200).send({error: false, message: "user update"})
                    })
                }
            })
        }
    })
    
}
