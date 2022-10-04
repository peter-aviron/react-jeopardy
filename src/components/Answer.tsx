import React, { useEffect } from "react";
import { Clue } from "./JeopardyApp";
import { Grid, TextField, Button } from "@mui/material";

interface Props {
    currentClue?: Clue;
    setScore: any;
    setCurrentClue: any;
    currentPlayer: number;
    setCurrentPlayer: any;
    score: any;
}

function Answer(props: Props) {
    const [userInput, setUserInput] = React.useState("")
    const [feedback, setFeedback] = React.useState<string>("")

    function changeHandler(e: any) {
        setUserInput(e.target.value)
    }

    function submitHandler(e: any) {
        if (userInput.toLowerCase() === props.currentClue?.answer.toLowerCase()) {
            props.setScore((prevScore: any) => {
                return { ...prevScore, [props.currentPlayer]: prevScore[props.currentPlayer] + (props.currentClue?.value ?? 0) }
            })
            setFeedback("Correct")
        } else {
            props.setScore((prevScore: any) => {
                return { ...prevScore, [props.currentPlayer]: prevScore[props.currentPlayer] - (props.currentClue?.value ?? 0) }
            })
            setFeedback("Incorrect")
        }
        props.setCurrentClue(undefined)

        props.setCurrentPlayer(props.currentPlayer === 1 ? 2 : 1)
        setUserInput('')
    }

    return (
        <Grid container justifyContent="center" alignItems='center' spacing={1} className="inputContainer">
            <Grid item>
                <TextField label="Answer Here" variant="outlined" value={userInput} onChange={changeHandler} />
            </Grid>
            <Grid item>
                <Button onClick={submitHandler}>Submit</Button>
            </Grid>
            <Grid item>
                {feedback}
            </Grid>
        </Grid>
    )
}

export default Answer;