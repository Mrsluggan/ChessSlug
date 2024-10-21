import React from 'react'
import { handleRegister } from './userRestFunctions'

export default function Register() {

    const register = () => {
        let firstname = prompt("firstname")
        let lastname = prompt("lastname")
        let login = prompt("login")
        let password = prompt("password")
        if (firstname && lastname && login && password) {
            handleRegister(firstname, lastname, login, password);

        }

    }
    return (
        <button onClick={register}>Registrera dig</button>)
}
