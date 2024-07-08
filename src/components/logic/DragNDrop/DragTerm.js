import React, { useEffect } from 'react';
import classes from "./DragNDrop.module.css";
import { useDrag } from "react-dnd";

import { ItemTypes } from './ItemType'

const DragTerm = (props) => {
    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.TERM ,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(dropResult){
                props.handleDrop(props.variName, `${dropResult.name}`);
            } 
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    useEffect(() => {
        if(isDragging) {
            props.setTryAgainText(false);
        }
    }, [isDragging])

    return (
        <div ref={drag} style={props.indicationStyle} 
        className={[`${props.className} ${classes.text} ${classes[props.baskets ? `variBaskets` : `variable` ]}`]} >
            { props.variName }
        </div>
    )
}

export default DragTerm;