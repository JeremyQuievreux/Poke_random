import React , { useContext } from 'react'
import Footer from './Footer'

import Header from './Header'
import LogModal from './LogModal'
//typage des props
type LayoutProps = {
    children: React.ReactNode,
}
//Recupere le contexte de ModalContext
import { ModalContext } from '../context/ModalContext'
//component
const Layout = ({children}: LayoutProps) => {

    const { isLogModalOpen } = useContext(ModalContext)

    return (
        <div className='main-container'>
            <Header />
            { children }
            {isLogModalOpen && <LogModal/>}
            <Footer />
        </div>
    )
}

export default Layout