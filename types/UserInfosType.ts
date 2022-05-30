import { CollectionLineType } from "./CollectionLineType"

export type UserInfosType = {
    _id: string | any,
    mail: string,
    pseudo: string,
    password: string,
    isAdmin: boolean,
    pokeCoin: number | any,
    cardsList: [CollectionLineType],
    next_click: string,
    bonus_click: number,
}