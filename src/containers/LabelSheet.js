import React from 'react';
import LabelSlot from '../components/LabelSlot';
import LabelSlotContainer from '../containers/LabelSlotContainer';
import colorCountToText from '../util/colorCountToText';
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
                swapLabels={swapLabels}
                containerIndex = {i}
                containerType={LabelContainerTypes.SHEET}
                label = {label}
                labelSheetWidth = {maxWidth}
                //labelTextElement={colorCountToText(label.colors, label.counts)}
                />
            );
            /* return(
                <LabelSlot 
                swapLabels={swapLabels}
                containerIndex = {i}
                containerType={LabelContainerTypes.SHEET}
                label = {label}
                labelWidth={containerWidth?containerWidth:150}
                labelTextElement={colorCountToText(label.colors, label.counts)}/>
            ); */
        })
    ]

    const sheetColumnStyle = {
        //flex:1,
        //display:'flex',
        flexDirection:'column',
        justifyContent: 'center',
        //border: 'dotted red 2px',
        //justifyContent: 'space-evenly',
        //alignItems: 'center',
        //maxWidth: maxWidth,
        //margin:'20px'
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