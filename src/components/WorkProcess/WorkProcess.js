import React, {useEffect} from "react";
import classes from "./WorkProcess.module.css";
import data from "../../data.json"

import table1 from "../../assets/images/SVG/tables/workProcess1-table.svg"
import table2 from "../../assets/images/SVG/tables/workProcess2-table.svg"
import candle from "../../assets/images/SVG/candles/candle3.svg"

const WorkProcess = (props) => {
    const tablesArray = [table1, table2]
    const stepsArray = data.pages[props.currPage].title;

    const stepElement = stepsArray.map((term, index) => {
        return <span key={term}>
            <div className={[`${classes.text} ${classes[`text${index}`]}`]}> {term} </div>
            <img className={[`${classes[`table${index}`]}`]} src={tablesArray[index]} />
            <img className={[`${classes[`candle${index}`]}`]} src={candle} />
        </span>
    })

    return (
        <div className={classes["WorkProcess"]}>
            <div className={[`${classes.text} ${classes.title}`]}>תהליך עבודה</div>
            {stepElement}
        </div>
    )
}

export default WorkProcess;