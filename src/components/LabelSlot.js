import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Label from '../images/JarLabel.png';
import makeLabel from '../util/MakeLabel';
import { ItemTypes } from '../util/DraggableItemTypes';

function LabelSlot({label, labelTextStyle, labelWidth, updateLabel}) {

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.LABEL,
            item: { label },
            collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        
        end: (item, monitor) => {
            //const { id: droppedId, originalIndex } = item
            const didDrop = monitor.didDrop()
            const dropResult = monitor.getDropResult();
            alert(JSON.stringify(dropResult));
            if (!didDrop) {
                alert(`you dropped this!:${JSON.stringify(label)}`)
                //color = 'white';
                //moveCard(droppedId, originalIndex)
            }
        }, 
        }),
        [label/*, moveCard*/],
    );

    const [{ isOver, canDrop, item }, drop] = useDrop({
        accept: ItemTypes.LABEL,
        drop: ()=> {
            alert(JSON.stringify(item))
            return(updateLabel(item))
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            item: monitor.getItem(),
        }),
    });


    //color = isDragging?'orange':'none';
    let color = '';
    if (isDragging){
        color = 'orange';
    } else {
        if (canDrop) {
            color = 'green'
        }
        if (isOver) {
            color = 'coral'
        }
    }
    
    
    
    const labelTextElement = <>
        {label.colors.map((color, i) => (
            <span style={{color: color}} key={i}>{label.counts[i]} </span>
        ))}
    </>
    // Do not know why ref is like this, but I found it in the doc examples
    // ref={(node)=>{drag(drop(node))}}
    return (
    <div ref={(node)=>{drag(drop(node))}} style={{backgroundColor:color}}>
        {makeLabel(labelTextElement, labelWidth)}
    </div>
    );
}

export default LabelSlot;