import { createContext } from 'react';

type UserContextType = {
    userIsLog: boolean,
    userInfos:UserInfosType|null
}

type UserInfosType = {
    id: string,
    mail: string,
    pseudo: string,
    isAdmin: boolean,
    pokeCoin: number,
    cardsList:{}[]
}

export const UserContext = createContext<UserContextType>({
    userIsLog: false,
    userInfos: null
})