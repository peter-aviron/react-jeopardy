import "./App.css";
import Column from "./components/Column";
import Answer from "./components/Answer";
import React from "react";
import axios from "axios";
import { Box, Grid, Modal, Paper } from "@mui/material";

export interface Clue {
  value: number;
  question: string;
  answer: string;
}

function App() {
  const initialScore = { 1: 0, 2: 0 };
  const categoryIdArray: number[] = [105, 21, 253];
  const [columnClueArrays, setColumnClueArrays] = React.useState<any[]>([]);
  const [currentClue, setCurrentClue] = React.useState<Clue>();
  const [score, setScore] = React.useState<any>(initialScore);
  const [currentPlayer, setCurrentPlayer] = React.useState<number>(1);
  const [winDiv, setWinDiv] = React.useState<string>();

  console.log(columnClueArrays)
  async function getCluesByCategory(categoryId: number, startIndex: number) {
    const response = await axios.get(
      "https://jservice.io/api/clues?category=" + categoryId
    );
    const clueArray = response.data.slice(startIndex, startIndex + 5);
    // remove html characters
    for (let i = 0; i < clueArray.length; i++) {
      let currentIterationClue = clueArray[i];
      let currentAnswer = currentIterationClue.answer;
      clueArray[i].answer = currentAnswer.replace(/<[^>]*>?/gm, "");
    }

    setColumnClueArrays((prev) => {
      return [...prev, clueArray];
    });
  }

  // I want to run this code after the component first renders
  React.useEffect(() => {
    categoryIdArray.forEach((value) => {
      getCluesByCategory(value, 0);
    });
  }, []);

  React.useEffect(() => {
    if (score[1] >= 400 || score[2] >= 400) {
      setWinDiv("Player " + (currentPlayer === 1 ? 2 : 1) + " wins!");
    }
  }, [score]);

  function handleReset() {
    setScore(initialScore)
    setColumnClueArrays([])
    categoryIdArray.forEach((value) => {
      getCluesByCategory(value, 5);
    })
    setWinDiv(undefined)
  }

  return (
    <div className="App">
      <div className="scoreboard">
        <div>Current Player: {currentPlayer} </div>
        <div>Player 1 Score: {score[1]}</div>
        <div>Player 2 Score: {score[2]}</div>
      </div>
        <Modal open={winDiv ? true : false} >
          <Box className='WinModal'>
          {winDiv}
          <button
            onClick={handleReset}
          >
            Reset Game
          </button>
          </Box>
        </Modal>
      <Answer
        currentClue={currentClue}
        setScore={setScore}
        setCurrentClue={setCurrentClue}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        score={score}
      />
      <Grid container xs={12} justifyContent='center'>
        <Paper className="Board" elevation={8}>
          <Column
            clueArray={columnClueArrays[0]}
            setCurrentClue={setCurrentClue}
            currentClue={currentClue}
          />
          <Column
            clueArray={columnClueArrays[1]}
            setCurrentClue={setCurrentClue}
            currentClue={currentClue}
          />
          <Column
            clueArray={columnClueArrays[2]}
            setCurrentClue={setCurrentClue}
            currentClue={currentClue}
          />
        </Paper>
      </Grid>
    </div>
  );
}

export default App;

// Question component
// Column component which contains questions
// Board component which contains columns
// App/Main component containing board, scoreboard, answer, correct/incorrect
// Answer/Input component
// Scoreboard component
// Correct/Incorrect component
