import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import confetti from 'canvas-confetti';

function VictoryScreen({ onStartGame }) {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        confetti({
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: { y: 0.6 }
        });
    }, []);

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
