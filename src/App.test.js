import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LeadCapture from './components/LeadCapture/LeadCapture'; // Atualize o caminho
import { saveScoreboardData, saveLead } from './utils/scoreboardUtils';

// Mock do localStorage
let localStorageMock = {};
global.localStorage = {
    getItem: jest.fn((key) => localStorageMock[key] || null),
    setItem: jest.fn((key, value) => {
        localStorageMock[key] = value.toString();
    }),
    clear: jest.fn(() => {
        localStorageMock = {};
    }),
};


// Mock da função saveScoreboardData
jest.mock('./mocks/scoreboardUtils', () => ({
    saveScoreboardData: jest.fn(),
}));

// Mock do sessionStorage
let sessionStorageMock = {};
global.sessionStorage = {
    getItem: jest.fn((key) => sessionStorageMock[key] || null),
    setItem: jest.fn((key, value) => {
        sessionStorageMock[key] = value.toString();
    }),
    clear: jest.fn(() => {
        sessionStorageMock = {};
    }),
};

test('renderiza o componente LeadCapture sem erros', () => {
    render(<LeadCapture />);
    expect(screen.getByText(/Insira seus dados/i)).toBeInTheDocument();
});

test('inicia o jogo com os dados do sessionStorage se já existirem', () => {
    const existingUserData = {
        name: 'TestUser',
        email: 'test@example.com',
        phone: '1234567890', points: 100
    };
    sessionStorageMock.userData = JSON.stringify(existingUserData);

    render(<LeadCapture />);
    fireEvent.click(screen.getByText(/Iniciar Jogo/i));

    expect(screen.getByText(/Insira seus dados/i)).toBeInTheDocument();
});

