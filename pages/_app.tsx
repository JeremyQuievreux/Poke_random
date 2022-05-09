import '../styles/globals.scss'
import { useState } from 'react'
import type { AppProps } from 'next/app'

import Layout from '../comps/Layout'

function MyApp({ Component, pageProps }: AppProps) {

  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false)
  return (
    <Layout isLogModalOpen={isLogModalOpen} setIsLogModalOpen={setIsLogModalOpen}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
