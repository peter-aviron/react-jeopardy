import React from "react";
import { Clue } from "../App";
import Question from "./Question";

interface Props {
    clueArray: any[];
    setCurrentClue: any;
    currentClue?: Clue;
}

function Column(props: Props) {
    return (
        <div>
            <div className="column-header">Test Header</div>
            {props.clueArray?.map((clue, index) => {
                return <Question clue={clue} key={index} setCurrentClue={props.setCurrentClue} currentClue={props.currentClue} />
            })}
        </div>
    )
}

export default Column;