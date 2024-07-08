import React, { useEffect, useState } from "react";
import classes from "./Opening.module.css";
import data from "../../data.json"

import logo from "../../assets/images/SVG/mea-logo.svg"
import pyramid1 from "../../assets/images/SVG/pyramids/pyramid1.svg"
import pyramid2 from "../../assets/images/SVG/pyramids/pyramid2.svg"
import pyramid3 from "../../assets/images/SVG/pyramids/pyramid3.svg"
import pyramidDoor from "../../assets/images/SVG/pyramids/pyramid-door.svg"

const Opening = (props) => {
    const [showOpener, setShowOpener] = useState(true);
    const [showTunnel, setShowTunnel] = useState(false);
    const [showDoor, setShowDoor] = useState(false);

    const handleStartBtn = () => {
        setShowOpener(false);

        setTimeout(() => {
            setShowDoor(true);
        }, 6000)
    }

    const handleNextPage = () => {
        setShowTunnel(true);

        setTimeout(() => {
            props.setCurrPage(prev => prev + 1)
        }, 6000)
    }

    return (
        <div className={classes["Opening"]}>
            {showOpener && <img className={classes.logo} src={logo} onClick={() => props.setCurrPage(27)}/>}
            <div className={classes["ground"]}></div>
            {showOpener && 
                <div className={classes["header-container"]}>
                    <header className={classes["header"]}>שפת עבודה עם נתונים</header>
                    <button className={classes["start-btn"]} onClick={handleStartBtn}>התחלה</button>
                </div>
            }
            <div className={classes[showOpener ? "pyramid-container-before" : "pyramid-container-after"]}>
                <img className={`${classes[showOpener ? "pyramid1-before" : "pyramid1-after"]} ${classes[showTunnel ? `pyramidSide` : null]}`} src={pyramid1} />
                <img className={classes[showOpener ? "pyramid2-before" : "pyramid2-after"]} src={pyramid2}/>
                <img className={classes[showOpener ? "pyramid3-before" : "pyramid3-after"]} src={pyramid3}/>
            </div>
            {!showOpener && 
                <div className={classes['SubOpening']}>
                    {!showTunnel && <div className={classes["text-container"]}>
                        <div className={[`${classes.text1} ${classes.text}`]}> {data.pages[0].text[0]} </div>
                        <div className={[`${classes.text2} ${classes.text}`]}> {data.pages[0].text[1]} </div>
                        <div className={[`${classes.text3} ${classes.text}`]}> {data.pages[0].text[2]} </div>
                    </div>}
                    <img className={[`${classes[`pyramid-door`]} ${classes[showTunnel ? `tunnel` : null]} ${classes[showDoor ? `pyramidDoorTrue` : null]}`]} src={pyramidDoor} onClick={showDoor? handleNextPage : null}/>
                    {!showTunnel && <div className={`${classes.text} ${classes.text4}`}> {data.pages[0].subText} </div>}
                    {showTunnel && <div className={[classes.blackScreen]}></div>}
                </div>
            }
        </div>
    )
}
export default Opening;