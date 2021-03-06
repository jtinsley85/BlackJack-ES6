// DECK VARIABLES
let suits = ["Hearts", "Spades", "Clubs", "Diamonds"],
  values = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
            "Nine", "Ten", "Jack", "Queen", "King", "Ace"];

//GAME VARIABLES
let gameStarted = false,
  gameOver = false,
  playerWon = false,
  dealerWon = false,
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
  dealButton = document.getElementById("deal-btn"),
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
  //Set buttons to default
  defaultButtonView();
}

function defaultButtonView() {
  startButton.style.display = "initial";
  endButton.style.display = "none";
  dealButton.style.display = "none";
  hitButton.style.display = "none";
  stayButton.style.display = "none";
}

function startView() {
  //Buttons
  startButton.style.display = "none";
  endButton.style.display = "initial";
  hitButton.style.display = "none";
  stayButton.style.display = "none";
  dealButton.style.display = "initial";
  //Text
  welcomeTextDOM.innterText = `Let's Play!`;
  infoTextDOM.innerText = `Click "Deal" to begin.`;
  infoTextDOM.style.display = "block";
}

//HANDLER FUNCTIONS
function startGame() {
  //DOM
  defaultDOMView();
  startView();

  //Initiate Game
  gameStarted = true;
  gameOver = false;
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
}

function deal() {
  //DOM
  hitButton.style.display = "inline-block";
  stayButton.style.display = "inline-block";
  dealButton.style.display = "none";

  console.log("dealing cards...");
  showGameStatus();
}

function hit() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showGameStatus();
}

function stay() {
  gameOver = true;
  checkForEndOfGame();
  showGameStatus();
}

function endGame() {
  infoTextDOM.style.display = "block";
  welcomeTextDOM.style.display = "block";
  welcomeTextDOM.innerText = `Thanks For Playing`;
  infoTextDOM.innerText = `Click "Start Game" to begin a new game.`;
  statusContentDOM.style.display = "none";
  defaultButtonView();
  resetScores();
  gameOver = true;
  gameStarted = false;
  playerWon = false;
  dealerWon = false;
}

function showGameStatus() {
  if (!gameStarted) {
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

  if (gameOver) {
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

  if (gameOver) {
    //let dealer take cards
    while (dealerScore < playerScore &&
          playerScore <= 21 &&
          dealerScore <= 15) {           //dealer takes his last hit at 15
      dealerCards.push(getNextCard());
      updateScores();
    };
  };

  if (playerScore <= 21) {
    if (dealerScore === 21) {
      console.log("Dealer Wins!");
      gameOver = true;
      playerWon = false;
    } else if (dealerScore > 21) {
      console.log("Dealer Busts = YOU WIN!");
      gameOver = true;
      playerWon = true;
      // if dealer's score is higher than 15, he's done taking cards.
    } else if (dealerScore > 15) {
      if (playerScore > dealerScore) {
        console.log("Player Wins");
        gameOver = true;
        playerWon = true;
      } else {
        console.log("Dealer Wins");
        gameOver = true;
        playerWon = false;
      }
    }
  } else {
    console.log("Player Busts = YOU LOSE!");
    gameOver = true;
    playerWon = false;
  }

  // if (playerScore > 21) { console.log('Player Busted - YOU LOSE') } else if (dealerScore > 21) { console.log('Dealer Busted - YOU WIN!')}
  // if (playerScore === dealerScore && dealerScore === 21) { console.log('Tie = Dealer Wins!') };
  // if (playerScore <= 21 && dealerScore < playerScore) { console.log('Player Wins') };

  // if ((playerScore <= 21 && playerScore > dealerScore) || dealerScore > 21) {
  //   gameOver = true;
  //   playerWon = true;
  // } else {
  //   gameOver = true;
  //   playerWon = false;
  // };

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

//FIXME: Not calculating scores correctly. . .
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
