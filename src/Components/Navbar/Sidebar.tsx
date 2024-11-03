import React from 'react'
import { handleLogout } from '../userFunctions/userRestFunctions';
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
                    {isLoggedIn && (
                        <button onClick={handleButton}>Logga ut</button>

                    )}


                    <li><a href="https://mrsluggan.github.io/ChessSlug">Spela</a></li>
                    <li><a href="https://mrsluggan.github.io/ChessSlug/#/friends">Vänner</a></li>
                    <li><a href="https://mrsluggan.github.io/ChessSlug/#/learn">Lär dig</a></li>
                    <li><a href="https://mrsluggan.github.io/ChessSlug/#/store">Affär</a></li>



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
