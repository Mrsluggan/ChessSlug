import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { handleRegister, handleLogin } from '../userFunctions/userRestFunctions'

import { UserLoggedInContext } from '../../App';

interface LoginFormProps {
    handleSetLoggedIn: () => void;
}


export default function LoginForm({ handleSetLoggedIn }: LoginFormProps) {
    // ...
    const [active, setActive] = useState<"login" | "register">("login");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const isLoggedIn = useContext(UserLoggedInContext);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case 'username':
                setLogin(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            default:
                break;
        }
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        handleLogin(login, password).then((res) => {
            if (res === true) {
                handleSetLoggedIn();
            }
        });

        event.preventDefault();
    };

    const onSubmitRegister = (event: FormEvent<HTMLFormElement>) => {
        if (!firstName || !lastName || !login || !password) {
            return;
        }
        handleRegister(firstName, lastName, login, password).then((res) => {
            if (res === true) {
                handleSetLoggedIn();
            }
        });
        event.preventDefault();
    };


    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "'Roboto', sans-serif",
                color: "#f1f1f1"
            }}
        >
            <h3>Log in</h3>
            <p>Please login  to play</p>
            <form
                onSubmit={active === "login" ? onSubmit : onSubmitRegister}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    width: "100%",
                    maxWidth: "400px",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                }}
            >
                {active === "register" && (
                    <>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={onChange}
                            placeholder="First Name"
                            required
                            style={{
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                fontSize: "16px"
                            }}
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={onChange}
                            placeholder="Last Name"
                            required
                            style={{
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                fontSize: "16px"
                            }}
                        />
                    </>
                )}
                <input
                    type="text"
                    name="username"
                    value={login}
                    onChange={onChange}
                    placeholder="Username"
                    required
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                        fontSize: "16px"
                    }}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    required
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                        fontSize: "16px"
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "12px",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}

                >
                    {active === "login" ? "Login" : "Register"}
                </button>
            </form>

            <a
                onClick={() => setActive(active === "login" ? "register" : "login")}
                style={{
                    marginTop: "20px",
                    padding: "10px",
                    border: "none",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "color 0.3s"
                }}
            >
                {active === "login" ? "Not registered yet? Register" : "Login"}
            </a>
        </div>

    );
}


