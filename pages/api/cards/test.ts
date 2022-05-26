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

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        if(err){
            res.status(200).send({error: true, message: "invalid token"})
        }else {
            UserModel.findById(decoded.id, (err: any, user:UserInfosType) => {
                const dtBase = user.next_click
                console.log(dtBase);
                

                const hydrateDT = DateTime.fromFormat(dtBase, "yyyy-MM-dd HH:mm:ss").plus({hours:1})

                const new_next_click = hydrateDT.toFormat('yyyy-MM-dd HH:mm:ss')                

                console.log(new_next_click);
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
