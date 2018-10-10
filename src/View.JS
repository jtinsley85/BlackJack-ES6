//Status Default
let inSession = false;


//DOM Sections
const gameAreaDOM = document.getElementById("game__area"),
    textAreaDOM = document.getElementById("text__area"),
    statusContentDOM = document.getElementById("status__content");

//DOM Text
const welcomeTextDOM = document.getElementById("welcome__text"),
    infoTextDOM = document.getElementById("info__text"),
    dealerTextDOM = document.getElementById("dealer__text"),
    playerTextDOM = document.getElementById("player__text");

//DOM Buttons
const startButton = document.getElementById("start-btn"),
    endButton = document.getElementById("end-btn"),
    dealButton = document.getElementById("deal-btn"),
    hitButton = document.getElementById("hit-btn"),
    stayButton = document.getElementById("stay-btn");


function setViewText() {
    let w, t;
    let d = `${dealerCardString}[SCORE: ${dealerScore}]`,
        p = `${playerCardString}[SCORE: ${playerScore}]`;

    if (inSession) {
        w = "Let's Play BlackJack";
    } else if (playerWon) {
        w = "YOU WIN!";
    } else if (dealerWon) {
        w = "DEALER WINS";
    } else if (endGameClicked) {
        w = `Thanks For Playing`;
        t = `Click "Start Game" to begin a new game.`;
    } else {
        w = "Welcome to BlackJack!"
    }
    
    welcomeTextDOM.innerText = w;
    dealerTextDOM.innerText = d;
    playerTextDOM.innerText = p;
    infoTextDOM.innerText = t;
}
    
function setView() {
    setViewText();

    if (inSession) {
        //Normal GamePlay View
        welcomeTextDOM.style.display = "initial";
        statusContentDOM.style.display = "initial";

        startButton.style.display = "none";
        infoTextDOM.style.display = "none";

        endButton.style.display = "initial";
        hitButton.style.display = "inline-block";
        stayButton.style.display = "inline-block";

    } else if (endGameClicked) {
        //Manual Game Exit
        infoTextDOM.style.display = "initial";
        statusContentDOM.style.display = "none";
        endButton.style.display = "none";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    } else if (playerWon || dealerWon) {
        //Game Over (with winner)
        infoTextDOM.style.display = "none";
        startButton.style.display = "initial";
        endButton.style.display = "none";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    } else {
        statusContentDOM.style.display = "none";
    }
}
