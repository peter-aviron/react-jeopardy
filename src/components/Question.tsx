import React from "react";
import { Clue } from "./JeopardyApp";

interface Props {
    clue: Clue;
    setCurrentClue: any;
    currentClue?: Clue;
}

function Question(props: Props) {
    const [textValue, setTextValue] = React.useState<any>(props.clue.value)
    const [hasBeenClicked, setHasBeenClicked] = React.useState<boolean>(false)

    React.useEffect(() => {
        const isSelectedQuestion = textValue === props.clue.question
        if (isSelectedQuestion && props.currentClue === undefined) {
            setTextValue("")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentClue])

    function handleClick(e:any) {
        if (!props.currentClue && hasBeenClicked === false) {
            e.target.parentElement.style.transform = "rotateY(180deg)"
            setTextValue(props.clue?.question)
            props.setCurrentClue(props.clue)
            setHasBeenClicked(true)
        }
    }

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front" onClick={handleClick}>
                    {props.clue.value}
                </div>
                <div className="flip-card-back" style={{backgroundColor: "lightgray"}}>
                    {textValue}
                </div>
            </div>
        </div>
    );
}

export default Question;