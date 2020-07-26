import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Button, Text, Alert } from "react-native";
import NumberContainer from "../Conponents/NumberContainer";
import Card from "../Conponents/Card";

//function that generate the random number
//the guess function

const generateRandomBetweenNumber = (min, max, Exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === Exclude) {
    //recursion: calling a function inside same function
    generateRandomBetweenNumber(min, max, Exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetweenNumber(1, 100, userChoice)
  );
  const [rounds, setRounds] = useState(0);

  //use useEffect to check if the computer's guess matches user entered number

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
        //if the two condition is true then game over
      onGameOver(rounds);
     // console.log(rounds)
     //Alert.alert('Hey you got it', 'nice one', [{text:'clean', style:'cancel'}])
    }
      //an array of dependecies this functions uses
  }, [currentGuess, userChoice, onGameOver]);

  //this type of constant declaration survives component rerendering, the numbe declared doesn;t regenerate when
  //he conponent is re-rendered and that is exactly what we need
  //initial max and min number
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = (direction) => {
    //condition: if direction lower and the number the computer guessed is lower than what the user guessed
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    //if the computer guess is lower then the computer should genereate a anew random number
    if (direction === "lower") {
      //takes the current number and stored it as the new current guess and will never be reused/rerendered
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    //takes the current low and high in to account respectively, exclude the currentGuess
    //exclude currentGuess so we can't guess the same number again here
    const nextNumber = generateRandomBetweenNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //increase the rounds each time the computer makes a guess
    setRounds((curRounds) => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card styles={styles.buttonContainer}>
        <Button title="Lower" onPress={nextGuessHandler.bind(this, "lower")} />
        <Button
          title="Greater"
          onPress={nextGuessHandler.bind(this, "higher")}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
