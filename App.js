import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Panel from './components/Panel';
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.bigBlue}>Circle The Dot</Text>
      <Panel />
      <Text>The yellow dot is Trying to escape the board</Text>
      <Text>Click the empty dot to circle it</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigBlue: {
    
    fontWeight: 'bold',
    fontSize: 30,
  },
});
