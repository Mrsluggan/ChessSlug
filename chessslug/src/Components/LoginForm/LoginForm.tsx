import React, { useState, ChangeEvent, FormEvent } from 'react';

interface LoginFormProps {
    handleLogin: (login: string, password: string) => void;
    handleRegister: (firstName: string, lastName: string, login: string, password: string) => void;
  }
  
  export default function LoginForm({ handleLogin, handleRegister }: LoginFormProps) {
    // ...
    const [active, setActive] = useState<"login" | "register">("login");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [login, setLogin] = useState<string>(""); 
    const [password, setPassword] = useState<string>("");

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
        event.preventDefault();
        handleLogin(login, password);
    };

    const onSubmitRegister = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleRegister(firstName, lastName, login, password); 
    };

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
                    value={login}
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


