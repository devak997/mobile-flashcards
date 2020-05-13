import { RECEIVE_DECKS, ADD_QUESTION, DELETE_DECK, ADD_DECK } from '../actions';

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    questions: [
                        ...state[action.id].questions,
                        action.question
                    ]
                }
            }
        case DELETE_DECK:
            const { [action.id]: value, ...rest } = state;
            return {
                ...rest
            }
        case ADD_DECK:
            return {
                ...state,
                [action.id]: {
                    title: action.id,
                    questions: []
                }
            }
        default:
            return {
                ...state
            }
    }
}

export default decks;