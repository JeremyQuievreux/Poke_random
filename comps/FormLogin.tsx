import React , { useState }from 'react'

import styles from '../styles/comps/FormLogin.module.scss'

import axios from 'axios'
//typage des props
type FormLoginProps = {
    setLoginState: (loginState: "login"|"create") => void
}
//typage du state User{}
type UserConnect = {
    mail: string,
    password: string
}
//Component
const FormLogin = ({setLoginState}: FormLoginProps) => {
    //state
    const [ user, setUser ] = useState<UserConnect>({mail: "" , password: ""})
    //methode pour update le state onChange des inputs
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [event.target.name]: event.target.value})
    }
    //methode pour envoyer le formulaire
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("/api/users/login", user)
            .then(res => {console.log(res.data)})
        setUser({mail: "", password: ""})
    }

  return (
    <>
    <h2>Connection : </h2>
    <form onSubmit={handleSubmit}>
        <div className={styles.form_line}>
            <label htmlFor="mail">Adresse mail : </label>
            <input 
                type="text" 
                id="mail" 
                name="mail" 
                placeholder="nom.prenom@domaine.com"
                value={user.mail}
                onChange={onChangeInput}
                />
        </div>
        <div className={styles.form_line}>
            <label htmlFor="password">Mot de passe : </label>
            <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="*******"
                value={user.password}
                onChange={onChangeInput}
                />
        </div>
        <button type="submit">Se Connecter</button>
    </form>
    <p onClick={() => setLoginState('create')}>Je n'ai pas de compte</p>
    </>
  )
}

export default FormLogin