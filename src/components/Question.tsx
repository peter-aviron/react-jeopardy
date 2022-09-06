import React from "react";
import { Clue } from "../App";

interface Props {
    clue: Clue;
    setCurrentClue: any;
    currentClue?: Clue;
}

function Question(props: Props) {
    const [textValue, setTextValue] = React.useState<any>(props.clue.value)

    React.useEffect(()=>{
        const isSelectedQuestion = textValue === props.clue.question
        if(isSelectedQuestion && !props.currentClue){
            setTextValue("")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentClue])

    function handleClick() {
        if(!props.currentClue){
            setTextValue(props.clue?.question)
            props.setCurrentClue(props.clue)
        }
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
