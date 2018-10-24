// //GAME FLAGS
const gameFlags = {
  inSession : false,
  endGameClicked : false,
  dealerWon : false,
  playerWon : false
};


const players = [
  {
      name: "Dealer",
      type: "dealer",
      score: 0,
      cards: [],
      cardString: ""
  },
  {
      name: "Player 1",
      type: "player",
      score: 0,
      cards: [],
      cardString: ""
  }
]

//DECK VARIABLES
const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
const values = [
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King",
    "Ace"
];

const deck = createDeck();


//DECK FUNCTIONS
function createCardString(cardObj) {
  return cardObj.value + " of " + cardObj.suit;
}

function setCardStrings() {
  console.groupCollapsed("Calculate CardStrings")
  for (let i = 0; i < players.length; i++) {
      let name = players[i].name;
      let cards = players[i].cards;
      let cString = players[i].cardString;
      
      // console.log(name, cards);
      
      //Log Error if players dont have at least 2 cards.
      if ((cards.length < 1)) {
          console.log(`${name}'s hand is not delt`)
      }

      //Calculate & Set player cardstrings
      for (let c of cards) {
          cString += createCardString(c) + "\n";
      }
      //Check if cardStrings are populated
      if (cString.length) {
          console.groupCollapsed(name, 'cardString')
          console.log(cString);
          console.groupEnd();
      }
  }
}

function createDeck() {
  console.groupCollapsed('Creating Deck...')
  let newDeck = [];
  for (let suitIDX = 0; suitIDX < suits.length; suitIDX++) {
      for (let valueIDX = 0; valueIDX < values.length; valueIDX++) {
          let card = { suit: suits[suitIDX], value: values[valueIDX] };
          newDeck.push(card);
      }
  }
  console.log(`Deck Created =`, newDeck);
  console.groupEnd();
  return newDeck;
}

function shuffleDeck() {
  for (let cardIDX = 0; cardIDX < deck.length; cardIDX++) {
      let randomIDX = Math.trunc(Math.random() * deck.length); //random # between 0 and 51
      let tempIDX = deck[randomIDX];
      deck[randomIDX] = deck[cardIDX];
      deck[cardIDX] = tempIDX;
  }
  console.log(`Shuffled Deck`);
}

function dealHands() {
  for (let i = 0; i < players.length; i++) {
    players[i].cards = [getNextCard(), getNextCard()];
    console.log(`${players[i].name}'s hand is: `, players[i].cards)
  }
}

function getNextCard() {
  return deck.shift()
}


//DATA FUNCTIONS
function getPlayerData(value) {
  let data = [];
  
  for (let p = 0; p < players.length; p++) {
      if (value) {
          data.push(players[p][value]);
      } else {
          data.push(players[p]);
      }
  }
  return data;
}

// Example of returning data: 
// const playerNames = getPlayerData('name');
// Returns array of names

function updatePlayerData() {
  //TODO:
}

//VIEW VARIABLES
const DOM = {
  //Sections
  gameArea: document.getElementById("game__area"),
  textArea: document.getElementById("text__area"),
  statusContent: document.getElementById("status__content"),
  //Text
  mainHeader: document.getElementById("main__header"),
  infoText: document.getElementById("info__text"),
  dealerText: document.getElementById("dealer__text"),
  playerText: document.getElementById("player__text"),
  //Buttons 
  startButton: document.getElementById("start-btn"),
  endButton: document.getElementById("end-btn"),
  dealButton: document.getElementById("deal-btn"),
  hitButton: document.getElementById("hit-btn"),
  stayButton: document.getElementById("stay-btn")
};




//VIEW FUNCTIONS
function setView() {
  console.groupCollapsed('DOM Updated');
  setDOMTextContent();
  setDOMVisibility();
  console.groupEnd();
}

function setDOMVisibility() {
  console.groupCollapsed('Visibility')
  console.log('Calculating DOM "View"...')

  //SET DOM VISIBILITY
  if (gameFlags.inSession) {
    //Normal GamePlay View
    console.log('View: Normal GamePlay');
    DOM.mainHeader.style.display = "initial";
    DOM.statusContent.style.display = "initial";

    DOM.startButton.style.display = "none";
    DOM.infoText.style.display = "none";

    DOM.endButton.style.display = "initial";
    DOM.hitButton.style.display = "inline-block";
    DOM.stayButton.style.display = "inline-block";

  } else if (gameFlags.endGameClicked) {        //not inSession
    //Manual Game Exit
    console.log('View: EndGameClicked');
    DOM.infoText.style.display = "initial";
    DOM.statusContent.style.display = "none";
    DOM.endButton.style.display = "none";
    DOM.hitButton.style.display = "none";
    DOM.stayButton.style.display = "none";
    DOM.startButton.style.display = "inline-block"
  } else if (gameFlags.playerWon || gameFlags.dealerWon) {        //not inSession
    //Game Over (with winner)
    console.log('View: Game Over (with Winner)');
    DOM.infoText.style.display = "none";
    DOM.startButton.style.display = "initial";
    DOM.endButton.style.display = "none";
    DOM.hitButton.style.display = "none";
    DOM.stayButton.style.display = "none";
  } else {
      //Hide game text and game buttons if not inSession && No Winner declared
    console.log('View: Not InSession');
    DOM.statusContent.style.display = "none";
    DOM.infoText.style.display = "none";
    DOM.dealButton.style.display = "none";
    DOM.hitButton.style.display = "none";
    DOM.stayButton.style.display = "none";
    DOM.endButton.style.display = "none";
  }
  console.log('DOM "View" Set.')
  console.groupEnd();
}

