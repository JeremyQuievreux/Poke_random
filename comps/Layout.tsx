//base
import React , { useContext } from 'react'
//comps
import Footer from './Footer'
import Header from './Header'
import LogModal from './LogModal'
import UserBar from './UserBar'
//Context
import { ModalContext } from '../context/ModalContext'
import { BuyCardModalContext } from '../context/BuyCardModalContext'
import { SellCardModalContext } from '../context/SellCardModalContext'
import { GlobalContext } from '../context/GlobalContext'
//comps
import BuyCardModal from './BuyCardModal'
import SellCardModal from './SellCardModal'
import RandomCardModal from './RandomCardModal'
//propstype
type LayoutProps = {
    children: React.ReactNode,
}
//component
const Layout = ({children}: LayoutProps) => {

    const { isLogModalOpen } = useContext(ModalContext)
    const { showBuyCardModal } = useContext(BuyCardModalContext)
    const { showSellCardModal } = useContext(SellCardModalContext)

    const { userIsLogged, showGetRandomCardModal } = useContext(GlobalContext)

    return (
        <div className='main-container'>
            {showGetRandomCardModal && <RandomCardModal />}
            {showBuyCardModal && <BuyCardModal/>}
            {showSellCardModal && <SellCardModal/>}
            {isLogModalOpen && <LogModal/>}
            <Header />
            {userIsLogged && <UserBar/>}
            { children }
            <Footer />
        </div>
    )
}

export default Layout