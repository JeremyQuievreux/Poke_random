import { createContext } from 'react';

import { UserInfosType } from '../types/UserInfosType';

type GlobalContextType = {
    userIsLogged: boolean,
    setUserIsLogged: (userIsLogged:boolean) => void,
    userFullInfos: UserInfosType | null,
    setUserFullInfos: (userFullInfos:UserInfosType) => void,
    checkLocalStorage: () => void,
}



export const GlobalContext = createContext<GlobalContextType>({
    userIsLogged: false,
    setUserIsLogged: () => {},
    userFullInfos: null,
    setUserFullInfos: () => {},
    checkLocalStorage: () => {},
})