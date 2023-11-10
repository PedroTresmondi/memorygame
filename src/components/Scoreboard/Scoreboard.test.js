import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ScoreBoard from './ScoreBoard';

// Mock da função getScoreboardData
jest.mock('../../utils/scoreboardUtils', () => ({
  getScoreboardData: jest.fn(),
}));

describe('ScoreBoard Component', () => {
  it('renders scoreboard component with title', () => {
    render(<ScoreBoard points={0} currentPlayerName="TestPlayer" />);
    expect(screen.getByText(/Scoreboard/i)).toBeInTheDocument();
  });

  it('displays player data in the scoreboard', () => {
    const mockScoreboardData = [
      { name: 'Player1', points: 100 },
      { name: 'Player2', points: 80 },
    ];

    // Mockando a função getScoreboardData para retornar os dados do placar
    jest.spyOn(require('../../utils/scoreboardUtils'), 'getScoreboardData').mockReturnValue(mockScoreboardData);

    render(<ScoreBoard points={0} currentPlayerName="TestPlayer" />);

    expect(screen.getByText('Player1')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Player2')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
  });

  it('updates scoreboard with new player points if higher', () => {
    const mockScoreboardData = [
      { name: 'TestPlayer', points: 50 },
      { name: 'Player2', points: 80 },
    ];

    jest.spyOn(require('../../utils/scoreboardUtils'), 'getScoreboardData').mockReturnValue(mockScoreboardData);

    render(<ScoreBoard points={100} currentPlayerName="TestPlayer" />);

    expect(screen.getByText('TestPlayer')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Player2')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
  });

  it('adds new player to the scoreboard if not present', () => {
    const mockScoreboardData = [
      { name: 'Player1', points: 100 },
      { name: 'Player2', points: 80 },
    ];

    jest.spyOn(require('../../utils/scoreboardUtils'), 'getScoreboardData').mockReturnValue(mockScoreboardData);

    render(<ScoreBoard points={50} currentPlayerName="NewPlayer" />);

    expect(screen.getByText('Player1')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Player2')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByText('NewPlayer')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });
});
