import React, { useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const App: () => Node = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [bmiLabel, setBmiLabel] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setHeight('');
    setWeight('');
    setBmi('');
    setBmiLabel('');
    setIsEnabled(previousState => !previousState);
  };
  handleHeight = e => {
    setHeight(e);
  };
  handleWeight = e => {
    setWeight(e);
  };
  calculate = (height, weight) => {
    // Validare height/weight value, must be number
    if (!height.match(/^\d+$/) || !weight.match(/^\d+$/)) {
      alert('Please enter valid number!');
      setBmiLabel('');
      setBmi('');
      return;
    }
    var result;
    // Measurement system Imperial [cm, kg]
    if (isEnabled) {
      result =
        (parseFloat(weight) * 10000) /
        (parseFloat(height) * parseFloat(height));
    } else {
      // Measurement system Metric[in, lb]
      result =
        (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) * 703;
    }
    result = result.toFixed(2);

    // Display result as per BMI Categories:
    // Underweight = <18.5
    // Normal weight = 18.5–24.9
    // Overweight = 25–29.9
    // Obesity = BMI of 30 or greater
    setBmi(result);
    if (result < 18.5) {
      setBmiLabel('Underweight');
    } else if (result >= 18.5 && result < 25) {
      setBmiLabel('Normal weight');
    } else if (result >= 25 && result < 30) {
      setBmiLabel('Overweight');
    } else if (result >= 30) {
      setBmiLabel('Obese');
    } else {
      alert('Incorrect Input!');
      setBmiLabel('');
      setBmi('');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={isEnabled ? styles.toggleButtonActive : styles.toggleButton} onPress={toggleSwitch}>
            <Text style={styles.toggleButtonText}>
              Imperial
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={isEnabled ? styles.toggleButton : styles.toggleButtonActive} onPress={toggleSwitch}>
            <Text style={styles.toggleButtonText}>
              Metric
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder={isEnabled ? 'Weight (kg)' : 'Weight (lb)'}
          keyboardType="numeric"
          onChangeText={handleWeight}
          value={weight}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder={isEnabled ? 'Height (cm)' : 'Height (in)'}
          keyboardType="numeric"
          onChangeText={handleHeight}
          value={height}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.calculate(height, weight)}>
          <Text style={styles.buttonText}> Calculate BMI </Text>
        </TouchableOpacity>
        <Text style={styles.output}>{bmi}</Text>
        <Text style={styles.resultText}>{bmiLabel}</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: "#33691e"
  },
  input: {
    margin: 15,
    height: 45,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#689f38',
    padding: 10,
    margin: 15,
    height: 45,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  output: {
    textAlign: 'center',
    fontSize: 30,
  },
  resultText: {
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 30,
    color: '#33691e',
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    height: 40,
  },
  toggleButtonActive: {
    backgroundColor: '#689f38',
    padding: 10,
    height: 40,
    borderBottomWidth: 5,
    borderBottomColor: "#33691e"
  },
  toggleButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
