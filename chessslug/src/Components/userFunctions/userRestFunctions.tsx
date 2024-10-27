import React from 'react'
import { request, setAuthToken } from '../../axios_helper';
const setUser = (user: { login: string, firstName: string, lastName: string }) => {
    localStorage.setItem("user", JSON.stringify(user));
}

export const handleRegister = (firstName: string, lastName: string, login: string, password: string) => {
    request("POST", "/register", JSON.stringify({ firstName, lastName, login, password })).then((data) => {
        console.log(data);
        handleLogin(login, password);
    }).catch((error) => {
        console.log(error);
        setAuthToken("");
    })
};

export const handleLogin = (login: string, password: string) => {
    request("POST", "/login", JSON.stringify({ login, password })).then((response) => {
        if (response.data?.token) {
            setAuthToken(response.data?.token);
            setUser(response.data);
            window.location.reload();

            alert("du är nu inloggad!")

        }
    }).catch((error) => {
        console.log(error);
        localStorage.clear();
    })
};


export const handleLogout = () => {
    window.location.reload();
    localStorage.clear();
}