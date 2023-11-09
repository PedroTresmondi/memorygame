import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import confetti from 'canvas-confetti';

function VictoryScreen({ onStartGame }) {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10z' });
        confetti({
            shapes: [triangle]
        });
    }, []); // O array vazio assegura que isso seja executado apenas uma vez após a montagem

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <Dialog.Panel>
                <Dialog.Title>Parabens!</Dialog.Title>
                <Dialog.Description>
                    Voce encontrou todas as combinacoes
                </Dialog.Description>

                <p>
                    Deseja voltar para o jogo?
                </p>
                <button onClick={onStartGame} > Sim </button>
            </Dialog.Panel>
        </Dialog>
    )
}

export default VictoryScreen
