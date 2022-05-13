import { createContext } from 'react';

type UserContextType = {
    userIsLog: boolean,
    userInfos:{}|null
}

export const UserContext = createContext<UserContextType>({
    userIsLog: false,
    userInfos: {}
})