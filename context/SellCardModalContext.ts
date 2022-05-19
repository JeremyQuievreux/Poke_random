import { createContext } from 'react';

type SellCardModalInfosType = {
    cardID: string;
    cardName: string;
    cardPrice: number;
    userID: string;
    userCoin: number;
}

type CardType = {
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


type SellCardModalContextType = {
    showSellCardModal: boolean;
    setShowSellCardModal: (showBuyCardModal: boolean) => void;
    sellCardModalInfos: SellCardModalInfosType;
    setSellCardModalInfos: (buyCardModalInfos: SellCardModalInfosType) => void;
    userCardsList: [CardType]|null;
    setUserCardsList: (userCardsList: [CardType]|null) => void;
    refreshUserCollection: (localToken:string|null) => void;
}
  
export const SellCardModalContext = createContext<SellCardModalContextType>({
    showSellCardModal: false,
    setShowSellCardModal: () => {},
    sellCardModalInfos: {cardID: '', cardName: '', cardPrice: 0, userID: '', userCoin: 0},
    setSellCardModalInfos: () => {},
    userCardsList: null,
    setUserCardsList: () => {},
    refreshUserCollection: () => {}
})