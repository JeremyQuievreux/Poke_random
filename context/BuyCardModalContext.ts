import { createContext } from 'react';

type BuyCardModalInfosType = {
    cardID: string;
    cardName: string;
    cardPrice: number;
    userID: string;
    userCoin: number;
}


type BuyCardModalContextType = {
    showBuyCardModal: boolean;
    setShowBuyCardModal: (showBuyCardModal: boolean) => void;
    buyCardModalInfos: BuyCardModalInfosType;
    setBuyCardModalInfos: (buyCardModalInfos: BuyCardModalInfosType) => void;
}
  
export const BuyCardModalContext = createContext<BuyCardModalContextType>({
    showBuyCardModal: false,
    setShowBuyCardModal: () => {},
    buyCardModalInfos: {cardID: '', cardName: '', cardPrice: 0, userID: '', userCoin: 0},
    setBuyCardModalInfos: () => {}
})