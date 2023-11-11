import React from 'react';
import PickingJarContainer from '../containers/PickingJarContainer';

const jarRowStyle = {
    flexWrap:'wrap',
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems: 'top',
    margin:'20px'
}

function Experiment({specs}){
    const numJars = 4; //specs.numJars;
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
        }
    ]


    return (
        /* <div id='jar-row' style={{flexWrap:'wrap', display:'flex', flexDirection:'row', justifyContent: 'space-evenly', alignItems: 'top', margin:'20px'}}> */
        <div>
            <p>
                This is an experiment with {numJars} jars
            </p>
            <div id='jar-row' style={jarRowStyle}>
                {Array.from({ length: numJars }, (_, index) => (
                    <PickingJarContainer key={index} specifications={jars[index]}/>
                ))}
            </div>
            
        </div>
    );
}

export default Experiment;