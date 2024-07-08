import React, {useState, useEffect} from "react";
import classes from "./MultipleChoise.module.css";
import data from "../../../data.json"

import check from "../../../assets/images/SVG/green-check.svg"
import ex from "../../../assets/images/SVG/red-ex.svg"
import clear from "../../../assets/images/SVG/clear.svg"

const MultipleChoise = (props) => {
    const question = props.question;
    let choiseBtnsElementsArray = question.choiseBtns;

    const [choiseBtnsArray, setChoiseBtnsArray] = useState(
        choiseBtnsElementsArray.map((term) => {
            return {
                term: term,
                selected: false,
                color: ""
            }
        })
    );

    const indicationStyle = (currTerm) => {
        let filteredArray = choiseBtnsArray;
        filteredArray = filteredArray.filter((term) => term.term === currTerm);
        let color = filteredArray[0].color;

        if(color === "green") {
            return {backgroundColor: "transparent", borderColor: "#1f5b1f", borderWidth: "5px", fontFamily: "Rubik-Regular"};
        } else if(color === "red") {
            return {backgroundColor: "transparent", borderColor: "#aa281f", borderWidth: "5px"};
        } 

        if(!props.answeredMultipleChoise) {
            if(filteredArray[0].selected) {
                return {borderWidth: "4px", fontFamily: "Rubik-Regular"};
            } else {
                return {borderWidth: "2px", fontFamily: "Rubik-Light"};
            }
        } else {
            if(question.correctAnswer.includes(filteredArray[0].term)) {
                return {backgroundColor: "transparent", borderColor: "#38281a", borderWidth: "7px", fontFamily: "Rubik-Regular"};
            }
        }
    }

    const indicationIcon = (currTerm) => {
        let filteredArray = choiseBtnsArray;
        filteredArray = filteredArray.filter((term) => term.term === currTerm);
        let color = filteredArray[0].color;

        if(color === "green") {
            return check;
        } else if (color === "red") {
            return ex;
        } else {
            return clear;
        }
    }
    
    const handleSelectedChoise = (event) => {
        setChoiseBtnsArray((prevArray) => (
            prevArray.map((btn) => {
                return btn.term === event.target.id ?
                { 
                    ...btn,
                    selected: !btn.selected
                } 
                :
                btn
            })
        ))
    }

    const handleSubmit = () => {
        let filteredArray = choiseBtnsArray;
        filteredArray = filteredArray.filter((term) => term.selected);

        if(filteredArray.length > 0) {
            setChoiseBtnsArray((prevArray) => (
                prevArray.map((btn) => {
                    return btn.selected ? 
                        question.correctAnswer.includes(btn.term) ?
                        { 
                            ...btn,
                            color: "green"
                        }
                        :
                        { 
                            ...btn,
                            color: "red"
                        } 
                    :
                    btn
                })
            ));
            props.setAnsweredMultipleChoise(true);
        }
    }

    const choisesBtnElements = choiseBtnsElementsArray.map((term) => {
        return <div key={term} className={[`${classes.choisesBtnElement} ${classes[props.page.exercise === "Exercise3" ? `Exercise3` : null]} ${classes[`${props.page}`]}`]}>
                    <button id={term} 
                        onClick={handleSelectedChoise} 
                        style={indicationStyle(term)} 
                        className={classes.choisesBtn}
                    > {term} </button>
                    { props.answeredMultipleChoise && <img className={classes.indicationIcon} src={indicationIcon(term)}/>}
                </div>
    })

    return (
        <div className={classes.MultipleChoise}>
            <div className={classes.MultipleChoise}>
                <div className={classes.title}> {question.title} </div>
                <div className={classes.choisesContainer}>
                    {choisesBtnElements}
                </div>
                
                { !props.answeredMultipleChoise && <button onClick={handleSubmit} className={[`${classes.checkBtn} ${classes.white}`]}>בדיקה</button>}
                { props.answeredMultipleChoise && <div className={classes.white}> {question.explanation} </div>}
            </div>
        </div>
    )
}

export default MultipleChoise;