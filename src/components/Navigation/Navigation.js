import React, { useEffect } from "react";
import classes from "./Navigation.module.css";
import data from "../../data.json"

const Navigation = (props) => {
    const page = data.pages[props.currPage];

    const handleArrowFrontCilck = () => {
        props.setPageState("close");
        props.setClickedArrowFront(true);

        if(page.background.closeAni && props.showAni) {
            setTimeout(() => {
                goToNextPage();
            }, 2000)
        } 
        else {
            goToNextPage();
        }
    }

    const goToNextPage = () => {
        props.setPageState("open");
        props.setCurrPage(prev => prev + 1);
    }

    return (
        <div>
            <div className={classes.arrowsContainer} style={!props.arrowFront ?  {justifyContent: "flex-end"} : {justifyContent: "space-between"}}>
                {props.arrowFront && <div className={[`${classes.arrow}`]} onClick={handleArrowFrontCilck}>המשך בדרך</div>}
                {props.arrowBack && <div className={[`${classes.arrow} ${classes.back}`]} onClick={() => {props.setCurrPage(prev => prev - 1)}}>
                    <span>חזור אחורה</span>
                </div>}
            </div>
        </div>
    )
}

export default Navigation;

