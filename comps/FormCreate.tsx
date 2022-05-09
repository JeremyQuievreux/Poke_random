import React from 'react'

import styles from '../styles/comps/FormCreate.module.scss'

type FormCreateProps = {
    setLoginState: (loginState: "login" | "create") => void
}

const FormCreate = ({setLoginState}: FormCreateProps) => {
  return (
    <>
        <h2>Création de compte : </h2>
        <form>
            <div className={styles.form_line}>
                <label>Pseudo : </label>
                <input type="text" />
            </div>
            <div className={styles.form_line}>
                <label>Adresse mail : </label>
                <input type="text" />
            </div>
            <div className={styles.form_line}>
                <label>Confirmation adresse mail : </label>
                <input type="text" />
            </div>
            <div className={styles.form_line}>
                <label>Mot de passe : </label>
                <input type="text" />
            </div>
            <button type="submit">Se Connecter</button>
        </form>
        <p onClick={() => setLoginState("login")}>J'ai deja un compte</p>
    </>
  )
}

export default FormCreate