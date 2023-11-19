import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Label from '../images/JarLabel.png';
import makeLabel from '../util/MakeLabel';
import { ItemTypes } from '../util/DraggableItemTypes';

function LabelSlot({label, labelTextStyle, labelWidth}) {
    
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
            if (!didDrop) {
                alert(`you dropped this!:${JSON.stringify(label)}`)
              //moveCard(droppedId, originalIndex)
            }
          }, 
        }),
        [label/*, moveCard*/],
      );

      const color = isDragging? 'red':'blue';

      /*
      const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.LABEL,
        drop: onDrop,
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      });
      */
    
    
    const labelTextElement = <>
        {label.colors.map((color, i) => (
            <span style={{color: color}} key={i}>{label.counts[i]} </span>
        ))}
    </>

    return (
    <div ref={drag} style={{backgroundColor:color}}>
        {makeLabel(labelTextElement, labelWidth)}
    </div>
    );
}

export default LabelSlot;