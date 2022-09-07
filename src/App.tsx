import "./App.css";
import Column from "./components/Column";
import Answer from "./components/Answer";
import React from "react";
import axios from "axios";

export interface Clue { value: number; question: string; answer: string; }

function App() {
    const [columnClueArrays, setColumnClueArrays] = React.useState<any[]>([]);
    const [currentClue, setCurrentClue] = React.useState<Clue>();
    const [score, setScore] = React.useState<any>({ 1: 0, 2: 0 });
    const [currentPlayer, setCurrentPlayer] = React.useState<number>(1)

    async function getCluesByCategory(categoryId: number) {
        const response = await axios.get("https://jservice.io/api/clues?category=" + categoryId);
        const clueArray = response.data.slice(0, 5)
        // remove html characters 
        for (let i = 0; i < clueArray.length; i++) {
            let currentIterationClue = clueArray[i]
            let currentAnswer = currentIterationClue.answer
            clueArray[i].answer = currentAnswer.replace(/<[^>]*>?/gm, '');
        }

        setColumnClueArrays((prev) => {
            return [...prev, clueArray]
        })
    }

    // I want to run this code after the component first renders
    React.useEffect(() => {
        const categoryIdArray: number[] = [105, 21, 253]

        categoryIdArray.forEach((value) => {
            getCluesByCategory(value)
        })
    }, []);

    return (
        <div className="App">
            <div className="scoreboard">
                <div>Current Player: {currentPlayer} </div>
                <div>Player 1 Score: {score[1]}</div>
                <div>Player 2 Score: {score[2]}</div>
            </div>
            <Answer
                currentClue={currentClue}
                setScore={setScore}
                setCurrentClue={setCurrentClue}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
            />
            <div className="Board">
                <Column clueArray={columnClueArrays[0]} setCurrentClue={setCurrentClue} currentClue={currentClue} />
                <Column clueArray={columnClueArrays[1]} setCurrentClue={setCurrentClue} currentClue={currentClue} />
                <Column clueArray={columnClueArrays[2]} setCurrentClue={setCurrentClue} currentClue={currentClue} />
            </div>
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
