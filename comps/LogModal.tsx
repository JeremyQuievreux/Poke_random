//base
import React , { useState, useContext }from 'react'
import styles from '../styles/comps/LogModal.module.scss'
//Comps
import FormCreate from './FormCreate'
import FormLogin from './FormLogin'
//Context
import { ModalContext } from '../context/ModalContext'
//component
const LogModal = () => {
  //Context
  const { setIsLogModalOpen } = useContext(ModalContext)
  //state
  const [ loginState, setLoginState ] = useState<"login"|"create">("login")

  return (
    <div className={styles.logModal_externe} onClick={() => setIsLogModalOpen(false)}>
        <div className={styles.logModal_interne} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close_button} onClick={() => setIsLogModalOpen(false)}>X</button>
            {loginState === "login" 
            ? <FormLogin setLoginState={setLoginState}/>
            : <FormCreate setLoginState={setLoginState}/>
            }
        </div>
    </div>
  )
}

export default LogModal