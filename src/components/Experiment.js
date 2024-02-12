import React, { useState } from 'react';
import PickingJarContainer from '../containers/PickingJarContainer';
import LabelSheet from '../containers/LabelSheet';
import SubmitButton from './SubmitButton';
import { LabelContainerTypes as LCT} from '../util/LabelContainerTypes';
import shuffleArrayInPlace from '../util/Shuffler';
import { jarList } from '../jarSpecs/JarSpecifications';

function Experiment({specs}){
    const jars = jarList[0];
    
    var shuffledJars = jars.slice(0);
    shuffleArrayInPlace(shuffledJars);

    const numJars = jars.length;
    const emptyJars = [];
    for (let i = 0; i < numJars; i++){
        emptyJars.push({colors:[],counts:[]})
    }
    
    const [labelsInSheet, setLabelsInSheet] = useState(jars);
    const [labelsInJars, setLabelsInJars] = useState(emptyJars);

    function isSheetEmpty(labels){
        for (let i = 0; i < labels.length; i+=1){
            if (labels[i].colors && labels[i].colors.length !== 0){
                return false;
            } 
        }
        return true;
    }

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

    const submitReady = isSheetEmpty(labelsInSheet);
    const labelSheetMaxWidth = `${100/(numJars+1)}%`;

    function submitFunction({target}){
        alert("Submitting");
        console.log(`Submitting: ${labelsInJars}`)
        return 0;
    }

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
    const InstructionsParagraphStyle = {
        marginLeft:"2%",
        marginRight:"2%",
    }

    return (
        <div id="Experiment">
            <div id="Instructions" style={{display:"flex", justifyContent:"space-evenly"}}>
                <p key={"InstructionsP1"} style={InstructionsParagraphStyle}>
                    Here we have {numJars} jars of colored tiles and {numJars} matching labels for those jars.
                </p>
                <p key={"InstructionsP2"} style={InstructionsParagraphStyle}>
                    After you pick a tile from a jar it is placed back into the jar to maintain the color ratios.
                </p>
                <p key={"InstructionsP3"} style={InstructionsParagraphStyle}>
                    Drag and drop the labels onto the matching jars.
                </p>
            </div>

            <div id={"InteractablesWrapper"} style={InteractablesWrapperStyle}>

                <div style={labelSheetWrapperStyle}>
                    {submitReady?<SubmitButton handleSubmit={submitFunction}/>:<LabelSheet maxWith={labelSheetMaxWidth} labels={labelsInSheet} swapLabels={swapLabels}/>}
                </div>
                
                <div style={JarRowWrapperStyle}>
                    {Array.from({ length: numJars }, (_, index) => (
                                <PickingJarContainer 
                                    key={`PickingJarContainer${index}`}
                                    containerIndex={index}
                                    specifications={shuffledJars[index]}
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