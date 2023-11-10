// Função para atualizar os pontos de um usuário específico no placar
export const updateUserPointsInScoreboard = (userName, points) => {
    // Obtém os dados do placar do armazenamento local ou inicializa como um array vazio
    const scoreboardData = JSON.parse(localStorage.getItem('scoreboard')) || [];
    const userIndex = scoreboardData.findIndex((item) => item.name === userName);
    if (userIndex !== -1) {
        scoreboardData[userIndex].points = points;
    } else {
        scoreboardData.push({ name: userName, points });
    }
    scoreboardData.sort((a, b) => b.points - a.points);

    // Armazena os dados atualizados no armazenamento local
    localStorage.setItem('scoreboard', JSON.stringify(scoreboardData));
};

// Função para adicionar uma nova entrada no placar geral
export const updateGeneralScoreboard = (entry) => {
    const prevScoreBoard = getScoreboardData();

    // Adiciona a nova entrada aos dados existentes
    prevScoreBoard.push(entry);
    localStorage.setItem('scoreboard', JSON.stringify(prevScoreBoard));
};

// Função para atualizar o placar no final do jogo
export const updateScoreboard = (userName, totalPoints) => {
    const scoreboardData = JSON.parse(localStorage.getItem('scoreboard')) || [];

    // Encontra o índice do usuário no placar
    const userIndex = scoreboardData.findIndex((item) => item.name === userName);

    // Atualiza os pontos do usuário se encontrado, caso contrário, adiciona uma nova entrada
    if (userIndex !== -1) {
        scoreboardData[userIndex].points = totalPoints;
    } else {
        scoreboardData.push({ name: userName, points: totalPoints });
    }
    // Classifica os dados do placar com base nos pontos em ordem decrescente
    scoreboardData.sort((a, b) => b.points - a.points);

    // Armazena os dados atualizados no armazenamento local
    localStorage.setItem('scoreboard', JSON.stringify(scoreboardData));
};

// Função para obter os dados do placar formatados
export const getScoreboardData = () => {
    const leadsData = JSON.parse(localStorage.getItem('scoreboard')) || [];
    return leadsData.map((lead) => ({
        name: lead.name,
        points: lead.points || 0,
    }));
};

// Função para salvar dados no placar
export const saveScoreboardData = (name, points, totalPoints) => {
    // Obtém os dados do placar do armazenamento local ou inicializa como um array vazio
    const scoreboardData = JSON.parse(localStorage.getItem('scoreboard')) || [];
    
    scoreboardData.push({ name, points });

    // Armazena os dados atualizados no armazenamento local
    localStorage.setItem('scoreboard', JSON.stringify(scoreboardData));
};
