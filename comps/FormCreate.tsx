//import de base
import axios from 'axios'
import React, { useState } from 'react'
//import styles
import styles from '../styles/comps/FormCreate.module.scss'
//typage des props
type FormCreateProps = {
    setLoginState: (loginState: "login" | "create") => void
}
//typage du state User{}
type UserCreate = {
    pseudo: string,
    mail: string,
    mailConfirm: string,
    password: string
}
//Component
const FormCreate = ({setLoginState}: FormCreateProps) => {
    //state
    const [ user, setUser ] = useState<UserCreate>({pseudo: "", mail: "", mailConfirm: "", password: ""})
    const [ errorMessage, setErrorMessage] = useState<string|null>(null)
    const [ successMessage, setSuccessMessage] = useState<string|null>(null)
    //methode pour update le state onChange des inputs
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    //methode pour envoyer le formulaire
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("/api/users/createAccount", user)
            .then(res => {
                if(res.data.error === false){
                    setSuccessMessage(res.data.message)
                    setUser({pseudo: "", mail: "", mailConfirm: "", password: ""})
                    setTimeout(() => {
                        setSuccessMessage(null)
                        setLoginState("login")
                    }, 3000)
                } else {
                    setErrorMessage(res.data.message)
                    setTimeout(() => {
                        setErrorMessage(null)
                    } , 3000)
                }
            })
    }
  return (
    <div className={styles.form_container}>
        <h2>Création de compte</h2>
        <form onSubmit={handleSubmit}>
            <div className={styles.form_line}>
                <label htmlFor="pseudo">Pseudo : </label>
                <input 
                    type="text" 
                    id="pseudo" 
                    name="pseudo"
                    value={user.pseudo}
                    onChange={onChangeInput}
                    placeholder="ex : The_Collector"
                    required
                    />
            </div>
            <div className={styles.form_line}>
                <label htmlFor="mail">Adresse mail : </label>
                <input 
                    type="mail" 
                    id="mail" 
                    name="mail"
                    value={user.mail}
                    onChange={onChangeInput}
                    placeholder="ex : monmail@domaine.com"
                    required
                    />
            </div>
            <div className={styles.form_line}>
                <label htmlFor="mailconf">Confirmation adresse mail : </label>
                <input 
                    type="text" 
                    name="mailConfirm" 
                    id="mailConfirm"
                    value={user.mailConfirm}
                    onChange={onChangeInput}
                    placeholder="ex : monmail@domaine.com"
                    required
                    />
            </div>
            <div className={styles.form_line}>
                <label htmlFor="password">Mot de passe : </label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={user.password}
                    onChange={onChangeInput}
                    placeholder="*******"
                    required
                    />
            </div>
            <button type="submit">Créer mon compte</button>
        </form>
        <p onClick={() => setLoginState("login")}>J'ai deja un compte</p>
        {errorMessage && 
            <div className={`${styles.messageBox} ${styles.error}`}>
                {errorMessage}
            </div>
        }
        {successMessage && 
            <div className={`${styles.messageBox} ${styles.success}`}>
                {successMessage}
            </div>
        }
    </div>
  )
}

export default FormCreate