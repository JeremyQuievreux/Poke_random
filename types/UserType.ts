import { CardType } from "./CardType";

export type UserType = {
    pseudo: string;
    mail: string;
    password: string;
    isAdmin: boolean;
    pokeCoin: number;
    cardsList: CardType[];
    next_click: string;
  }