import React , { useState, useContext } from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/comps/FormLogin.module.scss'

import { UserLoginType } from '../types/UserLoginType'

import axios from 'axios'
//typage des props
type FormLoginProps = {
    setLoginState: (loginState: "login"|"create") => void
}
//typage du state User{}


import { ModalContext } from '../context/ModalContext'
import { CheckStorageContext } from '../context/CheckStorageContext'

//Component
const FormLogin = ({setLoginState}: FormLoginProps) => {
    //Context
    const { setIsLogModalOpen } = useContext(ModalContext)
    const { checkStorageFunction } = useContext(CheckStorageContext)
    //routage
    const router = useRouter()
    //state
    const [ user, setUser ] = useState<UserLoginType>({mail: "" , password: ""})
    const [ errorMessage, setErrorMessage] = useState<string|null>(null)
    //methode pour update le state onChange des inputs
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [event.target.name]: event.target.value})
    }
    //methode pour envoyer le formulaire
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("/api/users/login", user)
            .then(res => {
                if(res.data.error === false){
                    localStorage.setItem("@pkm-cnc",res.data.data)
                    setUser({mail: "", password: ""})
                    setIsLogModalOpen(false)
                    router.push({
                        pathname: '/'
                    })
                    checkStorageFunction()
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
    <h2>Connection</h2>
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
        <button type="submit">Me Connecter</button>
    </form>
    <p onClick={() => setLoginState('create')}>Je n'ai pas de compte</p>
    {errorMessage && 
            <div className={`${styles.messageBox} ${styles.error}`}>
                {errorMessage}
            </div>
        }
    </div>
  )
}

export default FormLogin