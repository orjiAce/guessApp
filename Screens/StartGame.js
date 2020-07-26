import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../Conponents/Card";
import { ColorAccent, ColorPrimary, ColorSecondary } from "../Theming/Colors";
import { ButtonWrap } from "../Theming/Styles";
import Input from "../Conponents/Input";
import NumberContainer from "../Conponents/NumberContainer";

const StartGame = ({onStartGame}) => {
  //let us write validation for our input field which only allows users to enter numeric values and no alphanumeric\
  const [enteredValue, setEnteredValue] = useState("");

  const [userConfirmed, setUserConfirmed] = useState(false);

  const [selectedNumber, setSelectedNumber] = useState(null);
  const handleInputValue = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInput = () => {
    setEnteredValue("");
    setUserConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    //check if input is really a number, further the entered number
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      //React native custome alert
      Alert.alert("Invalid number", "number has to be between 1 - 99", [
        { text: "okay", style: "destructive", onPress: resetInput },
      ]);
      return;
    }
    setUserConfirmed(true);
    setSelectedNumber(chosenNumber)
    setEnteredValue("");
    Keyboard.dismiss()
  };

  let confirmedOutPut;
  if (userConfirmed) {
    confirmedOutPut = (
      <Card styles={styles.resultContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        {/* 
        this calls the onStartGame props an passws the user selected number to it  */}
        <Button title="START GAME" onPress={ () => onStartGame(selectedNumber)}/>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.gameScreen}>
        <Text style={styles.welcomeTxt}>Start a new game</Text>
        <Card>
          <View style={styles.container}>
            <Text>Guess a number</Text>
            {/*
        this is our custom InputText component which takes a style props and also spreads other props
        */}
            <Input
              style={styles.input}
              maxLength={3}
              autoCorrect={false}
              keyboardType="number-pad"
              value={enteredValue}
              onChangeText={handleInputValue}
            />

            <View style={styles.btnWrap}>
              <TouchableHighlight onPress={() => resetInput()}>
                <Text style={styles.appButtonTextReset}> Reset</Text>
              </TouchableHighlight>
              <TouchableOpacity
                onPress={confirmInputHandler}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}> Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        {confirmedOutPut}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignContent: "center",
  },
  gameScreen: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  welcomeTxt: {
    padding: 10,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#444444",
    fontSize: 30,
  },

  input: {
    width: "80%",
    padding: 5,
    borderColor: "#e0dede",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    textAlign: "center",
  },
  btnWrap: {
    ...ButtonWrap,
  },
  button: {
    color: "#444",
    width: 100,
  },
  appButtonContainer: {
    width: 100,
    elevation: 8,
    backgroundColor: ColorAccent.accent,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: "transparent",

    shadowOpacity: 0,
  },
  appButtonContainerReset: {
    width: 100,
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: "transparent",
    shadowOpacity: 0.26,
  },
  appButtonTextReset: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  resultContainer: {
    marginTop: 20,
    width: "50%",
    alignItems: "center",
  },
});

export default StartGame;
