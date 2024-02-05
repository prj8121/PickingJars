import React, { useState } from 'react';
import PickingJarContainer from '../containers/PickingJarContainer';
import LabelSheet from '../containers/LabelSheet';
import { LabelContainerTypes as LCT} from '../util/LabelContainerTypes';

function Experiment({specs}){

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
            colors: ['green', 'blue'],
            counts: [1, 2],
        }
    ];

    const numJars = jars.length;
    const emptyJars = [];
    for (let i = 0; i < numJars; i++){
        emptyJars.push({colors:[],counts:[]})
    }
    
    const [labelsInSheet, setLabelsInSheet] = useState(jars);
    const [labelsInJars, setLabelsInJars] = useState(emptyJars);

    /* 
      Functional but not especially readable unfortunately
      Checks which type of thing the label is from (sheet or jar) and 
      uses the comparison of those two types to determine which lists to affect
    */
    function swapLabels(index1, conType1, index2, conType2){

        const firstLabel = conType1===LCT.SHEET? labelsInSheet[index1]:labelsInJars[index1];
        const secondLabel = conType2===LCT.SHEET? labelsInSheet[index2]:labelsInJars[index2];

        var newJarLabels;
        var newSheetLabels;
        if (conType1===LCT.JAR && conType2===LCT.JAR){
            newJarLabels = [...labelsInJars];
            newJarLabels[index1] = secondLabel;
            newJarLabels[index2] = firstLabel;
            setLabelsInJars(newJarLabels);
        } else if (conType1===LCT.SHEET && conType2===LCT.SHEET){
            newSheetLabels = [...labelsInSheet];
            newSheetLabels[index1] = secondLabel;
            newSheetLabels[index2] = firstLabel;
            setLabelsInSheet(newSheetLabels);
        } else if (conType1===LCT.JAR /*&& conType2===LCT.SHEET*/) {
            //alert('Jar <-> Sheet')
            newJarLabels = [...labelsInJars];
            newSheetLabels = [...labelsInSheet];
            newJarLabels[index1] = secondLabel;
            newSheetLabels[index2] = firstLabel;
            setLabelsInJars(newJarLabels);
            setLabelsInSheet(newSheetLabels);
        } else /*if (conType1===LCT.SHEET && conType2===LCT.JAR)*/{
            //alert('Sheet <-> Jar')
            newJarLabels = [...labelsInJars];
            newSheetLabels = [...labelsInSheet];
            newSheetLabels[index1] = secondLabel;
            newJarLabels[index2] = firstLabel;

            setLabelsInJars(newJarLabels);
            setLabelsInSheet(newSheetLabels);
        }
    }

    const labelSheetMaxWidth = `${100/(numJars+1)}%`

    const labelSheetWrapperStyle = {
        maxWidth: labelSheetMaxWidth,
        flex:1,
        //border:'dashed lightgreen 2px',
    }
    const JarRowWrapperStyle = {
        display:'flex',
        flex:1,
    }
    const InteractablesWrapperStyle = {
        display:'flex',
        flexDirection:'row',
        //border:'dashed lightgreen 2px',
    }

    return (
        <div>
            <div style={{display:"flex", justifyContent:"space-evenly"}}>
                <p>
                    Here we have {numJars} jars and {numJars} labels.
                </p>
                <p>
                    Each Jar contains a unique ratio of tiles matching one of the ratios on a label.
                </p>
                <p>
                    Drag and drop the labels onto the matching jars.
                </p>
            </div>
            
            <div style={InteractablesWrapperStyle}>

                <div style={labelSheetWrapperStyle}>                   
                    <LabelSheet maxWith={labelSheetMaxWidth} labels={labelsInSheet} swapLabels={swapLabels}/>
                </div>
                
                <div style={JarRowWrapperStyle}>
                    {Array.from({ length: numJars }, (_, index) => (
                                <PickingJarContainer 
                                    containerIndex={index}
                                    specifications={jars[index]}
                                    swapLabels={swapLabels}
                                    label = {labelsInJars[index]}
                                />
                            ))}
                </div>

            </div>
            
        </div>
    );
}

export default Experiment;