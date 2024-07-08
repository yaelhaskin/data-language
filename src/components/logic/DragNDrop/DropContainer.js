import React from 'react';
import classes from "./DragNDrop.module.css";
import { useDrop } from "react-dnd";

import { ItemTypes } from './ItemType'

const DropContainer = ({children, className, title, baskets}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TERM,
        drop: () => ({name: title}),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), )

    return (
        <div ref={drop} className={[`${className} ${isOver && title !== "termsStartColumn" ? classes.isOver : null}`]}>
            {title === "termsStartColumn" || baskets ? null : title}
            {children}
        </div>
    )
}

export default DropContainer;
