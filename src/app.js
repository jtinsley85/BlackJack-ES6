import { setView } from "view.js";
import * as scores from "scores.js";
import * as d from "deck.js";

//GAME VARIABLES
export let inSession = false,
            playerWon = false,
            dealerWon = false,
            endGameClicked = false,



function showGameStatus() {
  if (inSession) {
    defaultDOMView();
    resetScores();
    return;
  }

  let dealerCardString = "";
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + "\n";
  }

  let playerCardString = "";
  for (let i = 0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + "\n";
  }

  updateScores();

  //Display
  mainHeader.style.display = "none";
  info.style.display = "none";
  statusContent.style.display = "initial";
  dealerTextDOM.innerText = `${dealerCardString}[score: ${dealerScore}]`;
  playerTextDOM.innerText = `${playerCardString}[score: ${playerScore}]`;

  if (!inSession) {
    if (playerWon) {
      mainHeader.innerText = "YOU WIN!";
    } else {
      mainHeader.innerText = "DEALER WINS";
    }
    mainHeader.style.display = "block";
    info.innerText = `Click "Start Game" to play again.`;
    info.style.display = "block";
    defaultButtonView();
  }
}

function checkForEndOfGame() {
  updateScores();

  if (!inSession) {
    //LET DEALER TAKE CARDS
    while (dealerScore < playerScore &&
          playerScore <= 21 &&
          dealerScore <= 16) {           //dealer takes his last hit at 16
      dealerCards.push(getNextCard());
      updateScores();
    };
  };


  //IF PLAYER IS DONE TAKING CARDS
  if (playerScore <= 21) {
    if (dealerScore === 21) {
      console.log("Dealer Wins!");
      inSession = false;
      dealerWon = true;
    } else if (dealerScore > 21) {
      console.log("Dealer Busts = YOU WIN!");
      inSession = false;
      playerWon = true;

    //IF DEALER IS DONE TAKING CARDS
    } else if (dealerScore > 16) {
      if (playerScore > dealerScore) {
        console.log("Player Wins");
        inSession = false;
        playerWon = true;
      } else {
        console.log("Dealer Wins");
        inSession = false;
        dealerWon = true;
      }
    }
  } else { //OR IF PLAYER BUSTS
    console.log("Player Busts = YOU LOSE!");
    inSession = false;
    playerWon = false;
  }

}

//GAME STARTS HERE
showGameStatus();
