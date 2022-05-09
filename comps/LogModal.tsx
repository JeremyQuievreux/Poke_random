import React , { useState }from 'react'

import styles from '../styles/comps/LogModal.module.scss'
import FormCreate from './FormCreate'
import FormLogin from './FormLogin'
//typage des props
type LogModalProps = {
    setIsLogModalOpen: (isLogModalOpen: boolean) => void
}
//component
const LogModal = ({setIsLogModalOpen}: LogModalProps) => {
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