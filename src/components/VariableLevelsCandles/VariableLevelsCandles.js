import React, {useEffect, useState, useRef} from "react";
import classes from "./VariableLevelsCandles.module.css";
import data from "../../data.json"

import background from "../../assets/images/SVG/background.svg"
import candle0 from "../../assets/images/SVG/candles/candle0.svg"
import candle1 from "../../assets/images/SVG/candles/candle1.svg"
import candle2 from "../../assets/images/SVG/candles/candle2.svg"
import candle3 from "../../assets/images/SVG/candles/candle3.svg"

const VariableLevelsCandles = (props) => {
    const candleArray = [candle0, candle1, candle2, candle3];
    const termsBackgroundArray = data.pages[props.currPage].terms;
    const termsArray = data.pages[props.currPage].terms;

    const bgTermElement0 = useRef();
    const bgTermElement1 = useRef();
    const bgTermElement2 = useRef();
    const bgTermElement3 = useRef();
    const refArray = [bgTermElement0, bgTermElement1, bgTermElement2, bgTermElement3];
    
    const [visitedTerms, setVisitedTerms] = useState([]);
    const [nextPage, setNextPage] = useState(false);
    const [afterGradientAni, setAfterGradientAni] = useState(false);
    
    const changeStyle = (event, index) => {
        event.currentTarget.style = `opacity: 100%`;
        refArray[index].current.style = `opacity: 100%`;

        setVisitedTerms(prev => [...prev, index]);
    }
    
    useEffect(() => {
        props.setArrowFront(false);

        if(visitedTerms.includes(0) && visitedTerms.includes(1) && visitedTerms.includes(2) && visitedTerms.includes(3)) {
            setNextPage(true);
            setTimeout(() => {
                setAfterGradientAni(true);
            }, 3000)
        }
        if(nextPage) {
            setTimeout(() => {
                props.setArrowFront(true);
            }, 3000)
        }
    }, [visitedTerms, nextPage])

    useEffect(() => {
        if(props.pageState === "close") {
            for(let i = 0; i < refArray.length; i++) {
                refArray[i].current.style = `display: none`;
            }
        }
    }, [props.pageState])

    const termBackgroundElement = termsBackgroundArray.map((term, index) => {
        return <span key={term} ref={refArray[index]} className={classes[!nextPage ? "wholeCandle" : null]}>
            <div className={[`${classes.mask} ${classes[`mask${index}`]} ${nextPage ? classes.maskAni : null} ${classes[props.pageState === "close" ? `nextPage` : null]}`]} >
                <img src={background}/>
            </div>
            <div className={[!afterGradientAni ? `${classes.gradient} ${classes[`gradient${index}`]} ${classes[nextPage ? `gradientAni${index}` : null]}` : `${classes[`afterGradientAni`]} ${classes[`afterAni${index}`]} ${classes[props.pageState === "close" ? `nextPage` : null]}`]}></div>
        </span>
    })

    const termElement = termsArray.map((term, index) => {
        return <span key={term} onMouseOver={!nextPage ? (event) => changeStyle(event, index) : null} className={[`${classes["wholeCandle"]}`]} >
            <div className={[`${classes.text} ${classes[`title${index}`]} ${classes[nextPage ? `textAni${index}` : null]}`]}> {term} </div>
            <img className={[`${classes.candle} ${classes[`candle${index}`]} ${classes[nextPage ? `candleAni${index}` : null]} `]} src={candleArray[index]}/>            
        </span>
    }) 
        
    return (
        <div className={classes["VariableLevelsCandles"]} >
            <div className={classes.title}>רמות מדידה</div>
            {!nextPage && <div className={[`${classes.text} ${classes.subtitle}`]}> {`העכבר שלכם הוא נר. \nמצאו בעזרתו את סוגי רמות המדידה השונות שעל המסך ולחצו עליהן.`} </div>}
            {termBackgroundElement}
            {termElement}
            {afterGradientAni && <div className={[`${classes[`afterGradientAni`]} ${classes[`afterAni4`]} ${classes[props.pageState === "close" ? `nextPage` : null]}`]}></div>}
        </div>
    )
}

export default VariableLevelsCandles;