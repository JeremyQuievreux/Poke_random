import { createContext } from 'react';

import { SellCardModalInfosType } from '../types/SellCardModalInfosType';

import { CollectionLineType } from '../types/CollectionLineType';

type SellCardModalContextType = {
    showSellCardModal: boolean;
    setShowSellCardModal: (showBuyCardModal: boolean) => void;
    sellCardModalInfos: SellCardModalInfosType;
    setSellCardModalInfos: (buyCardModalInfos: SellCardModalInfosType) => void;
    userCardsList: [CollectionLineType]|null;
    setUserCardsList: (userCardsList: [CollectionLineType]|null) => void;
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