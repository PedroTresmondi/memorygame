import React, { useState, useEffect } from 'react';
import { getScoreboardData } from './scoreboardUtils';


function ScoreBoard({ points }) {
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        const leadsData = getScoreboardData();

        if (leadsData) {
            const scoreboardData = leadsData.map((lead) => ({
                name: lead.name,
                points: lead.points || 0,
            }));

            scoreboardData.sort((a, b) => b.points - a.points);

            setPlayerData(scoreboardData);
        }
    }, [points]);

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
