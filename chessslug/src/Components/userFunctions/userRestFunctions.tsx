import React from 'react'
import { request, setAuthToken } from '../../axios_helper';


export const handleRegister = (firstName: string, lastName: string, login: string, password: string) => {
    request("POST", "/register", JSON.stringify({ firstName, lastName, login, password })).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
        setAuthToken("");
    })
};

export const handleLogin = (login: string, password: string) => {
    request("POST", "/login", JSON.stringify({ login, password })).then((response) => {
        alert("du är nu inloggad!")
        setAuthToken(response.data?.token);
    }).catch((error) => {
        console.log(error);
        setAuthToken("");
    })
};


export const handleLogout = () => {
    window.location.reload();
    setAuthToken("");
}