import React, { useState, useRef, useEffect } from "react";
import classes from "./OpenEnd.module.css";

import {Markup} from "react-render-markup"

import check from "../../../assets/images/SVG/green-check.svg"
import ex from "../../../assets/images/SVG/red-ex.svg"

const OpenEnd = (props) => {
    const question = props.question;
    const inputNumber = props.question.inputNum

    const [indicationColor0, setIndicationColor0] = useState("");
    const [indicationColor1, setIndicationColor1] = useState("");
    const [indicationColor2, setIndicationColor2] = useState("");

    let indicationArray = [indicationColor0, indicationColor1, indicationColor2];
    let setIndicationArray = [setIndicationColor0, setIndicationColor1, setIndicationColor2];

    const indicationStyle = (i) => {
        if(indicationArray[i] === "green") {
            return { backgroundColor: "transparent", borderColor: "#1f5b1f", borderWidth: "5px"};
        } else if (indicationArray[i] === "red") {
            return { backgroundColor: "transparent", borderColor: "#aa281f", borderWidth: "5px"};
        }
    };
    
    const indicationIcon = (i) => {
        if(indicationArray[i] === "green") {
            return check;
        } else if (indicationArray[i] === "red") {
            return ex;
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        let answerInput0 = event.target.text0.value.trim();
        let answerInput1;
        let answerInput2;

        if (inputNumber === 2) {
            answerInput1 = event.target.text1.value.trim();
        } else if (inputNumber === 3) {
            answerInput2 = event.target.text2.value.trim();
        }

        let answerInputArray = [answerInput0, answerInput1, answerInput2];

        for (let i = 0; i < inputNumber; i++) {
            if (answerInputArray[i] !== "") {
                props.setAnsweredOpenEnd(true);
                if(question.correctAnswer[i].includes(answerInputArray[i])) {
                    setIndicationArray[i]("green");
                } else {
                    setIndicationArray[i]("red");
                }
            } 
        }
    }

    return (
        <div className={classes.OpenEnd}>
            <form onSubmit={handleSubmit}>
                <div className={classes.formContainer}>
                    <div className={classes.iconContainer}>
                        {props.answeredOpenEnd && <img src={indicationIcon(0)} alt="icon" className={`${classes.indicationIcon} ${classes[`indicationIcon${question.title[0]}`]}`} />}
                        {inputNumber !== 1 && props.answeredOpenEnd && <img src={indicationIcon(1)} alt="icon" className={`${classes.indicationIcon} ${classes[`indicationIcon${question.title[0]}`]}`} />}
                        {inputNumber === 3 && props.answeredOpenEnd && <img src={indicationIcon(2)} alt="icon" className={`${classes.indicationIcon} ${classes[`indicationIcon${question.title[0]}`]}`} />}
                    </div>
                    <div className={classes.title}> <Markup markup={question.title} /></div>
                    {inputNumber === 1 && <input
                    type="text"
                    style={indicationStyle(0)}
                    placeholder="הקלידו את תשובתכם..."
                    name="text0"
                    />}
                </div>
                {!props.answeredOpenEnd && <button type="submit" className={[`${classes.checkBtn} ${classes.white}`]}>בדיקה</button>}
            </form>
            { props.answeredOpenEnd && <div className={classes.white}> {question.explanation} </div>}
        </div>
    )
}

export default OpenEnd;
