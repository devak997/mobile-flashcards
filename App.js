import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import decks from './reducers';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import { darkBlue } from './utils/colors';
import { setLocalNotification } from './utils/helper';

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    const store = createStore(decks);
    const Tabs = createBottomTabNavigator();
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar backgroundColor={darkBlue} />
          <NavigationContainer>
            <Tabs.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => (route.name === 'Home'
                  ? <MaterialCommunityIcons name="cards" size={size} color={color} />
                  : <MaterialCommunityIcons name="plus-circle" size={size} color={color} />)
              })}
            >
              <Tabs.Screen name="Home" component={DeckList} options={{ title: 'Decks' }} />
              <Tabs.Screen name="AddDeck" component={AddDeck} options={{ title: 'Add Deck' }} />
            </Tabs.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
