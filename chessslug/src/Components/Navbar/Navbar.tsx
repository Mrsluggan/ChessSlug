import React from 'react'

export default function Navbar() {
    return (
        <ul style={{listStyle: "none", display: "flex",textAlign: "center",justifyContent: "center", gap: "10px"}}>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/board">Board</a></li>

        </ul>
    )
}