function setDOMTextContent() {
  //Calculate DOM Text
  console.groupCollapsed('Text Content');
  console.log('Calculating DOM "Text"...');

  if (gameFlags.inSession) {
    console.log('Game Status = InSession');
    DOM.mainHeader.innerText = "Let's Play BlackJack";
    //Write CardStrings to DOM
    DOM.dealerText.innerText = `${players[0].cardString}[SCORE: ${players[0].score}]`;
    DOM.playerText.innerText = `${players[1].cardString}[SCORE: ${players[1].score}]`;
    return;
  }
  else if (gameFlags.playerWon) {
    console.log('Game Status = PlayerWon');
    DOM.mainHeader.innerText = "YOU WIN!";
    return;
  }
  else if (gameFlags.dealerWon) {
    console.log('Game Status = DealerWon');
    DOM.mainHeader.innerText = "DEALER WINS";
    return;
  }
  else if (gameFlags.endGameClicked) {
    console.log('Game Status = EndGameClicked');
    DOM.mainHeader.innerText = `Thanks For Playing`;
    DOM.infoText.innerText = `Click "Start Game" to begin a new game.`;
    return;
  }
  else {
    console.log('Game Status = Not InSession');
    DOM.mainHeader.innerText = "Welcome to BlackJack!";
    return;
  }
  console.log('DOM Text Set Accordingly')
  console.groupEnd();
}

//CLICK HANDLERS
DOM.startButton.addEventListener("click", startGame);
DOM.endButton.addEventListener("click", endGame);
DOM.hitButton.addEventListener("click", hit);
DOM.stayButton.addEventListener("click", stay);

//DECK & CARD FUNCTIONS



//ACTIONS
function startGame() {
  console.groupCollapsed('StartGame Logs')
  //Initiate Deck
  shuffleDeck();
  dealHands();
  //Update GameFlags
  gameFlags.inSession = true;
  gameFlags.playerWon = false;
  console.log(`Game Flags are: `, gameFlags);
  //Update Scores & View
  setCardStrings();
  updateScores();
  setView();
  console.groupEnd();
}

function endGame(inSession, endGameClicked) {
  console.groupCollapsed('EndGame Logs')
  gameFlags.inSession = false;
  gameFlags.endGameClicked = true;
  resetScores();
  setView();
  console.groupEnd();
}

function hit() {
  console.groupCollapsed('Hit Logs')
  players[1].cards.push(getNextCard());  //player takes another card
  updateScores();
  setView();
  checkForEndOfGame();
  showGameStatus();
  console.groupEnd();
}

function stay() {
  console.groupCollapsed('Stay logs')
  gameFlags.inSession = false;      //needs (app.)
  checkForEndOfGame();
  showGameStatus();
  console.groupEnd();
}

//SCORES
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

function getScore(name, cardArray) {
  console.groupCollapsed('getScore logs')
  let score = 0;
  for (let i = 0; i < cardArray.length; i++) {
    let hasAce = false;
    let ace = 1;
    let card = cardArray[i];
    score += getCardScoreValue(card); //if Ace is passed "score" is unchanged here
    if (card.value === "Ace") {
      hasAce = true;
      console.log(`hasAce = ${hasAce}`)
    }
    //Calculate Ace Value
    if (hasAce && score + 11 <= 21) {
        ace = 11;
      score += ace; //ace is 11
      console.log(`ace = 11`)
    } else if (hasAce && score + 11 > 21) {
      score += ace; //ace is default value of 1
      console.log(`ace = 1`)
    }
  }
  console.log(`${name}'s score is now: ${score}`)
  console.groupEnd();
  return score;
}

function updateScores() {
  if (!gameFlags.inSession) {
      players[0].score = 0; //dealer
      players[1].score = 0; //player
      return;
  }
  players[0].score = getScore(players[0].name, players[0].cards); //dealer
  players[0].score = getScore(players[1].name, players[1].cards); //player
}

function showGameStatus() {
  //Update View
  setCardStrings();
  updateScores();
  //Update View
  setView();
}

function checkForEndOfGame() {
console.group('Check for End of Game')
  if (!gameFlags.inSession) {
    //LET DEALER TAKE CARDS
    while (players[0].score < players[1].score &&
          players[1].score <= 21 &&  //player
          players[0].score <= 16) {   //dealer takes his last hit at 16
      players[0].cards.push(getNextCard());
      console.log(`Dealer took another card...`, players[0].cards)
      updateScores();
      setView();
    };
  };

  //IF PLAYER IS DONE TAKING CARDS
  if (players[1].score <= 21) {   //player
    if (players[0].score === 21) {  //dealer
      console.log("Dealer Wins!");
      gameFlags.inSession = false;
      gameFlags.dealerWon = true;
      return;
    } else if (players[0].score > 21) { //dealer
      console.log("Dealer Busts = YOU WIN!");
      gameFlags.inSession = false;
      gameFlags.playerWon = true;
      return;

    //IF DEALER IS DONE TAKING CARDS
    } else if (players[0].score > 16) { //dealer
      if (players[1].score > players[0].score) {
        console.log("Player Wins");
        gameFlags.inSession = false;
        gameFlags.playerWon = true;
        return;
      } else {
        console.log("Dealer Wins");
        gameFlags.inSession = false;
        gameFlags.dealerWon = true;
        return;
      }
    }
  } else { //OR IF PLAYER BUSTS
    console.log("Player Busts = YOU LOSE!");
    gameFlags.inSession = false;
    gameFlags.playerWon = false;
    return;
  }
  setView();
  console.groupEnd();
}

//GAME STARTS HERE
setView();