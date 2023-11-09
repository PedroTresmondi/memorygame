import React from 'react'

function DefeatScreen({ onStartGame }) {
    return (<>
        <div>Derrota</div>
        <div>
            <h1>
                Tentar novamente?
            </h1>
            <button onClick={onStartGame}> Sim </button>
        </div>

    </>
    )
}

export default DefeatScreen