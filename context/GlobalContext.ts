import { createContext } from 'react';
import { PokemonType } from '../types/PokemonType';

import { UserInfosType } from '../types/UserInfosType';

type GlobalContextType = {
    userIsLogged: boolean,
    setUserIsLogged: (userIsLogged:boolean) => void,
    userFullInfos: UserInfosType | null,
    setUserFullInfos: (userFullInfos:UserInfosType) => void,
    checkLocalStorage: () => void,
    showGetRandomCardModal: boolean,
    setShowGetRandomCardModal: (showGetRandomCardModal:boolean) => void,
    randomCardModalInfos: PokemonType|null,
    setRandomCardModalInfos: (randomCardModalInfos:PokemonType|null) => void,
}



export const GlobalContext = createContext<GlobalContextType>({
    userIsLogged: false,
    setUserIsLogged: () => {},
    userFullInfos: null,
    setUserFullInfos: () => {},
    checkLocalStorage: () => {},
    showGetRandomCardModal: false,
    setShowGetRandomCardModal: () => {},
    randomCardModalInfos: null,
    setRandomCardModalInfos: () => {},
})