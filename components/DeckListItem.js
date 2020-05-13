import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { darkBlue, white } from '../utils/colors';

const DeckListItem = ({ name, noOfCards }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Details', {id: name})} >
            <View style={styles.listItem}>
                <Text style={{ fontSize: 24, color: white }}>{name}</Text>
                <View style={styles.cardDetail}>
                    <Text style={{ fontSize: 20, color: white }}>{noOfCards}</Text>
                    <Text style={{ fontSize: 12, color: white }}>Cards</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        borderRadius: 8,
        margin: 8,
        elevation: 1,
        borderWidth: 0.3,
        backgroundColor: darkBlue
    },
    cardDetail: {
        alignItems: 'center',
    },
});

const mapStateToProps = (decks, { id }) => {
    return {
        name: decks[id].title,
        noOfCards: decks[id].questions.length
    }
}

export default connect(mapStateToProps)(DeckListItem);