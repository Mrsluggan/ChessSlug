import React from 'react'

export default function Home() {
    return (
        <div style={{ textAlign: "center", height: "100vh", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div className='choseMode' style={{ textAlign: "center" }}>
                    <div className='modeContainer' style={{ display: "flex", padding: "10px", gap: "10px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <button>Spela mot Andra</button>
                            <button>Spela mot Ai</button>
                            <button>Spela mot Vän</button>
                        </div>





                    </div>
                </div>






            </div>



        </div>
    )

}
