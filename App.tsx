import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.fontSize}>Hallo Anna2</Text>
      <Button title="Klick mich! LOS!" onPress={callHome}></Button>
    </View>
  );
}

function callHome() {
  fetch('https://www.netzkern.de/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstParam: 'yourValue',
      secondParam: 'yourOtherValue',
    }),
  }).then(function(response) {
    alert(JSON.stringify(response));
  }).catch((error) => {
    console.error(error);
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontSize: {
    fontSize: 60
  }
});
