// DECK VARIABLES
let suits = ["Hearts", "Spades", "Clubs", "Diamonds"],
  values = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
            "Nine", "Ten", "Jack", "Queen", "King", "Ace"];

//GAME VARIABLES
let inSession = false,
    playerWon = false,
    dealerWon = false,
    endGameClicked = false,
    deck = [],
    playerCards = [],
    dealerCards = [],
    dealerScore = 0,
    playerScore = 0;

//DOM VARIABLES
let gameAreaDOM = document.getElementById("game__area"),
  textAreaDOM = document.getElementById("text__area"),
  welcomeTextDOM = document.getElementById("welcome__text"),
  infoTextDOM = document.getElementById("info__text"),
  statusContentDOM = document.getElementById("status__content"),
  dealerTextDOM = document.getElementById("dealer__text"),
  playerTextDOM = document.getElementById("player__text"),
  startButton = document.getElementById("start-btn"),
  endButton = document.getElementById("end-btn"),
  hitButton = document.getElementById("hit-btn"),
  stayButton = document.getElementById("stay-btn");

//VIEW FUNCTIONS
function defaultDOMView() {
  if (!playerWon) {
    // Set DOM Text to default
    welcomeTextDOM.innerText = "Welcome to BlackJack!";
    welcomeTextDOM.style.display = "initial";
    infoTextDOM.style.display = "none";
    statusContentDOM.style.display = "none";
  }
}

function defaultButtonView() {
  startButton.style.display = "initial";
  endButton.style.display = "none";
  hitButton.style.display = "none";
  stayButton.style.display = "none";
}

function startView() {
  //Buttons
  startButton.style.display = "none";
  endButton.style.display = "initial";
  hitButton.style.display = "inline-block";
  stayButton.style.display = "inline-block";
  //Text
  welcomeTextDOM.innterText = `Let's Play!`;
}

//HANDLER FUNCTIONS
function startGame() {
  //DOM
  defaultDOMView();
  startView();

  //Initiate Game
  inSession = true;
  playerWon = false;
  resetScores();

  //Initiate Deck
  deck = createDeck();
  //Shuffle
  shuffleDeck();
  console.log("Shuffling Deck...");
  // console.log("New Deck...");
  // console.table(deck);
  //Set Player Cards
  playerCards = [getNextCard(), getNextCard()];
  dealerCards = [getNextCard(), getNextCard()];

  console.log("dealing cards...");
  showGameStatus();
}

function hit() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showGameStatus();
}

function stay() {
  inSession = false;
  checkForEndOfGame();
  showGameStatus();
}

function endGame() {
  startButton.style.display = "inline-block";
  endButton.style.display = "none";
  textArea.style.display = "inline";
  welcome.innerText = `Thanks For Playing`;
  infoTextDOM.innerText = `Click "Start Game" to begin a new game.`;
  gameButtons.style.display = "none";
}

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
  welcomeTextDOM.style.display = "none";
  infoTextDOM.style.display = "none";
  statusContentDOM.style.display = "initial";
  dealerTextDOM.innerText = `${dealerCardString}[score: ${dealerScore}]`;
  playerTextDOM.innerText = `${playerCardString}[score: ${playerScore}]`;

  if (!inSession) {
    if (playerWon) {
      welcomeTextDOM.innerText = "YOU WIN!";
    } else {
      welcomeTextDOM.innerText = "DEALER WINS";
    }
    welcomeTextDOM.style.display = "block";
    infoTextDOM.innerText = `Click "Start Game" to play again.`;
    infoTextDOM.style.display = "block";
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

//CLICK HANDLERS
startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
dealButton.addEventListener("click", deal);
hitButton.addEventListener("click", hit);
stayButton.addEventListener("click", stay);

//DECK CLASS
function createDeck() {
  let deck = [];
  for (let suitIDX = 0; suitIDX < suits.length; suitIDX++) {
    for (let valueIDX = 0; valueIDX < values.length; valueIDX++) {
      let card = { suit: suits[suitIDX], value: values[valueIDX] };
      deck.push(card);
    }
  }
  return deck;
}

function getCardString(card) {
  return card.value + " of " + card.suit;
}

function getNextCard() {
  return deck.shift();
}

function shuffleDeck() {
  for (let cardIDX = 0; cardIDX < deck.length; cardIDX++) {
    let randomIDX = Math.trunc(Math.random() * deck.length); //random # between 0 and 51
    let tempIDX = deck[randomIDX];
    deck[randomIDX] = deck[cardIDX];
    deck[cardIDX] = tempIDX;
  }
}

//SCORE CLASS
function resetScores() {
  dealerScore = 0;
  playerScore = 0;
}

function getScore(cardArray) {
  let score = 0;

  for (i = 0; i < cardArray.length; i++) {
    let hasAce = false;
    let ace = 1;
    let card = cardArray[i];
    score += getCardScoreValue(card); //if Ace is passed "score" is unchanged here
    if (card.value === "Ace") {
      hasAce = true;
    }
    //Calculate Ace Value
    if (hasAce && score + 11 <= 21) {
      ace = 11;
      score += ace; //ace is 11
    } else if (hasAce && score + 11 > 21) {
      score += ace; //ace is default value of 1
    }
  }
  return score;
}

function getCardScoreValue(card) {
  switch (card.value) {
    case "Ace":
      return 0; //Value determined in getScore()
      break;
    case "Two":
      return 2;
      break;
    case "Three":
      return 3;
      break;
    case "Four":
      return 4;
      break;
    case "Five":
      return 5;
      break;
    case "Six":
      return 6;
      break;
    case "Seven":
      return 7;
      break;
    case "Eight":
      return 8;
      break;
    case "Nine":
      return 9;
      break;
    default:
      return 10;
      break;
  }
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

//GAME STARTS HERE
showGameStatus();
