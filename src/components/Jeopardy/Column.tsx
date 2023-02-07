import React from "react";
import { Clue } from "./JeopardyApp";
import Question from "./Question";

interface Props {
    clueArray: any[];
    setCurrentClue: any;
    currentClue?: Clue;
}
//https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      }
    );
  }

function Column(props: Props) {
    const headerCatTitle = (props.clueArray && props.clueArray.length !== 0) ? props.clueArray[0]['category']['title'] : ""
    return (
        <div>
            <div className="column-header">{toTitleCase(headerCatTitle)}</div>
            {props.clueArray?.map((clue, index) => {
                return <Question clue={clue} key={index} setCurrentClue={props.setCurrentClue} currentClue={props.currentClue} />
            })}
        </div>
    )
}

export default Column;