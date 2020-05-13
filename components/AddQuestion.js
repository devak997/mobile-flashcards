import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { black, white, blue } from '../utils/colors';
import { addQuestion } from '../actions';

class AddQuestion extends Component {
    state = {
        question: '',
        answer: '',
    }

    onSubmit = () => {
        const { dispatch, route, navigation } = this.props;
        const { id } = route.params;
        dispatch(addQuestion(id, this.state));
        navigation.navigate('Details', { id });
    }

    render() {
        const { question, answer } = this.state;
        return (
            <View style={styles.addQuestion}>
                <View style={styles.inputView}>
                    <TextInput
                        style={[styles.input]}
                        placeholder='Question'
                        value={question}
                        onFocus={() => this.setState({ color: blue })}
                        onChangeText={text => this.setState({ question: text })} />
                    <TextInput
                        style={[styles.input]}
                        placeholder='Answer'
                        value={answer}
                        onChangeText={text => this.setState({ answer: text })} />
                </View>
                <TouchableOpacity style={styles.btn} onPress={this.onSubmit}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    addQuestion: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    btn: {
        backgroundColor: black,
        padding: 10,
        elevation: 8
    },
    btnText: {
        color: white,
        fontSize: 20
    },
    inputView: {
        alignSelf: 'stretch',
        padding: 10
    },

    input: {
        margin: 10,
        borderWidth: 0.5,
        borderWidth: 1,
        height: 45,
        padding: 8,
        backgroundColor: white,
        borderRadius: 5,
        borderColor: blue,
        elevation: 8,
        fontSize: 18
    }
});

export default connect()(AddQuestion);