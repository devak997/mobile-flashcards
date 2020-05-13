import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { black, white, blue } from '../utils/colors';
import { addDeck } from '../actions';

class AddDeck extends Component {
    state = { name: '' }
    handleSubmit = () => {
        const { dispatch, navigation } = this.props;
        dispatch(addDeck(this.state.name));
        this.setState({ name: '' });
        navigation.navigate('Home');
    }
    render() {
        const { name } = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Deck Name"
                    value={name}
                    onChangeText={text => this.setState({ name: text })} />
                <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
                    <Text style={styles.btnText}>Add Deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly'
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
    input: {
        margin: 10,
        borderWidth: 0.5,
        borderWidth: 1,
        height: 48,
        padding: 8,
        backgroundColor: white,
        borderRadius: 5,
        borderColor: blue,
        elevation: 8,
        fontSize: 20,
        alignSelf: 'stretch'
    }
});

export default connect()(AddDeck);