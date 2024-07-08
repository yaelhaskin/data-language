import React, {useEffect} from "react";
import classes from "./VariableTypesCandles.module.css";
import data from "../../data.json"

import candle from "../../assets/images/SVG/candles/candle-big.svg"
import check from "../../assets/images/SVG/plain-check.svg"

const VariableTypesCandles = (props) => {
    const termsArray = data.pages[props.currPage].terms;
    
    const handleTermClick = (event, index) => {
        if(event.currentTarget.id === termsArray[index]) {
            sessionStorage.setItem("visitedPages", JSON.stringify([...JSON.parse(sessionStorage.getItem("visitedPages")), index]));
        } 
        props.setCurrPage(30 + index);
    }

    const checkIfIncludes = (num) => {
        if(JSON.parse(sessionStorage.getItem("visitedPages"))?.includes(num)) {
            return true;
        } else return false;
    }

    useEffect(() => {
        props.setArrowFront(false);
        props.setArrowBack(true);
        
        if(JSON.parse(sessionStorage.getItem("visitedPages")) === null) {
            sessionStorage.setItem("visitedPages", JSON.stringify([]));
        } else if(checkIfIncludes(0) && checkIfIncludes(1)) {
            props.setArrowFront(true);
        }
    }, [])

    const termElement = termsArray.map((term, index) => {
        return <span key={term} className={[`${classes.termContainer} ${classes[`termContainer${index}`]}`]}>
            <div id={term} onClick={(event) => handleTermClick(event, index)} 
                className={[`
                ${classes.text} 
                ${classes[`title${index}`]} 
                ${classes[checkIfIncludes(index) ? `after` : `before`]}`]}
            > {term} </div>

            <img className={[`${classes.candle}`]} src={candle}/>
            {checkIfIncludes(index) && 
                <img id={term} src={check} className={[`${classes.indicationIcon} ${classes[`indicationIcon${index}`]}`]} /> 
            }
        </span>
        })
        
    return (
        <div className={classes["VariableTypesCandles"]}>
            <div className={classes.title}>סוגי משתנים</div>
            {termElement}
        </div>
    )
}

export default VariableTypesCandles;