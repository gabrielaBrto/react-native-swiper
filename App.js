import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://images.unsplash.com/photo-1451934403379-ffeff84932da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
  { id: 2, text: 'Card #2', uri: 'https://images.unsplash.com/photo-1545852528-fa22f7fcd63e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
  { id: 3, text: 'Card #3', uri: 'https://images.unsplash.com/photo-1546083381-2bed38b42cac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
  { id: 4, text: 'Card #4', uri: 'https://images.unsplash.com/photo-1535546204504-586398ee6677?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7320b162b147a94d4c41377d9035e665&auto=format&fit=crop&w=500&q=60' },
  { id: 5, text: 'Card #5', uri: 'https://images.unsplash.com/photo-1504972090022-6edb81e4e534?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
  { id: 6, text: 'Card #6', uri: 'https://images.unsplash.com/photo-1474905187624-b3deaf7aa4c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
  { id: 7, text: 'Card #7', uri: 'https://images.unsplash.com/photo-1446000442451-e162542e5f8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
  { id: 8, text: 'Card #8', uri: 'https://images.unsplash.com/photo-1456934559919-e9195dd7c553?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
];

export default class App extends Component {
  renderCard(item) {
    return (
      <Card key={item.id} title={item.text} image={{ uri: item.uri }}>
        <Text style={{ marginBottom: 10 }}> Descrição</Text>
        <Button title="Detalhes"/>
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck 
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAFA'
  }
});