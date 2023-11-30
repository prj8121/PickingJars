import  React from 'react';
import LabelSlot from '../components/LabelSlot';
import colorCountToText from '../util/colorCountToText';
import { LabelContainerTypes } from '../util/LabelContainerTypes';

function LabelSheet({labels, swapLabels}){

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
                <LabelSlot 
                swapLabels={swapLabels}
                containerIndex = {i}
                containerType={LabelContainerTypes.SHEET}
                label = {label}
                labelTextElement={colorCountToText(label.colors, label.counts)}/>
            );
        })
    ]

    const jarRowStyle = {
        flexWrap:'wrap',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems: 'top',
        margin:'20px'
    }

    return (
    <div style={jarRowStyle}>
        {
            filledLabelList.map((slot, index)=>{
                return slot;
            })
        }
    </div>);
}

export default LabelSheet;