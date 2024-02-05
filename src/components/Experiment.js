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
      This has spiraled into a chaotic mess    
    */
    function swapLabels(index1, conType1, index2, conType2){

        //alert(`Swapping ${conType1} ${index1} and ${conType2} ${index2}`);

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

            //alert(JSON.stringify(newSheetLabels));
            //alert(JSON.stringify(newJarLabels));
            setLabelsInJars(newJarLabels);
            setLabelsInSheet(newSheetLabels);
        }
        

        /*
        const setter1 = conType1===LCT.SHEET?setLabelsInSheet:setLabelsInJars;
        const source1 = conType1===LCT.SHEET?[...labelsInSheet]:[...labelsInJars];
        const setter2 = conType2===LCT.SHEET?setLabelsInSheet:setLabelsInJars;

        let source2;
        if (conType1===conType2){
            source2 = source1;
        } else {
            source2 = conType2===LCT.SHEET?[...labelsInSheet]:[...labelsInJars];
        }

        source2.splice(
            index2,             // starting at index
            1,                      // delete 1 item
            firstLabel  // and place in new label
        )
        setter1(  // Setting the first item into the location of the second item
            source2
        );

        source1.splice(
            index1,             // starting at index
            1,                      // delete 1 item
            secondLabel  // and place in new label
        )
        setter2(  // Setting the second item into the location of the first item
            source1
        );
        */
        /*setLabelsInJars(
            labelsInJars.splice(
                jarIndex,
                1,
                sheetLabel
            )
        );*/
    }

    const labelSheetMaxWidth = `${100/(numJars+1)}%`

    const jarRowStyle = {
        flexWrap:'wrap',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems: 'top',
        margin:'20px'
    }
    const labelSheetWrapperStyle = {
        //display:'flex',
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
        //justifyContent:'center',
        //border:'dashed lightgreen 2px',
        //alignItems:'center'
    }

/*
{Array.from({ length: numJars }, (_, index) => (
                            <PickingJarContainer 
                                containerIndex={index}
                                specifications={jars[index]}
                                swapLabels={swapLabels}
                                label = {labelsInJars[index]}
                            />
                        ))}
*/

    return (
        /* <div id='jar-row' style={{flexWrap:'wrap', display:'flex', flexDirection:'row', justifyContent: 'space-evenly', alignItems: 'top', margin:'20px'}}> */
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