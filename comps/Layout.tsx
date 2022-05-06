import React from 'react'
import Footer from './Footer'

import Header from './Header'

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
      <div className='main-container'>
          <Header />
          { children }
          <Footer />
      </div>
  )
}

export default Layout