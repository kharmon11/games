const displayScores = function() {
    document.getElementById("wins_score").innerHTML = localStorage.wins;
    document.getElementById("losses_score").innerHTML = localStorage.losses;
    document.getElementById("draws_score").innerHTML = localStorage.draws;
};

export {displayScores};