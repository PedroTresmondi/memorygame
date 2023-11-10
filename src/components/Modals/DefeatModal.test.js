import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DefeatModal from './DefeatModal';

describe('DefeatModal Component', () => {
    const onRestart = jest.fn();
    const onClose = jest.fn();

    it('renders DefeatModal component with correct content', () => {
        render(<DefeatModal onRestart={onRestart} onClose={onClose} />);

        expect(screen.getByText('Derrota!')).toBeInTheDocument();
        expect(screen.getByText('Você ficou sem turnos :(')).toBeInTheDocument();
        expect(screen.getByText('Tentar de Novo')).toBeInTheDocument();
        expect(screen.getByText('Trocar de usuário')).toBeInTheDocument();
    });

    it('calls onRestart when "Tentar de Novo" button is clicked', () => {
        render(<DefeatModal onRestart={onRestart} onClose={onClose} />);

        const restartButton = screen.getByText('Tentar de Novo');
        fireEvent.click(restartButton);

        expect(onRestart).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when "Trocar de usuário" button is clicked', () => {
        render(<DefeatModal onRestart={onRestart} onClose={onClose} />);

        const closeButton = screen.getByText('Trocar de usuário');
        fireEvent.click(closeButton);

        // Verifique se a função onClose foi chamada corretamente
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
