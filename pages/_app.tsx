import '../styles/globals.scss'
import { useState , createContext} from 'react'
import type { AppProps } from 'next/app'

import Layout from '../comps/Layout'

import { ModalContext } from '../context/ModalContext'

function MyApp({ Component, pageProps }: AppProps) {
  
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false)

  const modalContextValue = {
    isLogModalOpen,
    setIsLogModalOpen
  }

  return (
    <ModalContext.Provider value={modalContextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModalContext.Provider>
  )
}

export default MyApp
