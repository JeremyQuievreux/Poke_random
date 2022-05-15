import { createContext } from 'react';

type UserContextType = {
    userIsLog: boolean,
    userInfos:UserInfosType | null,
}

type UserInfosType = {
    _id: string | any,
    mail: string,
    pseudo: string ,
    isAdmin: boolean,
    pokeCoin: number,
    cardsList:{}[]
}

export const UserContext = createContext<UserContextType>({
    userIsLog: false,
    userInfos: {_id: "", mail: "", pseudo: "", isAdmin: false, pokeCoin: 0, cardsList: []}
})