import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
//import Label from '../images/JarLabel.png';
import makeLabelWithTiles from '../util/MakeLabel';
import { ItemTypes } from '../util/DraggableItemTypes';
//import { LabelContainerTypes as LCT } from '../util/LabelContainerTypes';

function LabelSlot({label, labelWidth, swapLabels, containerIndex, containerType}) {

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
            //alert([item.containerIndex, item.containerType])
            return(swapLabels(item.containerIndex, item.containerType, containerIndex, containerType))
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            item: monitor.getItem(),
        }),
    });

    let color = '';
    /* const isEmpty = label.counts.length === 0;
    if (isEmpty){
        color = 'white';
    } */
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
    const labelSlotStyle = {
        backgroundColor: color,
        //border: 'dotted coral 2px',
        textAlign: 'center',
    }
    
    const finalLabel = makeLabelWithTiles(label, labelWidth * 1);

    // Do not know why ref is like this, but I found it in the doc examples
    // ref={(node)=>{drag(drop(node))}}
    return (
    <div key={`${containerType}${containerIndex}`} ref={(node)=>{drag(drop(node))}} style={labelSlotStyle}>
        {finalLabel}
    </div>
    );
}

export default LabelSlot;