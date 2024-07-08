import React, { useEffect, useState, useRef } from "react";
import classes from "./Exercises.module.css";
import data from "../../data.json"

import OpenEnd from "../logic/OpenEnd/OpenEnd";
import MultipleChoise from "../logic/MultipleChoise/MultipleChoise";
import BuildUp from "../logic/BuildUp/BuildUp";
import DragNDrop from "../logic/DragNDrop/DragNDrop";

const Exercises = (props) => {
    let page = data.pages[props.currPage];
    let exercise = page.exercise;
    const openEndQuestion = page.OpenEnd;

    const [answeredOpenEnd, setAnsweredOpenEnd] = useState(false);
    const [answeredMultipleChoise, setAnsweredMultipleChoise] = useState(false);
    const [answeredBuildUp, setAnsweredBuildUp] = useState(false);
    const [answeredDragNDrop, setAnsweredDragNDrop] = useState(false);

    useEffect(() => {
        props.setArrowFront(false);
        if(props.clickedArrowFront) {
            updateState();
        }
        updateArrowFront();
    }, [props.clickedArrowFront, answeredOpenEnd, answeredMultipleChoise, answeredBuildUp, answeredDragNDrop])

    const updateState = () => {
        setAnsweredOpenEnd(false);
        setAnsweredMultipleChoise(false);
        setAnsweredBuildUp(false);
        setAnsweredDragNDrop(false);
    }
    
    const updateArrowFront = () => {
        switch(exercise) {
            case "Exercise1":
                if(answeredOpenEnd) {
                    props.setArrowFront(true);
                }
              break;
            case "Exercise2":
                if(answeredOpenEnd && answeredMultipleChoise) {
                    props.setArrowFront(true);
                }
              break;
            case "Exercise3":
                if(answeredMultipleChoise) {
                    props.setArrowFront(true);
                }
              break;
            case "Exercise4":
                if(answeredDragNDrop) {
                    props.setArrowFront(true);
                }
              break;
            case "Exercise5":
                if(answeredOpenEnd) {
                    props.setArrowFront(true);
                }
              break;
            case "Exercise6":
                if(answeredBuildUp) {
                    props.setArrowFront(true);
                }
              break;
            case "Baskets":
                if(answeredDragNDrop) {
                    props.setArrowFront(true);
                }
              break;
            default:
                props.setArrowFront(true);
        }
    }
    
    const exerciseElements = () => {
        switch(exercise) {
            case "Exercise1":
                return <div className={classes.Exercises}>
                    <img className={classes[openEndQuestion.image === 'exercise1-table' ? "table1" : "table3"]} src={require(`../../assets/images/SVG/tables/${openEndQuestion.image}.svg`)}/>
                    <div className={classes.OpenEndContainer}>
                        <OpenEnd question={page.OpenEnd} answeredOpenEnd={answeredOpenEnd} setAnsweredOpenEnd={setAnsweredOpenEnd}/>
                    </div>
                </div>
            case "Exercise2":
                return <div className={classes.Exercises}>
                    <div className={classes.MultipleChoiseContainer}>
                        <MultipleChoise question={page.MultipleChoise} page={page} answeredMultipleChoise={answeredMultipleChoise} setAnsweredMultipleChoise={setAnsweredMultipleChoise}/>
                    </div>
                    <div className={classes.spacer}></div>
                    <div className={classes.OpenEndContainer} >
                        <OpenEnd question={page.OpenEnd} answeredOpenEnd={answeredOpenEnd} setAnsweredOpenEnd={setAnsweredOpenEnd}/>
                    </div>
                </div>
            case "Exercise3":
                return <div className={classes.Exercises}>
                    <div className={classes.MultipleChoiseContainer}>
                        <MultipleChoise question={page.MultipleChoise} page={page} answeredMultipleChoise={answeredMultipleChoise} setAnsweredMultipleChoise={setAnsweredMultipleChoise}/>
                    </div>
                </div>
            case "Exercise4":
                return <div className={classes.Exercises}>
                    <div className={classes.DragNDrop}>
                        <DragNDrop baskets={false} question={page.DragNDrop} answeredDragNDrop={answeredDragNDrop} setAnsweredDragNDrop={setAnsweredDragNDrop}/>
                    </div>
                </div>
            case "Exercise5":
                return <div className={classes.Exercises}>
                    <div className={classes.OpenEndContainer}>
                        <OpenEnd question={page.OpenEnd} answeredOpenEnd={answeredOpenEnd} setAnsweredOpenEnd={setAnsweredOpenEnd}/>
                    </div>
                </div>
            case "Exercise6":
                return <div className={classes.Exercises}>
                    <div className={classes.BuildUpContainer}>
                        <BuildUp question={page.BuildUp} answeredBuildUp={answeredBuildUp} setAnsweredBuildUp={setAnsweredBuildUp}/>
                    </div>
                </div>
            case "Baskets":
                return <div className={classes.Exercises}>
                    <div className={classes.DragNDrop}>
                        <DragNDrop baskets={true} question={page.DragNDrop} answeredDragNDrop={answeredDragNDrop} setAnsweredDragNDrop={setAnsweredDragNDrop}/>
                    </div>
                </div>
            default: return <div></div>
        }
    }

    return (
        <div>
            { page.background.closeAni && props.clickedArrowFront ? null : exerciseElements()}
        </div>
    )
}

export default Exercises;