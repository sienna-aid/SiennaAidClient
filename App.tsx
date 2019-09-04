import React from 'react';
import { StyleSheet, Text, View, Button, Picker } from 'react-native';
import { Pedometer, Gyroscope, Accelerometer } from 'expo-sensors';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.fontSize}>Sienna Aid</Text>

      <Picker
        mode="dropdown"
        selectedValue={config.expectedEvent}
        style={{height: 50, width: 100, paddingBottom:200}}
        onValueChange={(itemValue, itemIndex) => {
          setExpectedEvent(itemValue)
        }}
        >
        <Picker.Item label="Falling" value="falling" />
        <Picker.Item label="Walking" value="walking" />
        <Picker.Item label="Laying" value="laying" />
      </Picker>

      <Button title="Start events" onPress={startEventTracking}></Button>
      <Button title="Stop events" onPress={stopEventTracking}></Button>
    </View>
  );
}

var config = {
  expectedEvent: null,
  trackingStarted: null,
  trackingEnded: null,
  sensors: {
    gyroscope: [],
    accelerometer: []
  }
};

function setExpectedEvent(eventName) {
  config.expectedEvent = eventName;
}

function startEventTracking() {
  config.trackingStarted = new Date();

  startSensors();
}

function stopEventTracking() {
  config.trackingEnded = new Date();

  stopSensors();
}


function startSensors() {
  Gyroscope.addListener(result => {
    config['sensors']['gyroscope'].push(result);
  });
  Accelerometer.addListener(result => {
    config['sensors']['accelerometer'].push(result);
  });
}

function stopSensors() {
  Gyroscope.removeAllListeners();
  Accelerometer.removeAllListeners();
  reportToHub();
}

function reportToHub() {
  var request = {
    Start: convertDateToString(config.trackingStarted),
    End: convertDateToString(config.trackingEnded),
    EventType: config.expectedEvent,
    Accelerometer: config['sensors'].accelerometer,
    Gyroscope: config['sensors'].gyroscope
  };

  fetch('https://10.70.41.3:5000/api/values', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
  // .then((response) => response.json())
  .then((responseJson) => {
    alert(JSON.stringify(responseJson));
  })
  
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


function convertDateToString(date) {
  return date.getFullYear() + "-" + 
        padLeft(date.getMonth() + 1, 2) + "-" + 
        padLeft(date.getDate(), 2) + " " + 
        padLeft(date.getHours(), 2) + ":" + 
        padLeft(date.getMinutes(), 2) + ":" + 
        padLeft(date.getSeconds(), 2);
}

function padLeft(str, length) {
  str += '';

  while (str.length < length) {
    str = '0' + str;
  }

  return str;
}


// var x = 0;
// Pedometer.watchStepCount(stepArgs => {
//   console.log(stepArgs.steps)
//   x = stepArgs.steps
// });

// Pedometer.setUpdateInterval(200);
// Pedometer.addListener(accelerometerData => {
//   var data = accelerometerData ;
//   console.log("x: " + Math.round(data.x) + " | y: " + Math.round(data.y) + " | z: " + Math.round(data.z)); 
// });
