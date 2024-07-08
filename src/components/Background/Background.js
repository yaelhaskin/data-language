import React, { useEffect, useState } from "react";
import classes from "./Background.module.css";
import data from "../../data.json"

import background from "../../assets/images/SVG/background.svg"

const Background = (props) => {
    const page = data.pages[props.currPage];
    let bgArray =  Array(page.background.length);
    
    const createBgArray = () => {
        for(let i = 0; i < bgArray.length; i++) {
            bgArray[i] = <span key={i}>
            <div 
            className={[`${classes.mask} 
                        ${classes[`maskPage${props.currPage}Index${i}`]} 
                        ${page.background[`${props.pageState}Ani`] && props.showAni 
                            ? 
                            classes[`${props.pageState}Ani${page.background.index}Index${i}`] 
                            :null}
                    `]}
            >
                <img src={background}/>
            </div>
            <div 
            className={[`${classes.gradient} 
                        ${classes[`gradientPage${props.currPage}Index${i}`]} 
                        ${page.background[`${props.pageState}Ani`] && props.showAni 
                        ? 
                        classes[`${props.pageState}Ani${page.background.index}Index${i}`] 
                        :null}
                    `]}
            ></div>
        </span>
        }
        return bgArray;
    }

    const handleShowAni = () => {
        if(props.currPage !== 0 && 
        props.currPage !== 25 && 
        JSON.parse(sessionStorage.getItem("openedPages"))?.includes(props.currPage)) {
            props.setShowAni(false);
        } else {
            props.setShowAni(true);
            sessionStorage.setItem("openedPages", JSON.stringify([...JSON.parse(sessionStorage.getItem("openedPages")), props.currPage]));
        }
    }
    
    useEffect(() => {
        props.setPageState("open");

        if(JSON.parse(sessionStorage.getItem("openedPages")) === null) {
            sessionStorage.setItem("openedPages", JSON.stringify([]));
        } else {
            handleShowAni();
        }
    }, [props.currPage]);

    return (
        <div className={[`${classes.Background}`]}>
            {createBgArray()}
        </div>
    )
}

export default Background;