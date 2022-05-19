import { createContext } from 'react';

type SellCardModalInfosType = {
    cardID: string;
    cardName: string;
    cardPrice: number;
    userID: string;
    userCoin: number;
}


type SellCardModalContextType = {
    showSellCardModal: boolean;
    setShowSellCardModal: (showBuyCardModal: boolean) => void;
    sellCardModalInfos: SellCardModalInfosType;
    setSellCardModalInfos: (buyCardModalInfos: SellCardModalInfosType) => void;
}
  
export const SellCardModalContext = createContext<SellCardModalContextType>({
    showSellCardModal: false,
    setShowSellCardModal: () => {},
    sellCardModalInfos: {cardID: '', cardName: '', cardPrice: 0, userID: '', userCoin: 0},
    setSellCardModalInfos: () => {}
})