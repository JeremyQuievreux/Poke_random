import { createContext } from 'react';

import { SellCardModalInfosType } from '../types/SellCardModalInfosType';

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
    setSellCardModalInfos: () => {},
})