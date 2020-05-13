import React from 'react';
import { Text, View } from 'react-native';

const EmptyMessage = () => {
    return(
        <View style={{justifyContent: 'center', flex: 1}}> 
            <Text style={{fontSize: 30, alignSelf: 'center'}}>No Decks added!</Text>
        </View>
        
    );
}

export default EmptyMessage;