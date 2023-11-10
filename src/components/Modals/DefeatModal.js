
import React, { useEffect } from 'react';
import './defeatModal.css';

const DefeatModal = ({ onRestart, onClose }) => {
    const handleClose = () => {
        onClose();
        window.location.reload(); // Recarrega a página
    };

    return (
        <div className="defeat-modal-overlay">
            <div className="defeat-modal">
                <h1 className='defeat-title'>Derrota!</h1>
                <p className='defeat-text'>Você ficou sem turnos :(</p>
                <div className="modal-buttons">
                    <button onClick={onRestart}>Tentar de Novo</button>
                    <button onClick={handleClose}>Trocar de usuário</button>
                </div>
            </div>
        </div>
    );
};

export default DefeatModal;