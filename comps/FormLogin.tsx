import React from 'react'

import styles from '../styles/comps/FormLogin.module.scss'

type FormLoginProps = {
    setLoginState: (loginState: "login"|"create") => void
}

const FormLogin = ({setLoginState}: FormLoginProps) => {
  return (
    <>
    <h2>Connection : </h2>
    <form>
        <div className={styles.form_line}>
            <label>Adresse mail : </label>
            <input type="text" />
        </div>
        <div className={styles.form_line}>
            <label>Mot de passe : </label>
            <input type="text" />
        </div>
        <button type="submit">Se Connecter</button>
    </form>
    <p onClick={() => setLoginState('create')}>Je n'ai pas de compte</p>
    </>
  )
}

export default FormLogin