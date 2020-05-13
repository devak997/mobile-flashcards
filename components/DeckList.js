import React, { Component } from 'react';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { receiveDecks } from '../actions';
import DeckListItem from './DeckListItem';
import DeckDetail from './DeckDetail';
import AddQuestion from './AddQuestion';
import EmptyMessage from './EmptyMessage';
import Quiz from './Quiz';
import { fetchDecksAsync } from '../utils/api';

class DeckList extends Component {
    state = { loading: true }
    componentDidMount() {
        const { dispatch } = this.props;
        fetchDecksAsync()
            .then(data => dispatch(receiveDecks(data)))
            .then(() => this.setState({ loading: false }))
    }
    render() {
        const { decks } = this.props;
        const Stack = createStackNavigator();
        if (this, this.state.loading) {
            return <ActivityIndicator />
        }
        return (
            <Stack.Navigator>
                <Stack.Screen name='Decks' children={() =>
                    <FlatList
                        data={decks}
                        contentContainerStyle={{ flexGrow: 1 }}
                        renderItem={({ item }) => <DeckListItem id={item} />}
                        ListEmptyComponent={EmptyMessage}
                        keyExtractor={item => item} />
                } />
                <Stack.Screen
                    name='Details'
                    component={DeckDetail} options={({ route }) => ({ title: route.params.id })} />
                <Stack.Screen name='AddQuestion' component={AddQuestion} options={{ title: 'Add Question' }} />
                <Stack.Screen name='Quiz' component={Quiz} options={({ route }) => ({ title: `Quiz on ${route.params.id}` })} />
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: 'black',
        opacity: 0.6
    }
});


const mapStateToProps = (decks) => {
    return {
        decks: Object.keys(decks)
    }
}

export default connect(mapStateToProps)(DeckList);