import type { NextPage } from 'next'
import React from 'react'

import styles from '../styles/pages/About.module.scss'

const About: NextPage = () => {

  return (
    <div className={styles.about_container}>
      <h2>About Page</h2>
    </div>
  )
}

export default About