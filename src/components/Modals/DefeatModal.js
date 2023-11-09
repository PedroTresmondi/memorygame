
import React, { useEffect } from 'react';
import './defeatModal.css';

const DefeatModal = ({ onRestart, onClose }) => {
    useEffect(() => {
        // Lógica adicional se necessário ao mostrar o modal de derrota
    }, []);

    const handleClose = () => {
        onClose();
        window.location.reload(); // Recarrega a página
    };

    return (
        <div className="defeat-modal-overlay">
            <div className="defeat-modal">
                <h1>Derrota!</h1>
                <p>Você ficou sem turnos :( </p>
                {/* Lógica adicional se necessário para exibir mais informações sobre a derrota */}
                <div className="modal-buttons">
                    <button onClick={onRestart}>Tentar de Novo</button>
                    <button onClick={handleClose}>Trocar de usuário</button>
                </div>
            </div>
        </div>
    );
};

export default DefeatModal;
