import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
//import Label from '../images/JarLabel.png';
import makeLabel from '../util/MakeLabel';
import { ItemTypes } from '../util/DraggableItemTypes';
//import { LabelContainerTypes as LCT } from '../util/LabelContainerTypes';

function LabelSlot({label, labelTextStyle, labelWidth, updateLabel, swapLabels, containerIndex, containerType}) {

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.LABEL,
            item: ()=> ({ label, containerIndex, containerType }),
            collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        
        end: (item, monitor) => {
            //const { id: droppedId, originalIndex } = item
            const didDrop = monitor.didDrop()
            //const dropResult = monitor.getDropResult();
            //alert(dropResult);
            //alert(`moving label:${JSON.stringify(label)}`);
            if (!didDrop) {
                //alert(`you dropped this!:${JSON.stringify(label)}`)
                //color = 'white';
                //moveCard(droppedId, originalIndex)
            }
        }, 
        }),
        [label, containerIndex, containerType/*, moveCard*/],
    );

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.LABEL,
        drop: (item)=> {
            //alert(`item = ${JSON.stringify(item)}`)
            //alert(`receiver label:${JSON.stringify(label)}`);
            //return(updateLabel(item))
            //alert(JSON.stringify([item.containerIndex, item.containerType, containerIndex, containerType]))
            return(swapLabels(item.containerIndex, item.containerType, containerIndex, containerType))
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