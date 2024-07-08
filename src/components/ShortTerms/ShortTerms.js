import React, {useEffect} from "react";
import classes from "./ShortTerms.module.css";
import data from "../../data.json"

import candle1 from "../../assets/images/SVG/candles/candle-medium.svg"

const ShortTerms = (props) => {
    const termsArray = data.pages[props.currPage].title;
    
    const termElement = termsArray.map((term, index) => {
        return <div key={term} className={[`${classes.termContainer} ${classes[`termContainer${props.currPage === 2 ? index : index + 3}`]}`]}>
            <div className={[`${classes.title} ${classes.text} ${classes[`title${props.currPage === 2 ? index : index + 3}`]}`]}> {term} </div>
            <div className={[`${classes.text} ${classes[`text${props.currPage === 2 ? index : index + 3}`]}`]}> {data.pages[props.currPage].text[index]} </div>
            <img className={[`${classes.candle} ${classes[`candle${props.currPage === 2 ? index : index + 3}`]}`]} src={candle1} />
        </div>
    })

    return (
        <div className={classes["ShortTerms"]}>
            {termElement}
            <div className={classes["example-btn"]} onClick={() => props.setCurrPage(props.currPage + 26)}>לדוגמה</div>
        </div>
    )
}

export default ShortTerms;