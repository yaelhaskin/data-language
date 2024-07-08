import React, {useEffect, useState} from 'react';
import classes from "./DragNDrop.module.css";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DragTerm from './DragTerm';
import DropContainer from './DropContainer';

const DragNDrop = (props) => {
  const question = props.question;
  const columnsArray = question.columns;
  
  const [terms, setTerms] = useState(question.terms);
  const [currTerm, setCurrTerm] = useState(0);

  const [tryAgainText, setTryAgainText] = useState(false);
  
  const handleDrop = (currVari, currColumn) => {
    setTerms((prev) => (
      prev.map((btn) => {
        return btn.vari === currVari ?
        { 
          ...btn,
          column: currColumn
        } 
        :
        btn
      })
    ))  
    
    if(props.baskets) {
      let filteredCorrectAns = terms;
      filteredCorrectAns = filteredCorrectAns.filter((btn) => btn.vari === currVari && currColumn === btn.correctAnswer);   
      
      if(filteredCorrectAns[0]) {
        setCurrTerm((prev) => prev + 1);
      } else {
        setTryAgainText(true);
      }
      checkAnswers();
    }
  }

  const handleSubmit = () => {
    checkAnswers();
    props.setAnsweredDragNDrop(true);
  }

  const checkAnswers = () => {
    setTerms((prev) => (
      prev.map((btn) => {
        switch(btn.column) {
          case `${btn.correctAnswer}`:
          return { 
            ...btn,
            color: "green"
          }
          case `termsStartColumn`:
          return { 
            ...btn,
            color: ""
          }
          default:
          return { 
            ...btn,
            color: "red"
          }
        }
      })
    ))
  }

  const indicationStyle = (currVari) => {
    let filteredArray = terms;
    filteredArray = filteredArray.filter((vari) => vari.vari === currVari);    
    let color = filteredArray[0].color;

    if(props.baskets) {
      if(color === "green") {
        return {backgroundColor: "transparent", backgroundColor: "#1f5b1f", borderRadius: "5px"};
      } else if(color === "red") {
          return {backgroundColor: "transparent", backgroundColor: "#aa281f", borderRadius: "5px"};
      } 
    } else {
      if(color === "green") {
          return {backgroundColor: "transparent", borderColor: "#1f5b1f", borderWidth: "5px"};
      } else if(color === "red") {
          return {backgroundColor: "transparent", borderColor: "#aa281f", borderWidth: "5px"};
      } 
    }
  }
    
  const returnTermsForColumn = (columnName) => {
    let currVari = terms;
    currVari = currVari.filter((vari) => vari.column === columnName);
    
    // creates array of single items insted of objects(cannot map over objects later)
    let variMapArray = [];
    for(let i = 0; i < currVari.length; i++) {
      variMapArray.push(currVari[i].vari);
    }

    variMapArray = variMapArray.map((vari, index) => {
      return <DragTerm key={vari} baskets={props.baskets} variName={vari} indicationStyle={indicationStyle(vari)} setTryAgainText={setTryAgainText} handleDrop={handleDrop}
              className={props.baskets ? classes[`${currVari[index].variNum <= currTerm ? `show` : `hide`}`] : null}
      />
    });
    return variMapArray;
  }

  useEffect(() => {
    setTryAgainText(false);

    setTerms((prev) => (
      prev.map((btn, index) => {
        return {
          vari: btn.vari,
          variNum: index,
          column: "termsStartColumn",
          correctAnswer: btn.correctAnswer,
          color: ""
        }
      })
    ))
  }, [])

  useEffect(() => {
    if(currTerm === question.terms.length) {
      props.setAnsweredDragNDrop(true);
    }
  }, [currTerm])
    
  const columnElements = columnsArray.map((column, index) => {
    return <DropContainer key={column} title={column} baskets={props.baskets} 
            className={[`${classes.text} ${classes[props.baskets ? `basketsContainer` : `dropContainer`]} ${classes[props.baskets ? `basket${index}` : null]}`]} >
              {returnTermsForColumn(column)}
            </DropContainer>
  })

  return (
    <div className={classes.DragNDrop}>
        { !props.answeredDragNDrop &&
          <div className={[`${classes.title} ${classes.text} ${classes[question.textColor]}`]}> {question.title} </div>
        }

        <DndProvider backend={HTML5Backend}>
            <div className={classes.columnElementsContainer}>
              {columnElements}
            </div>

            <div className={[`${classes.text} ${classes.termsStartContainer}`]}>
              {returnTermsForColumn(`termsStartColumn`)}
            </div>
        </DndProvider>

        { (props.answeredDragNDrop && props.baskets) &&
          <div className={[`${classes.text} ${classes.center} ${classes.yellow}`]}> {`יפה מאוד!\n הצלחתם למיין את כל המשתנים`} </div>
        }
        {!props.answeredDragNDrop && !props.baskets ?
          <button onClick={handleSubmit} className={[`${classes.checkBtn} ${classes.white}`]}>בדיקה</button>
          : null
        }
        {props.answeredDragNDrop && 
          <div className={[`${classes.explanation} ${classes.white}`]}> {question.explanation} </div>
        }
        {tryAgainText && 
          <div className={[`${classes.text} ${classes.yellow}`]}> נסו שוב... </div>
        }
    </div>
  );
}

export default DragNDrop;