import React from 'react'

export default function Sidebar() {
    return (
        <div style={{ backgroundColor: "#1c1c1e", height: "100vh", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className='upperSidebar'>
                <strong>Slugchess</strong>
                <ul style={{ listStyle: "none", gap: "10px", display: "flex", flexDirection: "column", textAlign: "left", padding: "0", marginLeft: "10%" }}>
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
