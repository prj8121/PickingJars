import React, {useState, useEffect, useRef} from 'react';
import LabelSlot from '../components/LabelSlot';
import colorCountToText from '../util/colorCountToText';
import { ItemTypes } from '../util/DraggableItemTypes';
//import { LabelContainerTypes as LCT } from '../util/LabelContainerTypes';

function LabelSlotContainer({label, swapLabels, containerIndex, containerType, labelSheetWidth}) {

    const [LabelContainerWidth, setLabelContainerWidth] = useState(null);
    const elementRef = useRef(null);

    useEffect(()=>{

        const fixContainerWidth = () => {
            const currentElement = elementRef.current;
            const width = window.getComputedStyle(currentElement).getPropertyValue('width');
            const widthNum = getNumFromStyle(width);
            setLabelContainerWidth(widthNum);
        }

        fixContainerWidth();

        window.addEventListener('resize', fixContainerWidth)

        return () => {
            window.removeEventListener('resize', fixContainerWidth)
        }
    }, []);

    function getNumFromStyle(styleString) {
        const suffix = styleString.slice(-2);
        if( suffix === "px") return styleString.slice(0,-2);
        if( suffix.slice(-1) === '%') return styleString.slice(0, -1);
        return "Error";
    }

    const containerStyle = {
        flex: 1,
        maxWidth: labelSheetWidth,
        //border: 'dotted blue 2px',
    }
    return (
        <div style={containerStyle} ref={elementRef}>
            <LabelSlot
            swapLabels={swapLabels}
            containerIndex = {containerIndex}
            containerType={containerType}
            label = {label}
            labelWidth={LabelContainerWidth?LabelContainerWidth:labelSheetWidth}
            labelTextElement={colorCountToText(label.colors, label.counts)}/>
        </div>
    );
}

export default LabelSlotContainer;