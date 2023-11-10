import React, { useState, useEffect } from 'react';
import { getScoreboardData } from '../../utils/scoreboardUtils';
import './Scoreboard.css';

function ScoreBoard({ points, currentPlayerName }) {
    // Estado local para armazenar os dados dos jogadores no placar
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        // Obtém os dados atuais do placar
        const leadsData = getScoreboardData();

        // Verifica se há dados no placar
        if (leadsData) {
            // Encontra o índice do jogador atual nos dados do placar
            const currentPlayerIndex = leadsData.findIndex((lead) => lead.name === currentPlayerName);

            if (currentPlayerIndex !== -1) {
                // Se o jogador estiver presente no placar
                const currentScore = leadsData[currentPlayerIndex].points || 0;

                // Verifica se a pontuação atual é maior do que a pontuação existente do jogador
                if (points > currentScore) {
                    // Atualiza a pontuação no placar apenas se for maior
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

                    // Atualiza o estado local com os novos dados do placar
                    setPlayerData(scoreboardData);
                }
            } else {
                // Adiciona o jogador ao placar se não estiver presente
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

                // Atualiza o estado local com os novos dados do placar
                setPlayerData(scoreboardData);
            }
        }
    }, [points, currentPlayerName]);

    // Renderiza o componente ScoreBoard com os dados do placar
    return (
        <div className='scoreboard'>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2" className='title'>
                            <b>Scoreboard</b>
                        </th>
                    </tr>
                    <tr>
                        <th>Nome</th>
                        <th>Pontos</th>
                    </tr>
                </thead>
                <tbody>
                    {playerData.map((player, index) => (
                        // Renderiza linhas da tabela para cada jogador no placar
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