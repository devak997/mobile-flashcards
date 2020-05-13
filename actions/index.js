export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_DECK = 'ADD_DECK';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addQuestion(id, question) {
    return {
        type: ADD_QUESTION,
        question,
        id
    }
}

export function deleteDeck(id) {
    return {
        type: DELETE_DECK,
        id
    }
}

export function addDeck(id) {
    return {
        type: ADD_DECK,
        id
    }
}