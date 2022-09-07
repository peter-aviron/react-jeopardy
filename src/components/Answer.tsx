import React from "react";
import { Clue } from "../App";

interface Props {
    currentClue?: Clue;
    setScore: any;
    setCurrentClue: any;
    currentPlayer: number;
    setCurrentPlayer: any;
}

function Answer(props:Props){
    const [userInput,setUserInput] = React.useState("")
    const [feedback, setFeedback] = React.useState<string>("")

    function changeHandler (e:any) {
        setUserInput(e.target.value)
    }

    function submitHandler (e:any) {
        if(userInput.toLowerCase() === props.currentClue?.answer.toLowerCase()){
            props.setScore((prevScore: any)=>{
                return {...prevScore, [props.currentPlayer]: prevScore[props.currentPlayer] + (props.currentClue?.value ?? 0)}
            })
            setFeedback("Correct")
        } else {
            props.setScore((prevScore: any)=>{
                return {...prevScore, [props.currentPlayer]: prevScore[props.currentPlayer] - (props.currentClue?.value ?? 0)}
            })
            setFeedback("Incorrect")
        }
        props.setCurrentClue(undefined)
        props.setCurrentPlayer(props.currentPlayer === 1 ? 2 : 1)
        setUserInput('')
    }

    return (
        <div>
            <input value={userInput} onChange={changeHandler}/>
            <button onClick={submitHandler}>Submit</button>
            <div>
                {feedback}
            </div>
        </div>
    )
}

export default Answer;