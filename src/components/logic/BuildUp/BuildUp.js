import React, {useState, useEffect} from "react";
import classes from "./BuildUp.module.css";

const BuildUp = (props) => {
    const question = props.question;
    const answerBtnsArray = question.question;

    const [displayPart, setDisplayPart] = useState(0);
    const [indication, setIndication] = useState(["", "", ""]);
    const [displayInncorrect, setDisplayIncorrect] = useState(false);

    const handleBtnClick = (event, partNum) => {
        setDisplayIncorrect(false);

        if(event.currentTarget.id === question.correctAnswer[partNum]) {
            setIndication((prev) => (
                prev.map((btn, index) => {
                  return index === partNum ?
                  "green"
                  :
                  btn
                })
            )) 

            setDisplayPart((prev) => prev + 1);
        } else {
            setDisplayIncorrect(true);
        }
    };

    const indicationStyle = (term, partNum) => {
        if(term === question.correctAnswer[partNum] && indication[partNum] === "green") {
            return {backgroundColor: "transparent", borderColor: "#1f5b1f", borderWidth: "5px"};
        }
    };

    useEffect(() => {
        if(indication[1] !== "") {
            props.setAnsweredBuildUp(true);
        }
    }, [indication])

    const makeBtnElements = (term, index) => {
        let currBtns = term;    
        currBtns = currBtns.map((oneTerm, i) => {
            return <button 
                key={oneTerm} 
                id={oneTerm} 
                onClick={indication[index] === "" ? (event) => handleBtnClick(event, index) : null} 
                style={indicationStyle(oneTerm, index)} 
                className={[`${classes.text} ${classes.answerBtn}`]}
            > {oneTerm} </button>
        });
        return currBtns;
    }

    const answerBtns = answerBtnsArray.map((term, index) => {
        return displayPart >= index ? <div key={term} className={classes.btnsContainer}> {makeBtnElements(term, index)} </div> : null
    })

    return (
        <div className={classes.BuildUp}>
            <div className={[`${classes.title} ${classes.text}`]}> {question.title} </div>

            <div className={classes.termsContainer}>
                {answerBtns}
            </div>
            
            { displayInncorrect && <div className={[`${classes.text} ${classes.white}`]}> נסה שוב... </div>}
            { indication[2] !== "" && <div className={[`${classes.text} ${classes.explanation}`]}> {question.explanation} </div>}
        </div>
    )
}

export default BuildUp;