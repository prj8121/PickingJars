import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Label from '../images/JarLabel.png';
import makeLabel from '../util/MakeLabel';

function LabelSlot({label, labelTextStyle, labelWidth}) {
    const labelTextElement = <>
        {label.colors.map((color, i) => (
            <span style={{color: color}} key={i}>{label.counts[i]} </span>
        ))}
    </>

    return (
    <div>
        {makeLabel(labelTextElement, labelWidth)}
    </div>
    );
}

export default LabelSlot;