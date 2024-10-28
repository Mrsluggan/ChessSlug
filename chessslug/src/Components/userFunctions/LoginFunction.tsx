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
            if (await handleLogin(login, password)) {
                handleSetLoggedIn();

            }else{
                alert("Wrong login or password")
            }
        }


    }
    return (
        <button onClick={loginButton}>Logga in</button>
    )
}
