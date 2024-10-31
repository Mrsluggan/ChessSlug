import React from 'react'
import LoginFunction from '../userFunctions/LoginFunction';
import { handleLogout } from '../userFunctions/userRestFunctions';
import Register from '../userFunctions/Register';
import { useContext } from 'react';
import { UserLoggedInContext } from '../../App';

interface SidebarProps {
    handleSetLoggedIn: () => void;
}

export default function Sidebar({ handleSetLoggedIn }: SidebarProps) {
    const isLoggedIn = useContext(UserLoggedInContext);

    const handleButton = () => {
        handleLogout();
        handleSetLoggedIn();
    }

    return (
        <div style={{ backgroundColor: "#1c1c1e", height: "100vh", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className='upperSidebar'>
                <strong>Slugchess</strong>
                <ul style={{ listStyle: "none", gap: "10px", display: "flex", flexDirection: "column", textAlign: "left", padding: "0", marginLeft: "10%" }}>
                    {!isLoggedIn ? (
                        <div>
                            <LoginFunction handleSetLoggedIn={handleSetLoggedIn} />
                            <Register />
                        </div>
                    ) : (
                        <button onClick={handleButton}>Logga ut</button>
                    )}


                    <li>Spela</li>
                    <li>Vänner</li>
                    <li>Lär dig</li>
                    <li>Affär</li>



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
