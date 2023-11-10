import React, { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/Card/Card';
import LeadCapture from './components/LeadCapture/LeadCapture';
import ScoreBoard from './components/Scoreboard/ScoreBoard';

import { updateUserPointsInScoreboard, updateScoreboard } from './utils/scoreboardUtils';

import { cardImages } from './components/Card/cardImages';
import VictoryModal from './components/Modals/VictoryModal';
import DefeatModal from './components/Modals/DefeatModal';


function App() {
  const [cards, setCards] = useState([]);
  const [leadData, setLeadData] = useState(null);
  const [turns, setTurns] = useState(10);
  const [, setChoices] = useState([]);
  const [points, setPoints] = useState(0);
  const [victory, setVictory] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [, setDisabled] = useState(false);
  const [sequenceCount, setSequenceCount] = useState(0);
  const [, setAnimatePoints] = useState(false);
  const [countingPoints, setCountingPoints] = useState(false);
  const [totalPoints] = useState(0);
  const [, setShowModal] = useState(true);
  const [rainbowText, setRainbowText] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Embaralha cartas para um novo jogo
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(25);
    setChoices([]);
    setVictory(false);
    setDefeat(false);
    setPoints(0);
    setSequenceCount(0);
    setAnimatePoints(false);
  };

  useEffect(() => {
    if (sequenceCount > 3) {
      setRainbowText(true);

      const timeoutId = setTimeout(() => {
        setRainbowText(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [sequenceCount]);

  const handleChoice = (card) => {
    // Desativa as cartas temporariamente se não houver escolhas feitas
    if (!choiceOne || !choiceTwo) {
      // Impede que a mesma carta seja escolhida duas vezes
      if (!choiceOne || (choiceOne && choiceOne.id !== card.id)) {
        setDisabled(true);
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
      }
    }
  }
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        // Multiplicador de pontos com base na sequência
        const sequenceMultiplier = sequenceCount + 1;
        const newPoints = points + 350 * sequenceMultiplier;

        setPoints(newPoints);
        updateUserPointsInScoreboard(leadData.name, newPoints);
        setAnimatePoints(true);

        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        // Adicione o par atual à lista de escolhas
        setChoices((prevChoices) => [...prevChoices, choiceOne.src]);

        // Atualiza a contagem de sequência
        setSequenceCount(sequenceCount + 1);

        resetTurn();
      } else {
        // Se o jogador errar, reinicia a sequência
        setSequenceCount(0);
        setTimeout(() => resetTurn(), 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo]);


  useEffect(() => {
    const unmatchedCards = cards.filter((card) => !card.matched);
    if (unmatchedCards.length === 0) {
      handleGameOver(true);
    } else if (turns === 0) {
      handleGameOver(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, turns]);
  const handleGameOver = (isWinner) => {
    if (isWinner) {
      setCountingPoints(true);

      setTimeout(() => {
        setVictory(true);
        // Crie uma variável local para armazenar a pontuação acumulada
        let accumulatedPoints = points + turns * 1000;
        // Atualize o estado 'points' diretamente
        setPoints(accumulatedPoints);
        setCountingPoints(false);
        if (leadData) {
          // Atualize a pontuação no placar usando a pontuação acumulada
          updateScoreboard(leadData.name, accumulatedPoints);
        }
      }, 2000);
    } else {
      setDefeat(true);
    }
  };

  const handleRestart = () => {
    setVictory(false);
    setDefeat(false);
    setSequenceCount(0);
    setAnimatePoints(false);
    shuffleCards();
  };

  const handleStartGame = (lead) => {
    setLeadData(lead);
    shuffleCards();
    setSequenceCount(0);
    setPoints(0)

  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);

    if (choiceOne && choiceTwo) {
      if (choiceOne.src !== choiceTwo.src) {
        setTurns((prevTurns) => prevTurns - 1);
      } else {
        updateUserPointsInScoreboard(leadData.name, points);

      }
    }

    setDisabled(false);
  };

  return (
    <div className="App">
      {!leadData ? (
        <LeadCapture
          onCardTurn={setPoints}
          onStartGame={handleStartGame} />
      ) : (
        <div>
          {victory && !countingPoints && (
            <VictoryModal
              points={points}
              onRestart={handleRestart}
              onClose={handleCloseModal}
              countingPoints={countingPoints}
              turns={turns}
              totalPoints={totalPoints} />
          )}
          {defeat && (
            <DefeatModal
              onRestart={handleRestart}
              onClose={handleCloseModal}
            />
          )}
          <div className='game-container'>
            <div className='left-panel'>
              <div className='game-info'>
                <ScoreBoard
                  points={points}
                  currentPlayerName={leadData.name}
                  totalPoints={totalPoints} />
                <button onClick={shuffleCards}>Novo Jogo</button>
              </div>
            </div>
            <div className='right-panel'>
              <div className='player-info' >
                <p className='player-turns'>Turnos: {turns}</p>
                <p className={rainbowText ? 'rainbow-text' : ''}>Pontuação: {points}</p>
                <p>{leadData.name}</p>
              </div>
              <div className="card-grid">
                {cards.map((card) => (
                  <SingleCard
                    key={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
