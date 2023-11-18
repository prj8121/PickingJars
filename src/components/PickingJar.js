import React from 'react';
//import basicJar from '../images/BasicJar.png';
import LabelSlot from './LabelSlot';
import basicJar from '../images/PickingJarGoogleDrawing.png';
import colorCountToText from '../util/colorCountToText';

function PickingJar({specs, onPick, containerWidth}){

    const containerStyle = {
        position:'relative',
        //backgroundColor:'coral',
        //border: '2px solid blue',
        display: 'inline-block',
        textAlign: 'center',
    }
    const textStyle = {
        //border: '2px solid black',
        //position: 'relative',
    }
    const buttonStyle = {
        display: 'block',
        position: 'relative',
        margin: '10px auto',
        //border: '2px solid green',
    }
    const imageStyle = {
        maxWidth:'100%',
        //border: '2px solid red',
    }
    const textContainerStyle = {
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: `${(containerWidth?containerWidth:300) / 10}px`,
    };

    return (
        <div>
            <div style={containerStyle}>
                <div style={textContainerStyle}>
                    <LabelSlot 
                    //label = {specs}
                    label = {{colors:[],counts:[]}}
                    labelTextStyle={textStyle}
                    labelWidth = {0.8 * containerWidth}
                    //labelTextElement={colorCountToText(specs.colors, specs.counts, textStyle)}
                    //labelTextElement={specs.colors.map((color, i) => (
                    //    <span style={{color: color, ...textStyle}} key={i}>{specs.counts[i]} </span>
                    //))}
                    //labelWidth=`${containerWidth}px`
                    />
                    {/*<p style={textStyle}>
                        Colors: {specs.colors}
                    </p>*/}
                </div>
                <img 
                    style={imageStyle}
                    alt='PickingJar did not load'
                    src={basicJar}
                />
            </div>
            <button 
                style={{width:50, height:20, ...buttonStyle}}
                onClick={onPick}
            >
                Pick
            </button>
        </div>
    );
}

export default PickingJar;