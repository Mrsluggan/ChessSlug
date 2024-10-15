import React, { useState, ChangeEvent, FormEvent } from 'react';

interface LoginFormProps {
    onRegister: (firstName: string, lastName: string, username: string, password: string) => void;
    onLogin: (username: string, password: string) => void;
}

export default function LoginForm(props: LoginFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [active, setActive] = useState("login");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case 'username':
                setUsername(value);
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
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        props.onLogin(username, password);
    }

    const onSubmitRegister = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onRegister(firstName, lastName, username, password);
    }

    return (
        <div>
            <form onSubmit={active === "login" ? onSubmit : onSubmitRegister}>
                {active === "register" && (
                    <>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={onChange}
                            placeholder="First Name"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={onChange}
                            placeholder="Last Name"
                            required
                        />
                    </>
                )}
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">{active === "login" ? "Login" : "Register"}</button>
            </form>

            <button onClick={() => setActive(active === "login" ? "register" : "login")}>
                Switch to {active === "login" ? "Register" : "Login"}
            </button>
        </div>
    );
}
