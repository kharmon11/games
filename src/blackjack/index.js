"use strict";
import Game from './game';

const dealBtn = document.getElementById('deal_btn');
function deal() {
    dealBtn.style.display = 'none';
    const game = new Game();
    game.start();

}
dealBtn.addEventListener('click', deal);