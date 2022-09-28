import { Card } from "@mui/material";
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
        if(isSelectedQuestion && props.currentClue === undefined){
            setTextValue("")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentClue])

    function handleClick() {
        if(!props.currentClue && hasBeenClicked === false){
            setTextValue(props.clue?.question)
            props.setCurrentClue(props.clue)
            setHasBeenClicked(true)
        }
    }

    return (
        <Card
            className="question"
            onClick={handleClick}
        >
            {textValue}
        </Card>
    );
}

export default Question;
