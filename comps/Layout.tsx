import React , { useContext, useState } from 'react'
import Footer from './Footer'

import Header from './Header'
import LogModal from './LogModal'
import UserBar from './UserBar'
//typage des props
type LayoutProps = {
    children: React.ReactNode,
}
//Recupere le contexte de ModalContext
import { ModalContext } from '../context/ModalContext'

import { UserContext } from '../context/UserContext'

import { BuyCardModalContext } from '../context/BuyCardModalContext'

import BuyCardModal from './BuyCardModal'
//component
const Layout = ({children}: LayoutProps) => {

    const { isLogModalOpen } = useContext(ModalContext)
    const { userIsLog } = useContext(UserContext)
    const { showBuyCardModal } = useContext(BuyCardModalContext)

    return (
        <div className='main-container'>
            {showBuyCardModal && <BuyCardModal/>}
            {isLogModalOpen && <LogModal/>}
            <Header />
            {userIsLog && <UserBar/>}
            { children }
            <Footer />
        </div>
    )
}

export default Layout