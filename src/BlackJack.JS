// DECK VARIABLES
let suits = ["Hearts", "Spades", "Clubs", "Diamonds"],
	values = ["Two", "Three", "Four", "Five", "Six", "Seven",
				"Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];


//GAME VARIABLES
let gameStarted = false,
	gameOver = false,
	playerWon = false,
	deck = []
	playerCards = [],
	dealerCards = [],
	dealerScore = 0,
	playerScore = 0;


//DOM VARIABLES
let gameAreaDOM = document.getElementById('game__area'),
	textAreaDOM = document.getElementById('text__area'),
	welcomeTextDOM = document.getElementById('welcome__text'),
	gameTextDOM = document.getElementById('game__text'),
	gameButtonsDOM = document.getElementById('game__btns'),

	startButton = document.getElementById('start-btn'),
	endButton = document.getElementById('end-btn'),
	dealButton = document.getElementById('deal-btn'),
	hitButton = document.getElementById('hit-btn'),
	stayButton = document.getElementById('stay-btn');

//VIEW FUNCTIONS
function defaultView() {
	//Set DOM Text to default
	welcomeTextDOM.innerText = 'Welcome to BlackJack!';
	welcomeTextDOM.style.display = 'initial';
	gameTextDOM.style.display = 'none';
	//Set buttons to default
	startButton.style.display = 'initial';
	endButton.style.display = 'none';
	dealButton.style.display = 'none';
	hitButton.style.display = 'none';
	stayButton.style.display = 'none';
}

function startView() {
	//Buttons
	startButton.style.display = 'none';
	endButton.style.display = 'initial';
	hitButton.style.display = 'none';
	stayButton.style.display = 'none';
	dealButton.style.display = 'initial';
	//Text
	welcomeTextDOM.innterText = `Let's Play!`
	gameTextDOM.innerText = `Click "Deal" to begin.`
	gameTextDOM.style.display = 'block';
}

//HANDLER FUNCTIONS
function startGame() {
	//DOM
	defaultView();
	startView();

	//Initiate Game
	gameStarted = true;
	gameOver = false;
	playerWon = false;
	resetScores();

	//Initiate Deck
	deck = createDeck();	
	playerCards = [getNextCard(), getNextCard()];
	dealerCards = [getNextCard(), getNextCard()];
	return playerCards, dealerCards;
}

function deal() {
	//DOM
	hitButton.style.display = 'inline-block';
	stayButton.style.display = 'inline-block';
	dealButton.style.display = 'none';

	//Shuffle Deck
	console.log('Shuffling Deck...');
	shuffleDeck();
	console.log('New Deck...');
	console.log(deck);
	console.log('dealing cards...');

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
	startButton.style.display = 'inline-block';
	endButton.style.display = 'none';
	textArea.style.display = 'inline';
	welcome.innerText = `Thanks For Playing`
	textArea.innerText = `Click "Start Game" to begin a new game.`;
	gameButtons.style.display = 'none';
}

function showGameStatus() {
	if (!gameStarted) {
		defaultView();
		resetScores();
		return;
	}

	let dealerCardString = '';
	for (let i = 0; i < dealerCards.length; i++) {
		dealerCardString += getCardString(dealerCards[i]) + '\n';
	}

	let playerCardString = '';
	for (let i = 0; i < playerCards.length; i++) {
		playerCardString += getCardString(playerCards[i]) + '\n';
	}

	updateScores();

	//Display
	welcomeTextDOM.style.display = 'none';
	gameTextDOM.style.display = 'block';
	gameTextDOM.innerText = 
		'Dealer Has =\n' +
		dealerCardString +
		'[score: ' + dealerScore + ']\n\n' +

		'Player Has =\n' +
		playerCardString +
		'[score: ' + playerScore + ']';

	if (gameOver) {
		if (playerWon) {
			welcomeTextDOM.innerText = 'YOU WIN!';
			gameTextDOM.innerText = 'Click "Start Game" to play again.';
		} else {
			welcomeTextDOM.innerText = 'DEALER WINS';
			gameTextDOM.innerText = 'Click "Start Game" try again.';
		}
		defaultView();
	}
}

function checkForEndOfGame() {
	updateScores();
	
	if (gameOver) {
		//let dealer take cards
		while (dealerScore < playerScore
			&& playerScore <= 21
			&& dealerScore <= 21) {
			dealerCards.push(getNextCard());
			updateScores();
			}
	}

	if (playerScore > 21) {
		playerWon = true;
		gameOver = true;
	} else if (dealerScore > 21) {
		playerWon = true;
		gameOver = true;
	} else if (gameOver) {
		if (playerScore > dealerScore) {
			playerWon = true;
		} else {
			playerWon = false;
		}
	}
}

//CLICK HANDLERS
startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);
dealButton.addEventListener('click', deal);
hitButton.addEventListener('click', hit);
stayButton.addEventListener('click', stay);


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
		let randomIDX = Math.trunc(Math.random() * deck.length);  //random # between 0 and 51
		let tempIDX = deck[randomIDX];
		deck[randomIDX] = deck[cardIDX];
		deck[cardIDX] = tempIDX;
	}
}

function setCardStrings() {

}


//SCORE CLASS
function resetScores() {
	dealerScore = 0;
	playerScore = 0;
}

function getCardScoreValue(card) {
	switch (card.value) {
		case 'Ace':
			return 0;  //Value determined in getScore()
			break;
		case 'Two':
			return 2;
			break;
		case 'Three':
			return 3;
			break;
		case 'Four':
			return 4
			break;
		case 'Five':
			return 5;
			break;
		case 'Six':
			return 6;
			break;
		case 'Seven':
			return 7;
			break;
		case 'Eight':
			return 8;
			break;
		case 'Nine':
			return 9;
			break;
		default:
			return 10;
			break;
	}
}

function getScore(cardArray) {
	let score = 0;
	let hasAce = false;
	let ace = 1;

	for (i = 0; i < cardArray.length; i++) {
		let card = cardArray[i];
		score += getCardScoreValue(card);		//if Ace is passed "score" is unchanged here
		if (card.value === 'Ace') {
			hasAce = true;
		}
		//Calculate Ace Value
		if (hasAce && (score + 11 <= 21)) {
			ace = 11;
			score += ace;  //ace is 11
		} else {
			score += ace;  //ace is default value of 1
		}
	} return score;
}

function updateScores() {
	dealerScore = getScore(dealerCards);
	playerScore = getScore(playerCards);
}

//Game Play Class




//GAME STARTS HERE
showGameStatus();





// console.log(welcomeTextDOM.innerText);
// console.log(gameTextDOM.innerText);
// console.log(` ${getCardString(playerCards[0])}`);
// console.log(` ${getCardString(playerCards[1])}`);
