//Defaults

export const playerCards = [];
export const dealerCards = [];
export const deck = createDeck();

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

export function createDeck() {
    let deck = [];
    for (let suitIDX = 0; suitIDX < suits.length; suitIDX++) {
        for (let valueIDX = 0; valueIDX < values.length; valueIDX++) {
            let card = { suit: suits[suitIDX], value: values[valueIDX] };
            deck.push(card);
        }
    }
    return deck;
}

export function shuffleDeck() {
    for (let cardIDX = 0; cardIDX < deck.length; cardIDX++) {
        let randomIDX = Math.trunc(Math.random() * deck.length); //random # between 0 and 51
        let tempIDX = deck[randomIDX];
        deck[randomIDX] = deck[cardIDX];
        deck[cardIDX] = tempIDX;
    }
}

function getCardString(card) {
    return card.value + " of " + card.suit;
}

function getNextCard() {
    return deck.shift();
}

export function setPlayerCards() {
    playerCards = [getNextCard(), getNextCard()];
    dealerCards = [getNextCard(), getNextCard()];
}
