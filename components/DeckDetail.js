import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { black, red, white } from '../utils/colors';
import { deleteDeck } from '../actions';

const DeckDetail = ({ name, noOfQuestions, navigation, dispatch }) => {

    const handleDelete = () => {
        dispatch(deleteDeck(name));
        navigation.navigate('Decks');
    }
    return (
        <View style={styles.detail}>
            <View style={styles.center}>
                <Text style={{ fontSize: 48 }}>{name}</Text>
                <Text style={{ fontSize: 20 }}>{`No of cards: ${noOfQuestions}`}</Text>
            </View>
            <View style={[styles.center]}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate('AddQuestion', { id: name })}>
                    <Text style={styles.btnText}>Add Question</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                    <Text style={styles.delText}>Delete Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    detail: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        backgroundColor: black,
        padding: 10,
        width: 150,
        margin: 8,
        elevation: 8
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        color: white
    },
    delText: {
        color: red,
        margin: 10
    }
});

const mapStateToProps = (decks, { route }) => {
    if (!decks[route.params.id]) {
        return
    }
    return {
        name: decks[route.params.id].title,
        noOfQuestions: decks[route.params.id].questions.length
    }
}

export default connect(mapStateToProps)(DeckDetail);