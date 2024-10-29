import React from 'react'
import { request, setAuthToken,setUser } from '../../axios_helper';


export const handleRegister = (firstName: string, lastName: string, login: string, password: string) => {
    request("POST", "/register", JSON.stringify({ firstName, lastName, login, password })).then((data) => {
        console.log(data);
        handleLogin(login, password);
    }).catch((error) => {
        console.log(error);
        setAuthToken("");
    })
};

export const handleLogin = (login: string, password: string): Promise<boolean> => {
    return request("POST", "/login", JSON.stringify({ login, password }))
        .then((response) => {
            if (response.data?.token) {
                setAuthToken(response.data?.token);
                setUser(response.data);
                return true;
            } else {
                localStorage.clear();
                return false;
            }
        })
        .catch((error) => {
            console.log(error);
            localStorage.clear();
            return false;
        });
};

export const handleLogout = () => {
    window.location.reload();
    localStorage.clear();
}