"use strict";
import {preloadCards} from '../cards/preloadCards';
import Game from './game';

if (typeof Storage !== "undefined") {
    if (localStorage.blackjackWins) {
        document.getElementById("wins_score").innerHTML = localStorage.blackjackWins;
        document.getElementById("losses_score").innerHTML = localStorage.blackjackLosses;
        document.getElementById("draws_score").innerHTML = localStorage.blackjackDraws;
    } else {
        localStorage.setItem("blackjackWins", 0);
        localStorage.setItem("blackjackLosses", 0);
        localStorage.setItem("blackjackDraws", 0);
    }
}

const dealBtn = document.getElementById('deal_btn');
function deal() {
    if (document.getElementById('dealer_card1') !== "") {
        document.getElementById('dealer_score').innerHTML = "";
        document.getElementById('game_result').innerHTML = "";
        document.getElementById('dealer_cards').innerHTML =
            "<div id='dealer_card1' class='dealer-card-div card-div'></div>" +
            "<div id='dealer_card2' class='dealer-card-div card-div'></div>";
        document.getElementById('player_cards').innerHTML = "<div id='player_running_score' class='yellow-font'></div>" +
            "<div id='player_card1' class='player-card-div card-div'>" +
            "</div> <div id='player_card2' class='player-card-div card-div'></div>";
    }
    let game = new Game();
    game.start();
}
dealBtn.addEventListener('click', deal);

preloadCards();