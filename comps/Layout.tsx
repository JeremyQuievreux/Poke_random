import React from 'react'
import Footer from './Footer'

import Header from './Header'
import LogModal from './LogModal'

type LayoutProps = {
    children: React.ReactNode,
    isLogModalOpen: boolean,
    setIsLogModalOpen: (isLogModalOpen: boolean) => void
}

const Layout = ({children, isLogModalOpen, setIsLogModalOpen}: LayoutProps) => {
  return (
      <div className='main-container'>
          <Header setIsLogModalOpen={setIsLogModalOpen}/>
          { children }
          {isLogModalOpen && <LogModal setIsLogModalOpen={setIsLogModalOpen}/>}
          <Footer />
      </div>
  )
}

export default Layout