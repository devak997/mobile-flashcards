import { AsyncStorage } from 'react-native';

const TOKEN = 'FlashCards:Decks'

export function fetchDecksAsync() {
    return AsyncStorage.getItem(TOKEN).then(data => {
        if (data === null) {
            return {}
        } else {
            return JSON.parse(data);
        }
    })
}

export function deleteDeckAsync(id) {
    return AsyncStorage.getItem(TOKEN).then(data => {
        data = JSON.parse(data);
        data[id] = undefined;
        delete data[id];
        AsyncStorage.setItem(TOKEN, JSON.stringify(data));
    })
}

export function addDeckAsync(id) {
    return AsyncStorage.getItem(TOKEN).then(data => {
        data = JSON.parse(data);
        AsyncStorage.setItem(TOKEN, JSON.stringify({
            ...data,
            [id]: {
                title: id,
                questions: []
            }
        }));
    })
}

export function addQuestionAsync(id, question) {
    return AsyncStorage.getItem(TOKEN).then(data => {
        data = JSON.parse(data);
        AsyncStorage.setItem(TOKEN, JSON.stringify({
            ...data,
            [id]: {
                ...data[id],
                questions: [
                    ...data[id].questions,
                    question
                ]
            }
        }))
    })
}

