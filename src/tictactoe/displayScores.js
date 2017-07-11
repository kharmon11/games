const displayScores = function () {
    document.getElementById("wins_score").innerHTML = localStorage.tictactoeWins;
    document.getElementById("losses_score").innerHTML = localStorage.tictactoeLosses;
    document.getElementById("draws_score").innerHTML = localStorage.tictactoeDraws;
};

export {displayScores};