import * as d from "deck.js";
import * as scores from "scores.js";
import { setView } from "view.js";
import * as app from "app.js"


//BUTTON CLICK ACTIONS
export function startGame() {
    //DOM
    setView();

    //Initiate Game
    app.inSession = true;
    playerWon = false;
    scores.resetScores();

  //Initiate Deck
  d.createDeck();
  d.shuffleDeck();
  console.log("Shuffling Deck...");
  d.setPlayerCards();

  console.log("dealing cards...");
  showGameStatus();
}

export function hit() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showGameStatus();
}

export function stay() {
  inSession = false;
  checkForEndOfGame();
  showGameStatus();
}

export function endGame() {
    app.endGameClicked = true;
    scores.resetScores();
    setView();
}
