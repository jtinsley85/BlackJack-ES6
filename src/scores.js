import { playerCards, dealerCards } from "deck.js";


export let dealerScore;
export let playerScore;

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

export function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

export function resetScores() {
    dealerScore = 0;
    playerScore = 0;
}