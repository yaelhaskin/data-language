import React, {useEffect} from "react";
import classes from "./OneText.module.css";
import data from "../../data.json"

import candle from "../../assets/images/SVG/candles/candle2.svg"

const OneText = (props) => {
    const page = data.pages[props.currPage];
    const infoText = page.info.text;

    const textElements = infoText.map((text) => (
        <div key={text} 
                    className={[`
                    ${classes.text} 
                    ${classes[`${page.info.color}Color`]}
                    ${ 13 <= props.currPage && props.currPage <= 16 ? classes.VLtext : null}
                    `]}
        > { text } </div>
    ))

    // small candle gradient in pages 13, 14, 15, 16
    let gradientArray = [13, 14, 15, 16];
    gradientArray = gradientArray.filter((index) => props.currPage > index);
    const gradientElements = gradientArray.map((index) => {
        return <div 
                key={index}
                className={[`
                ${classes["smallGradient"]} 
                ${classes[`gradient${index}`]}
                `]}>
            </div>
    })

    return (
        <div className={classes.OneText}>
            { page.title.text !== "" && <div 
                                        className={[`
                                        ${classes.text} 
                                        ${classes.title} 
                                        ${classes[`${page.title.color}Color`]}
                                        ${classes[13 <= props.currPage && props.currPage <= 16 ? `titleAbsolute` : null]}
                                        `]}> 
                                        { page.title.text } </div> }
            { page.subtitle.text !== "" && 
                <div className={[`
                    ${classes.text} 
                    ${classes.subtitle} 
                    ${classes[`${page.subtitle.color}Color`]}
                    ${classes[13 <= props.currPage && props.currPage <= 16 ? `textMarginTop` : null]}
                `]}> { page.subtitle.text } </div> 
            }

            {/* <div className={13 <= props.currPage && props.currPage <= 16 ? classes.textElementsContainer : null}> */}
                {textElements}
            {/* </div> */}

            { 13 < props.currPage && props.currPage <= 16 ? gradientElements : null}
            { 13 <= props.currPage && props.currPage <= 16 ? <img className={classes.candle} src={candle}/> : null}

            { 30 <= props.currPage && props.currPage <= 31 ?
                <div className={[`${classes.arrow} ${classes.back}`]} 
                    onClick={() => {props.setCurrPage(9)}}>
                    <span>חזור אחור</span>
                </div>
            : null
            }
        </div>
    )
}

export default OneText;