import React from 'react';
import LabelSlotContainer from '../containers/LabelSlotContainer';
import { LabelContainerTypes } from '../util/LabelContainerTypes';

function LabelSheet({maxWidth, labels, swapLabels}){

    labels = labels?labels:[
        {
            colors: ['red', 'blue'],
            counts: [4, 6],
        },
        {
            colors: ['red', 'blue'],
            counts: [5, 5],
        },
        {
            colors: ['red', 'blue'],
            counts: [6, 4],
        },
        {
            colors: ['red', 'blue'],
            counts: [9, 1],
        },
        {
            colors:[],
            counts:[],
        }
    ]


    const filledLabelList = [
        labels.map((label, i)=>{
            return(
                <LabelSlotContainer
                key={`LabelSlotContainer${i}`}
                swapLabels={swapLabels}
                containerIndex = {i}
                containerType={LabelContainerTypes.SHEET}
                label = {label}
                labelSheetWidth = {maxWidth}
                />
            );
        })
    ]

    const sheetColumnStyle = {
        flexDirection:'column',
        justifyContent: 'center',
    }

    return (
    <div>
        <div style={sheetColumnStyle}>
            {
                filledLabelList.map((slot, index)=>{
                    return slot;
                })
            }
        </div>
    </div>);
}

export default LabelSheet;