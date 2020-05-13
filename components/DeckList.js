import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { receiveDecks } from '../actions';
import { getDummyData } from '../utils/helper';
import DeckListItem from './DeckListItem';
import DeckDetail from './DeckDetail';
import AddQuestion from './AddQuestion';
import EmptyMessage from './EmptyMessage';

class DeckList extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(receiveDecks(getDummyData()));
    }
    render() {
        const { decks } = this.props;
        const Stack = createStackNavigator();
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