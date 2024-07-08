import React from "react";
import classes from "./About.module.css";
import data from "../../data.json"

import logo from "../../assets/images/SVG/mea-logo.svg"
import pyramid from "../../assets/images/SVG/pyramids/pyramid-side.svg"

const About = (props) => {
    const page = data.pages[props.currPage];

    return (
        <div className={classes["About"]}>
            <img className={classes.logo} src={logo} onClick={() => props.setCurrPage(0)}/>
            <div className={classes["ground"]}></div>

            <div className={classes["header-container"]}>
                <header className={`${classes["text"]} ${classes["title"]}`}>מי אנחנו?</header>
                <div className={classes["subtitle-container"]}>
                    <span className={`${classes["text"]} ${classes["subtitle"]}`}> {page.mea[0]} </span>
                    <div className={`${classes["text"]} ${classes["subtitle"]} ${classes["subtitle2"]}`}> {page.mea[1]} </div>
                </div>
            </div>
            
            <div className={`${classes["text"]} ${classes["textBlock"]}`}> {page.text} </div>
            
            <div className={classes.peopleContainer}>
                <span className={`${classes["text"]} ${classes["person1"]}`}> {page.person1} </span>
                <span className={`${classes["text"]} ${classes["person2"]}`}> {page.person2} </span>
            </div>

            <img className={`${classes.pyramid}`} src={pyramid}/>
            <div className={[`${classes.arrow} ${classes.back}`]} onClick={() => props.setCurrPage(prev => prev - 1)}>
                <span>חזור אחורה</span>
            </div>
        </div>
    )
}

export default About;