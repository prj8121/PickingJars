import  React, { useState } from 'react';
import LabelSlot from '../components/LabelSlot';
import colorCountToText from '../util/colorCountToText';

function LabelSheet(){

    const jars = [
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



    const stuff = [
        jars.map((jar, i)=>{
            return(
                <LabelSlot 
                label = {jar}
                labelTextElement={colorCountToText(jar.colors, jar.counts)}/>
            );
        })
    ]

    const [slots, setSlots] = useState(stuff);

    return (
    <div>
        {
            slots.map((slot, index)=>{
                return slot;
            })
        }
    </div>);
}

export default LabelSheet;