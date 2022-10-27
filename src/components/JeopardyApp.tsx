import React from 'react'
import Column from "./Column";
import Answer from "./Answer";
import axios from "axios";
import { Box, Grid, Modal, Paper } from "@mui/material";

export interface Clue {
    value: number;
    question: string;
    answer: string;
}

function JeopardyApp() {
    const initialScore = { 1: 0, 2: 0, 3:0};
    const categoryIdArray: number[] = [105, 22, 104];
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
        const clueArray = response.data.filter((clue: any) => {
            return clue.value
        }).slice(startIndex, startIndex + 5);
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
        if (score[1] >= 400 || score[2] >= 400 || score[3] >= 400) {
            let winner
            if (currentPlayer === 1) {
                winner = 3
            } else if (currentPlayer === 2) {
                winner = 1
            } else {
                winner = 2
            }
            setWinDiv("Player " + winner + " wins!");
        }
    }, [score]);

    function handleReset() {
        setScore(initialScore)
        setColumnClueArrays([])
        categoryIdArray.forEach((value) => {
            getCluesByCategory(value, 5);
        })
        setWinDiv(undefined)
        setCurrentPlayer(1)
    }

   
    return (
        <div className="App">
            <div className="scoreboard">
                <div className={"scoreboardPodium" + (currentPlayer === 1 ? " currentPlayer" : '')}>
                    <div className="podiumInterior">
                        ${score[1]}
                    </div>
                </div>
                <div className={"scoreboardPodium" + (currentPlayer === 2 ? " currentPlayer" : '')}>
                    <div className="podiumInterior">
                        ${score[2]}
                    </div>
                </div>
                <div className={"scoreboardPodium" + (currentPlayer === 3 ? " currentPlayer" : '')}>
                    <div className="podiumInterior">
                        ${score[3]}
                    </div>
                </div>
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

export default JeopardyApp;