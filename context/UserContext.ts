import { createContext } from 'react';

type UserContextType = {
    userIsLog: boolean,
    userInfos:UserInfosType | null
}

import { UserInfosType } from '../types/UserInfosType';


export const UserContext = createContext<UserContextType>({
    userIsLog: false,
    userInfos: null
})