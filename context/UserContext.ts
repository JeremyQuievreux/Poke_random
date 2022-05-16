import { createContext } from 'react';

type UserContextType = {
    userIsLog: boolean,
    userInfos:UserInfosType | null
}

type CardType = {
    card: string,
    quantity: number
}

type UserInfosType = {
    _id: string | any,
    mail: string,
    pseudo: string,
    isAdmin: boolean,
    pokeCoin: number | any,
    cardsList: CardType[]
}

export const UserContext = createContext<UserContextType>({
    userIsLog: false,
    userInfos: null
})