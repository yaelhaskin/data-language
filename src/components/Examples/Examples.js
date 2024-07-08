import React, {useEffect} from "react";
import classes from "./Examples.module.css";
import data from "../../data.json"

const Examples = (props) => {
    const page = data.pages[props.currPage];

    return (
        <div className={classes["Examples"]}>
            {props.currPage === 28 || props.currPage === 29 ? 
            <div className={[`${classes.arrow} ${classes.back}`]} onClick={() => {props.setCurrPage(prev => prev - 26)}}>
                <span>חזור אחורה</span>
            </div>
            :
            null}
            <div className={`${classes.title} ${classes.text}`}> {page.title} </div>
            <img className={`${classes.image} ${props.currPage === 29 ? classes.example2 : null}`} src={require(`../../assets/images/SVG/tables/${page.image}.svg`)}/>
            {
                props.currPage === 29 ?
                <div className={classes.otherTextContainer}>
                    <div className={`${classes.otherText} ${classes.text}`}> {page.text1} </div> 
                    <div className={`${classes.otherText} ${classes.text}`}> {page.text2} </div> 
                </div>
                :
                <div className={classes.text}> {page.text} </div> 
            }
        </div>
    )
}

export default Examples;