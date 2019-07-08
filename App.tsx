import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Pedometer } from 'expo-sensors';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.fontSize}>Sienna Aid</Text>
      <Button title="Klick mich! LOS!" onPress={reportEvent}></Button>
    </View>
  );
}

// var x = 0;
// Pedometer.watchStepCount(stepArgs => {
//   console.log(stepArgs.steps)

//   x = stepArgs.steps
// });

var start = new Date();
setInterval(() => {
  var end = new Date();
  Pedometer.getStepCountAsync(start, end).then((stepsArgs) => {
    reportEvent(stepsArgs.steps);
  });
  start = end;
}, 20000);


// Pedometer.setUpdateInterval(200);
// Pedometer.addListener(accelerometerData => {
//   var data = accelerometerData ;
//   console.log("x: " + Math.round(data.x) + " | y: " + Math.round(data.y) + " | z: " + Math.round(data.z)); 
// });

// setTimeout(() => {
//   // If it's the last subscription to accelerometer it will stop polling in the native API
//   subscription.unsubscribe();
// }, 1000);

function reportEvent(stepCount) {
  fetch('http://10.70.16.64/api/values', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Key: "StepCount ",
      Value: stepCount
    })
  })
  // .then((response) => response.json())
  .then((responseJson) => {
    alert(JSON.stringify(responseJson));
  })
  .catch((error) => {
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
