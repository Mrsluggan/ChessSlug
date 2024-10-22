import React from 'react'
import { handleLogin } from './userRestFunctions';
interface LoginFunctionProp {
    handleSetLoggedIn: () => void;
}
export default function LoginFunction({ handleSetLoggedIn }: LoginFunctionProp) {

    const loginButton = async () => {

        let login = prompt("login")
        let password = prompt("password")
        if (login && password) {
            handleLogin(login, password);
            handleSetLoggedIn();

        }


    }
    return (
        <button onClick={loginButton}>Logga in</button>
    )
}
