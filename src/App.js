import React, { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/Card';
import LeadCapture from './components/LeadCapture';
import VictoryScreen from './components/VictoryScreen';
import DefeatScreen from './components/DefeatScreen';
import ScoreBoard from './components/ScoreBoard';
import { updateUserPointsInScoreboard } from './components/scoreboardUtils';
import { cardImages } from './components/cardImages';

function App() {
  const [cards, setCards] = useState([]);
  const [leadData, setLeadData] = useState(null);
  const [turns, setTurns] = useState(10);
  const [choices, setChoices] = useState([]);
  const [points, setPoints] = useState(0);
  const [victory, setVictory] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [sequenceCount, setSequenceCount] = useState(0);
  const [animatePoints, setAnimatePoints] = useState(false);




  // Shuffle cards for a new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(15);
    setChoices([]);
    setVictory(false);
    setDefeat(false);
    setPoints(0);
    setSequenceCount(0); // Zera a contagem de sequência
    setAnimatePoints(false); // Desativa a animação de pontos
  };


  const [rainbowText, setRainbowText] = useState(false);

  // Adicione uma useEffect para aplicar a classe e removê-la após a animação
  useEffect(() => {
    if (sequenceCount > 0) {
      setRainbowText(true);

      // Remova a classe após 2 segundos (duração da animação)
      const timeoutId = setTimeout(() => {
        setRainbowText(false);
      }, 2000);

      // Limpe o timeout ao desmontar o componente
      return () => clearTimeout(timeoutId);
    }
  }, [sequenceCount]);

  // Handle a choice
  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        const sequenceMultiplier = sequenceCount + 1; // Multiplicador de pontos com base na sequência
        const newPoints = points + 100 * sequenceMultiplier;

        setPoints(newPoints);
        updateUserPointsInScoreboard(leadData.name, newPoints);

        setAnimatePoints(true); // Ativar animação

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
  }, [choiceOne, choiceTwo]);

  // Check game status
  useEffect(() => {
    const unmatchedCards = cards.filter((card) => !card.matched);
    if (unmatchedCards.length === 0) {
      handleGameOver(true);
    } else if (turns === 0) {
      handleGameOver(false);
    }
  }, [cards, turns]);

  // Handle game over
  const handleGameOver = (isWinner) => {
    if (isWinner) {
      setVictory(true);
    } else {
      setDefeat(true);
    }
  };

  // Handle game restart
  const handleRestart = () => {
    setVictory(false);
    setDefeat(false);
    setSequenceCount(0); // Zera a contagem de sequência
    setAnimatePoints(false); // Desativa a animação de pontos
    shuffleCards();
  };


  // Function to start the game
  const handleStartGame = (lead) => {
    setLeadData(lead);
    shuffleCards();
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);

    if (choiceOne && choiceTwo && choiceOne.src !== choiceTwo.src) {
      setTurns((prevTurns) => prevTurns - 1);
    }

    setDisabled(false);
  };

  return (
    <div className="App">
      {!leadData ? (
        <LeadCapture onCardTurn={setPoints} onStartGame={handleStartGame} />
      ) : (
        <div>
          {victory && (
            <VictoryScreen points={points} onStartGame={handleRestart} />
          )}
          {defeat && <DefeatScreen onStartGame={handleRestart} />}
          {!victory && !defeat && (
            <div className='game-container'>
              <div className='left-panel'>
                <div className='game-info'>
                  <ScoreBoard points={points} />
                  <p className='player-turns'>Turnos: {turns}</p>
                  <button onClick={shuffleCards}>Novo Jogo</button>
                </div>
              </div>
              <div className='right-panel'>
                <h2 className={rainbowText ? 'rainbow-text' : ''}>Pontuação: {points}</h2>
                <h2>{leadData.name}</h2>
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
          )}
        </div>
      )}
    </div>
  );
}

export default App;
