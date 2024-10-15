import React from 'react'

export default function Buttons() {
    return (
        <div>
            <button onClick={() => console.log("login")}>Login</button>
            <button onClick={() => console.log("logout")}>logout</button>

        </div>
    )
}
