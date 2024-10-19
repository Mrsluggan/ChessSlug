import React from 'react'
import { request, setAuthToken } from "../../axios_helper"

export default function Sidebar() {
    const handleRegister = (firstName: string, lastName: string, login: string, password: string) => {
        request("POST", "/register", JSON.stringify({ firstName, lastName, login, password })).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
            setAuthToken("");
        })
    };

    const handleLogin = (login: string, password: string) => {
        request("POST", "/login", JSON.stringify({ login, password })).then((response) => {
            alert("du är nu inloggad!")
            setAuthToken(response.data?.token);
        }).catch((error) => {
            console.log(error);
            setAuthToken("");
        })
    };

    const loginButton = () => {

        let login = prompt("login")
        let password = prompt("password")
        if (login && password) {
            handleLogin(login, password);

        }
    }
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
        <div style={{ backgroundColor: "#1c1c1e", height: "100vh", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className='upperSidebar'>
                <strong>Slugchess</strong>
                <ul style={{ listStyle: "none", gap: "10px", display: "flex", flexDirection: "column", textAlign: "left", padding: "0", marginLeft: "10%" }}>
                    <button onClick={loginButton}>Logga in</button>
                    <button onClick={register}>Registrera dig</button>

                    <li>Spela</li>
                    <li>Vänner</li>
                    <li>Lär dig</li>



                </ul>
            </div>
            <div className='lowerSidebar'>
                <ul style={{ listStyle: "none", gap: "10px", display: "flex", flexDirection: "column", textAlign: "left", padding: "0", marginLeft: "10%" }}>
                    <li>Logga ut</li>
                    <li>Inställningar</li>
                    <li>Darkmode</li>

                </ul>
            </div>
        </div>
    )
}
