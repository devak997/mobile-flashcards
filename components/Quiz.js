import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { orange, black, red, green, white } from '../utils/colors';
import { clearNotification, setLocalNotification } from '../utils/helper';

class Quiz extends Component {
    state = { currentQuestion: 0, score: 0, showAnswer: false }
    handleWrongAnswer = () => {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            showAnswer: false
        })
    }
    handleCorrectAnswer = () => {
        this.setState({
            score: this.state.score + 1,
            currentQuestion: this.state.currentQuestion + 1,
            showAnswer: false
        });
    }
    handleRestart = () => {
        this.setState({ currentQuestion: 0, score: 0, showAnswer: false });
    }
    scheduleNotification = () => {
        clearNotification()
            .then(setLocalNotification)
    }
    render() {
        const { currentQuestion, score, showAnswer } = this.state;
        const { questions, noOfQuestions, navigation } = this.props;
        if (noOfQuestions === 0) {
            return (
                <View style={[styles.center, { flex: 1 }]}>
                    <Text style={{ fontSize: 18 }}>No Questions to answer in the current deck!</Text>
                </View>
            );
        }

        if (currentQuestion >= noOfQuestions) {
            this.scheduleNotification();
            return (
                <View style={[styles.center, { flex: 1 }]}>
                    <Text style={{ fontSize: 18 }}>Quiz Completed!</Text>
                    <Text style={{ fontSize: 18 }}>{`Result: ${score}/${noOfQuestions}`}</Text>
                    <TouchableOpacity style={[styles.btn]} onPress={() => navigation.navigate('Decks')}>
                        <Text style={styles.btnText}>Go Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn]} onPress={this.handleRestart}>
                        <Text style={styles.btnText}>Restart Quiz</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 18 }}>{`Question ${currentQuestion + 1} of ${noOfQuestions}`}</Text>
                <View style={[styles.center, styles.question]}>
                    <Text style={{ fontSize: 28 }}>
                        {questions[currentQuestion].question}
                    </Text>
                    {showAnswer
                        ? <Text style={{ fontSize: 20, textAlign: 'center' }}>
                            {questions[currentQuestion].answer}
                        </Text>
                        : <TouchableOpacity onPress={() => this.setState({ showAnswer: true })}>
                            <Text style={{ color: red }}>View Answer</Text>
                        </TouchableOpacity>}
                </View>
                {showAnswer &&
                    <View style={[styles.center, styles.btnView]}>
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: green }]}
                            onPress={this.handleCorrectAnswer}>
                            <Text style={styles.btnText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: red }]}
                            onPress={this.handleWrongAnswer}>
                            <Text style={styles.btnText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    question: {
        backgroundColor: orange,
        alignSelf: 'stretch',
        padding: 15,
        borderRadius: 10,
        margin: 5,
        elevation: 8
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch'
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
});

const mapStateToProps = (decks, { route }) => {
    const { id } = route.params;
    if (!decks[id]) {
        return {};
    }
    const questions = decks[id].questions;
    return {
        questions,
        noOfQuestions: questions.length
    }
}

export default connect(mapStateToProps)(Quiz);