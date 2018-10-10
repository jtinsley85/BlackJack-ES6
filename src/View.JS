import { playerCardString, dealerCardString } from "deck.js";
import { dealerScore, playerScore } from "scores.js";
import * as app from "app.js";


//DOM Sections
const gameAreaDOM = document.getElementById("game__area"),
    textAreaDOM = document.getElementById("text__area"),
    statusContent = document.getElementById("status__content");

//DOM Text
const mainHeader = document.getElementById("main__header"),
    info = document.getElementById("info__text"),
    dealerTextDOM = document.getElementById("dealer__text"),
    playerTextDOM = document.getElementById("player__text");

//DOM Buttons
const startButton = document.getElementById("start-btn"),
    endButton = document.getElementById("end-btn"),
    dealButton = document.getElementById("deal-btn"),
    hitButton = document.getElementById("hit-btn"),
    stayButton = document.getElementById("stay-btn");


//CLICK HANDLERS
startButton.addEventListener("click", app.startGame);
endButton.addEventListener("click", app.endGame);
hitButton.addEventListener("click", app.hit);
stayButton.addEventListener("click", app.stay);


//VIEW FUNCTIONS
function setViewText() {
    let m, i;
    let d = `${dealerCardString}[SCORE: ${dealerScore}]`,
        p = `${playerCardString}[SCORE: ${playerScore}]`;

    if (inSession) {
        m = "Let's Play BlackJack";
    } else if (app.playerWon) {
        m = "YOU WIN!";
    } else if (app.dealerWon) {
        m = "DEALER WINS";
    } else if (app.endGameClicked) {
        m = `Thanks For Playing`;
        i = `Click "Start Game" to begin a new game.`;
    } else {
        m = "Welcome to BlackJack!"
    }
    
    mainHeader.innerText = w;
    dealerTextDOM.innerText = d;
    playerTextDOM.innerText = p;
    info.innerText = t;
}
    
export function setView() {
    setViewText();

    if (app.inSession) {
        //Normal GamePlay View
        mainHeader.style.display = "initial";
        statusContent.style.display = "initial";

        startButton.style.display = "none";
        info.style.display = "none";

        endButton.style.display = "initial";
        hitButton.style.display = "inline-block";
        stayButton.style.display = "inline-block";

    } else if (app.endGameClicked) {
        //Manual Game Exit
        info.style.display = "initial";
        statusContent.style.display = "none";
        endButton.style.display = "none";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
        startButton.style.display = "inline-block"
    } else if (playerWon || dealerWon) {
        //Game Over (with winner)
        info.style.display = "none";
        startButton.style.display = "initial";
        endButton.style.display = "none";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    } else {
        statusContent.style.display = "none";
    }
}
