import { createContext } from 'react';

type UserContextType = {
    userIsLog: boolean,
    userInfos:UserInfosType | null
}

type UserInfosType = {
    _id: string | any,
    mail: string,
    pseudo: string,
    isAdmin: boolean,
    pokeCoin: number | any,
    cardsList: [CardType2]
}

type CardType2 = {
    card: PokemonType,
    dex_number: number,
    quantity: number
  }

  type PokemonType = {
    _id: string;
    gen: number;
    dex_number: number;
    name: string;
    type: string[];
    description: string;
    picURL: string;
    price: number;
    height: number;
    weight: number;
    rarity: string;
  }

export const UserContext = createContext<UserContextType>({
    userIsLog: false,
    userInfos: null
})