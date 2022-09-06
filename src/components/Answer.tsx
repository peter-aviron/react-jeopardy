import React from "react";
import { Clue } from "../App";

interface Props {
    currentClue?: Clue;
    setScore: any;
    setCurrentClue: any;
}

function Answer(props:Props){
    const [userInput,setUserInput] = React.useState("")
    const [feedback, setFeedback] = React.useState<String>("")

    function changeHandler (e:any) {
        setUserInput(e.target.value)
    }

    function submitHandler (e:any) {
        if(userInput.toLowerCase() === props.currentClue?.answer.toLowerCase()){
            props.setScore((prevScore:number)=>prevScore + (props.currentClue?.value ?? 0))
            setFeedback("Correct")
        } else {
            props.setScore((prevScore:number)=>prevScore - (props.currentClue?.value ?? 0))
            setFeedback("Incorrect")
        }
        props.setCurrentClue(undefined)
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