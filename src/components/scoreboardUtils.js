export const updateUserPointsInScoreboard = (userName, points) => {
    const scoreboardData = JSON.parse(localStorage.getItem('scoreboard')) || [];
    const userIndex = scoreboardData.findIndex((item) => item.name === userName);
    if (userIndex !== -1) {
        scoreboardData[userIndex].points = points;
    } else {
        scoreboardData.push({ name: userName, points });
    }

    scoreboardData.sort((a, b) => b.points - a.points);
    localStorage.setItem('scoreboard', JSON.stringify(scoreboardData));
};

export const updateGeneralScoreboard = (entry) => {
    const prevScoreBoard = getScoreboardData()
    prevScoreBoard.push(entry)
    localStorage.setItem('scoreboard', JSON.stringify(prevScoreBoard));

}

export const getScoreboardData = () => {
    const leadsData = JSON.parse(localStorage.getItem('scoreboard')) || [];
    return leadsData.map((lead) => ({
        name: lead.name,
        points: lead.points || 0,
    }));
};

export const saveScoreboardData = (name, points) => {
    const scoreboardData = JSON.parse(localStorage.getItem('scoreboard')) || [];
    scoreboardData.push({ name, points });
    localStorage.setItem('scoreboard', JSON.stringify(scoreboardData));
};

