import React from 'react'
import Link from 'next/link'

import styles from '../styles/comps/Footer.module.scss'

const Footer: React.FC = () => {
  return (
    <div className={styles.footer_container}>
      <Link href="/about"><a>A Propos</a></Link>
      <Link href="/contact"><a>Contact</a></Link>
    </div>
  )
}

export default Footer