import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VictoryModal from './VictoryModal';
import confetti from 'canvas-confetti';

jest.mock('canvas-confetti', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('VictoryModal Component', () => {
    const points = 5000;
    const turns = 5;
    const onRestart = jest.fn();
    const totalPoints = 10000;
    const onClose = jest.fn();

    it('renders VictoryModal component with correct content', () => {
        render(<VictoryModal
            points={points}
            turns={turns}
            onRestart={onRestart}
            totalPoints={totalPoints}
            onClose={onClose}
        />);

        expect(confetti).toHaveBeenCalledTimes(1);

        expect(screen.getByText('Vitória')).toBeInTheDocument();
        expect(screen.getByText('Você encontrou todas as combinações!')).toBeInTheDocument();
        expect(screen.getByText(`Pontuação de turnos: ${turns * 1000}`)).toBeInTheDocument();
        expect(screen.getByText(`Pontuação Final: 0`)).toBeInTheDocument();
        expect(screen.getByText('Tentar de Novo')).toBeInTheDocument();
        expect(screen.getByText('Trocar de usuário')).toBeInTheDocument();

        
    });

    it('calls onRestart when "Tentar de Novo" button is clicked', () => {
        render(<VictoryModal
            points={points}
            turns={turns}
            onRestart={onRestart}
            totalPoints={totalPoints}
            onClose={onClose}
        />);

        const restartButton = screen.getByText('Tentar de Novo');
        fireEvent.click(restartButton);

        expect(onRestart).toHaveBeenCalledTimes(1);
    });

    it('calls onClose and reloads page when "Trocar de usuário" button is clicked', () => {
        // Crie uma cópia de window.location
        const location = { ...window.location };
        // Substitua window.location pela cópia
        delete global.location;
        global.location = { ...location, reload: jest.fn() };

        render(<VictoryModal
            points={points}
            turns={turns}
            onRestart={onRestart}
            totalPoints={totalPoints}
            onClose={onClose}
        />);

        fireEvent.click(screen.getByText('Trocar de usuário'));

        // Verifique se a função onClose foi chamada
        expect(onClose).toHaveBeenCalledTimes(1);

        // Verifique se a página foi recarregada (window.location.reload é chamado)
        expect(global.location.reload).toHaveBeenCalledTimes(1);

        // Restaure a referência original de window.location
        global.location = location;
    });
});
