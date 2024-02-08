import React, {useState, useEffect, useRef} from 'react';
import LabelSlot from '../components/LabelSlot';
import getNumFromStyle from '../util/getNumFromStyle';

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
            />
        </div>
    );
}

export default LabelSlotContainer;