import { useEffect, useState } from "react";
import data from "../data.json"

import Examples from "./Examples/Examples";
import Exercises from "./Exercises/Exercises";
import OneText from "./OneText/OneText";
import Opening from "./Opening/Opening";
import Ending from "./Ending/Ending";
import About from "./About/About";
import ShortTerms from "./ShortTerms/ShortTerms";
import VariableLevelsCandles from "./VariableLevelsCandles/VariableLevelsCandles";
import VariableTypesCandles from "./VariableTypesCandles/VariableTypesCandles";
import WorkProcess from "./WorkProcess/WorkProcess";

import Background from "./Background/Background"
import Navigation from "./Navigation/Navigation";

const PageManager = () => {
    const [currPage, setCurrPage] = useState(0);
    const [arrowFront, setArrowFront] = useState(true);
    const [arrowBack, setArrowBack] = useState(true);

    const [clickedArrowFront, setClickedArrowFront] = useState(false);
    const [pageState, setPageState] = useState("open");
    const [showAni, setShowAni] = useState(true);

    let currPageName = data.pages[currPage].name;

    useEffect(() => {
        setClickedArrowFront(false);

        if(currPageName === "Opening" || currPageName === "Ending" || currPageName === "About" || currPage >= 28 && currPage <= 31) {
            setArrowFront(false);
            setArrowBack(false);
        } else if(currPageName === "Exercises" || 
                currPageName === "VariableLevelsCandles") {
            setArrowFront(false);
            setArrowBack(true);
        } else if(currPageName === "VariableTypesCandles") {
            return;
        } else {
            setArrowFront(true);
            setArrowBack(true);
        }
    }, [currPage])

    const displayedPage = {
        "OneText": <OneText currPage={currPage} setCurrPage={setCurrPage} />,
        "Exercises": <Exercises currPage={currPage} clickedArrowFront={clickedArrowFront} setArrowFront={setArrowFront}/>,
        "Examples": <Examples currPage={currPage} setCurrPage={setCurrPage} />,
        
        "Opening": <Opening setCurrPage={setCurrPage} />,
        "Ending": <Ending setCurrPage={setCurrPage} />,
        "About": <About currPage={currPage} setCurrPage={setCurrPage}/>,

        "ShortTerms": <ShortTerms currPage={currPage} setCurrPage={setCurrPage} />,
        "VariableTypesCandles": <VariableTypesCandles currPage={currPage} setCurrPage={setCurrPage} setArrowFront={setArrowFront} setArrowBack={setArrowBack}/>,
        "VariableLevelsCandles": <VariableLevelsCandles pageState={pageState} currPage={currPage} setArrowFront={setArrowFront}/>,
        "WorkProcess": <WorkProcess currPage={currPage} />,
    }

    return (
        <div>
            <Background currPage={currPage} pageState={pageState} setPageState={setPageState} showAni={showAni} setShowAni={setShowAni}/>
            {displayedPage[currPageName]}
            <Navigation currPage={currPage} arrowFront={arrowFront} arrowBack={arrowBack} showAni={showAni} 
                        setCurrPage={setCurrPage} setPageState={setPageState} setClickedArrowFront={setClickedArrowFront}
            />
        </div>
    )
}

export default PageManager;
