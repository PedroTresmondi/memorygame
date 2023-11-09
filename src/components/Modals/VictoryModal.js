import React, { useState, useEffect } from 'react';
import './victoryModal.css';
import confetti from 'canvas-confetti';

const VictoryModal = ({ points, turns, onRestart, totalPoints, onClose }) => {
  const [displayedPoints, setDisplayedPoints] = useState(0);

  useEffect(() => {
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
    });
  }, []);

  const handleClose = () => {
    onClose();
    window.location.reload(); // Recarrega a página
  };

  return (
    <div className="victory-modal-overlay">
      <div className="victory-modal">
        <h1>Parabéns!</h1>
        <p>Você encontrou todas as combinações!</p>
        <div className="counting-points">
          <p>Pontuação de turnos: {turns * 1000}</p>
          <p>Pontuação Final: {points}</p>
          
        </div>
        <div className="modal-buttons">
          <button onClick={onRestart}>Tentar de Novo</button>
          <button onClick={handleClose}>Trocar de usuário</button>
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;
