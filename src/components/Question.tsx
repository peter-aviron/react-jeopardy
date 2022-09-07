import React from "react";
import { Clue } from "../App";

interface Props {
    clue: Clue;
    setCurrentClue: any;
    currentClue?: Clue;
}

function Question(props: Props) {
    const [textValue, setTextValue] = React.useState<any>(props.clue.value)
    const [hasBeenClicked, setHasBeenClicked] = React.useState<boolean>(false)

    React.useEffect(()=>{
        const isSelectedQuestion = textValue === props.clue.question
        console.log("hello from useEffect")
        if(isSelectedQuestion && props.currentClue === undefined){
            setTextValue("")
            console.log('textvalue', textValue)
            console.log('props.clue.question', props.clue.question)
            console.log('props.currentClue', props.currentClue)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentClue])

    function handleClick() {
        if(!props.currentClue && hasBeenClicked === false){
            setTextValue(props.clue?.question)
            props.setCurrentClue(props.clue)
        }
        setHasBeenClicked(true)
    }

    return (
        <div
            className="question"
            onClick={handleClick}
        >
            {textValue}
        </div>
    );
}

export default Question;
