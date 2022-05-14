import React , { useContext } from 'react'
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
//component
const Layout = ({children}: LayoutProps) => {

    const { isLogModalOpen } = useContext(ModalContext)
    const { userIsLog } = useContext(UserContext)

    return (
        <div className='main-container'>
            <Header />
            {userIsLog && <UserBar/>}
            { children }
            {isLogModalOpen && <LogModal/>}
            <Footer />
        </div>
    )
}

export default Layout