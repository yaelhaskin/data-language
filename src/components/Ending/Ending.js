import React, {useEffect, useState} from "react";
import classes from "./Ending.module.css";

import pyramid2 from "../../assets/images/SVG/pyramids/pyramid2.svg"
import pyramid3 from "../../assets/images/SVG/pyramids/pyramid3.svg"

const Ending = (props) => {
    const [showEnd, setShowEnd] = useState(false);

    useEffect(() => {
        if(sessionStorage.getItem("showEnd") === null) {
            setTimeout(() => {
                setShowEnd(true);
                sessionStorage.setItem("showEnd", true);
            }, 4000)
        } else {
            setShowEnd(true);
        }
    }, [])

    return (
        <div className={classes["Ending"]}>
            <div className={[`${classes.brownBox}`]}></div>
            <div className={[`${classes.lightBox} ${classes[sessionStorage.getItem("showEnd") === null ? "lightBoxAni" : null]}`]}>
                <div className={classes.sky}></div>
                <div className={classes.ground}></div>
            </div>

            {showEnd && <div>
                <div className={classes["header-container"]}>
                    <header className={classes["title"]}>כל הכבוד</header>
                    <h3 className={`${classes["title"]} ${classes["subtitle"]}`}>יצאתם מהפירמידה בשלום!</h3>
                    
                    <div className={classes.btnsContainer}>
                        <button onClick={() => {props.setCurrPage(1)}} className={classes["start-btn"]}>בא לי עוד סיבוב!</button>
                        <button onClick={() => props.setCurrPage(27)} className={classes["start-btn"]}>אודות</button>
                    </div>
                </div>

                <div>
                    <img className={`${classes.pyramid2}`} src={pyramid2}/>
                    <img className={`${classes.pyramid3}`} src={pyramid3}/>
                </div>
            </div>}
        </div>
    )
}

export default Ending;