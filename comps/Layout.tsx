//base
import React , { useContext } from 'react'
//comps
import Footer from './Footer'
import Header from './Header'
import LogModal from './LogModal'
import UserBar from './UserBar'
//Context
import { ModalContext } from '../context/ModalContext'
import { UserContext } from '../context/UserContext'
import { BuyCardModalContext } from '../context/BuyCardModalContext'
import { SellCardModalContext } from '../context/SellCardModalContext'
//comps
import BuyCardModal from './BuyCardModal'
import SellCardModal from './SellCardModal'
//propstype
type LayoutProps = {
    children: React.ReactNode,
}
//component
const Layout = ({children}: LayoutProps) => {

    const { isLogModalOpen } = useContext(ModalContext)
    const { userIsLog } = useContext(UserContext)
    const { showBuyCardModal } = useContext(BuyCardModalContext)
    const { showSellCardModal } = useContext(SellCardModalContext)

    return (
        <div className='main-container'>
            {showBuyCardModal && <BuyCardModal/>}
            {showSellCardModal && <SellCardModal/>}
            {isLogModalOpen && <LogModal/>}
            <Header />
            {userIsLog && <UserBar/>}
            { children }
            <Footer />
        </div>
    )
}

export default Layout