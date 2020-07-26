import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./Conponents/Header";
import StartGame from "./Screens/StartGame";
import GameScreen from "./Screens/GameScreen";
import GameOver from "./Screens/GameOver";

export default function App() {
  const [userNumber, setuserNumber] = useState();

  //this state wil determine when the game has ended
  const [guessRound, setGuessRounds] = useState(0);

  //functions to start game and get selected number and pass it to userNumber as value
  const startGameHandler = (selectedNumber) => {
    setuserNumber(selectedNumber);
    setGuessRounds(0);
  };
  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setuserNumber(null);
  };

  const gameOverHandler = (numberOfRounds) => {
    //numberOfRounds will be passed from the game Screen and once that number is greater than the gaem ends
    setGuessRounds(numberOfRounds);
  };
  //pass the startGameHandler function as prop to the startGame conponent where it will be trciggered and passed the user
  //number as value
  let content = <StartGame onStartGame={startGameHandler} />;

  //show Game screen if userNumber is set/true
  if (userNumber && guessRound <= 0) {
      //the user number which is gotten from the Start game screen wil then be pass then to Game screen As props (userChoice)
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRound > 0) {
    console.log(guessRound)
    content = 
      <GameOver
        roundsNumber={guessRound}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    
  }

  return (
    <View style={styles.container}>
      <Header title={"Guess App"} />

      {/* 

conditionally load screens/componets
*/}
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
