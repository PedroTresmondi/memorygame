import React, { useState, useEffect } from 'react';
import { getScoreboardData } from '../../utils/scoreboardUtils';
import './Scoreboard.css'

function ScoreBoard({ points, currentPlayerName }) {
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        const leadsData = getScoreboardData();
        if (leadsData) {
            const currentPlayerIndex = leadsData.findIndex((lead) => lead.name === currentPlayerName);
            if (currentPlayerIndex !== -1) {
                const currentScore = leadsData[currentPlayerIndex].points || 0;

                // Verifique se a pontuação atual é maior do que a pontuação existente do jogador
                if (points > currentScore) {
                    // Atualize a pontuação no placar apenas se for maior
                    leadsData[currentPlayerIndex].points = points;

                    // Filtra jogadores com mais de 0 pontos
                    const scoreboardData = leadsData
                        .filter((lead) => lead.points > 0)
                        .map((lead) => ({
                            name: lead.name,
                            points: lead.points || 0,
                        }));

                    // Classifica os dados do placar
                    scoreboardData.sort((a, b) => b.points - a.points);
                    setPlayerData(scoreboardData);
                }
            } else {
                // Adicione o jogador ao placar se não estiver presente
                leadsData.push({ name: currentPlayerName, points });
                // Filtra jogadores com mais de 0 pontos
                const scoreboardData = leadsData
                    .filter((lead) => lead.points > 0)
                    .map((lead) => ({
                        name: lead.name,
                        points: lead.points || 0,
                    }));
                // Classifica os dados do placar
                scoreboardData.sort((a, b) => b.points - a.points);
                setPlayerData(scoreboardData);
            }
        }
    }, [points, currentPlayerName]);
    return (
        <div className='scoreboard'>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2" className='title'>
                            Scoreboard
                        </th>
                    </tr>
                    <tr>
                        <th>Nome</th>
                        <th>Pontos</th>
                    </tr>
                </thead>
                <tbody>
                    {playerData.map((player, index) => (
                        <tr key={index}>
                            <td>{player.name}</td>
                            <td>{player.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ScoreBoard;
