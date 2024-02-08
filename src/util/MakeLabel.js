import labelPNG from '../images/JarLabelv2.png';
import emptyLabelPNG from '../images/DottedJarLabelv2.png';
import { makeCircleSvgWithColor } from './TileMaker';
import { findByLabelText } from '@testing-library/react';

function makeLabel(labelSpecs, labelWidth){
    return makeLabelWithTiles(labelSpecs, labelWidth);
}

function makeLabel1(textElement, labelWidth){
    const isEmpty = textElement.props.children.length === 0;

    const imageStyle = {
        maxWidth: labelWidth//`${labelWidth}px`,
    };
    const containerStyle = {
        position:'relative',
        //display: 'flex', //'inline-block',
        textAlign: 'center',
        maxWidth: labelWidth,//`${labelWidth}px`,
        //border: 'dotted black 2px',
    };
    const textContainerStyle = {
        position: 'absolute',
        top:'50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }

    return(
        <div style={containerStyle}>
            <div style={textContainerStyle}>
                {textElement}
            </div>
            <img style={imageStyle} src={isEmpty?emptyLabelPNG:labelPNG} alt={'label failed to load'} />
            
        </div>
    )
}

export function makeLabelWithTiles(labelSpecs, labelWidth) {
    const isEmpty = labelSpecs.colors.length === 0;
    const radius = (0.6 * labelWidth) / (2 * (1 + labelSpecs.colors.length));

    const tileSvgList = [
        labelSpecs.colors.map((color, i) => (
            makeCircleSvgWithColor(color, radius, labelSpecs.counts[i] - 1, false)
        ))
    ];

    const imageStyle = {
        maxWidth: labelWidth//`${labelWidth}px`,
    };
    const containerStyle = {
        position:'relative',
        //display: 'flex', //'inline-block',
        textAlign: 'center',
        maxWidth: labelWidth,//`${labelWidth}px`,
        //border: 'dotted black 2px',
    };
    const tileRowStyle = {
        display: "flex",
        justifyContent: "spaceEvenly",
        position: 'absolute',
        top:'50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }

    return(
        <div style={containerStyle}>
            <div style={tileRowStyle}>
                {tileSvgList.map((tile, _) => (
                    <>{tile}</>
                ))}
            </div>
            <img style={imageStyle} src={isEmpty?emptyLabelPNG:labelPNG} alt={'label failed to load'} />
            
        </div>
    )
}

/*
function makeLabel1(text){

    return(
        //{xmlns:xlink="http://www.w3.org/1999/xlink"}
        <svg version="1.1" viewBox="0.0 0.0 407.5196850393701 174.23884514435696" fill="none" stroke="none" strokeLinecap="square" strokeMiterlimit="10" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="p.0">
                <path d="m0 0l407.51968 0l0 174.23885l-407.51968 0l0 -174.23885z" clip-rule="nonzero"/>
            </clipPath>
            <g clip-path="url(#p.0)">
                <path fill="#000000" fillOpacity="0.0" d="m0 0l407.51968 0l0 174.23885l-407.51968 0z" fillRule="evenodd"/>
                <path fill="#000000" fillOpacity="0.0" d="m25.192913 27.29265l356.1575 -1.9212589" fillRule="evenodd"/>
                <path stroke="#000000" strokeWidth="16.0" strokeLinejoin="round" strokeLinecap="butt" d="m25.192913 27.29265l356.1575 -1.9212589" fillRule="evenodd"/>
                <path fill="#000000" fillOpacity="0.0" d="m25.1916 137.76881l356.1575 -1.9212494" fillRule="evenodd"/>
                <path stroke="#000000" strokeWidth="16.0" strokeLinejoin="round" strokeLinecap="butt" d="m25.1916 137.76881l356.1575 -1.9212494" fillRule="evenodd"/>
                <path fill="#000000" fillOpacity="0.0" d="m30.72 29.599737l34.551178 34.551178" fillRule="evenodd"/>
                <path stroke="#000000" strokeWidth="16.0" strokeLinejoin="round" strokeLinecap="butt" d="m30.72 29.599737l34.551178 34.551178" fillRule="evenodd"/>
                <path fill="#000000" fillOpacity="0.0" d="m65.27118 53.292652l-34.551178 34.55118" fillRule="evenodd"/>
                <path stroke="#000000" strokeWidth="16.0" strokeLinejoin="round" strokeLinecap="butt" d="m65.27118 53.292652l-34.551178 34.55118" fillRule="evenodd"/>
                <path fill="#000000" fillOpacity="0.0" d="m30.72 76.8l34.551178 34.551178" fillRule="evenodd"/>
                <path stroke="#000000" strokeWidth="16.0" strokeLinejoin="round" strokeLinecap="butt" d="m30.72 76.8l34.551178 34.551178" fillRule="evenodd"/>
                <path fill="#000000" fillOpacity="0.0" d="m65.27118 100.49291l-34.551178 34.551186" fillRule="evenodd"/>
                <path stroke="#000000" strokeWidth="16.0" strokeLinejoin="round" strokeLinecap="butt" d="m65.27118 100.49291l-34.551178 34.551186" fillRule="evenodd"/>
                <path fill="#000000" fillOpacity="0.0" d="m375.3512 27.84l-34.55121 34.55118" fillRule="evenodd"/>
                <path stroke="#000000" strokeWidth="16.0" strokeLinejoin="round" strokeLinecap="butt" d="m375.3512 27.84l-34.55121 34.55118" fillRule="evenodd"/>
                <path fill="#000000" fillOpacity="0.0" d="m340.8 51.532913l34.55121 34.551178" fillRule="evenodd"/>
                <path stroke="#000000" strokeWidth="16.0" strokeLinejoin="round" strokeLinecap="butt" d="m340.8 51.532913l34.55121 34.551178" fillRule="evenodd"/>
                <path fill="#000000" fillOpacity="0.0" d="m375.3512 75.04026l-34.55121 34.551186" fillRule="evenodd"/>
                <path stroke="#000000" strokeWidth="16.0" strokeLinejoin="round" strokeLinecap="butt" d="m375.3512 75.04026l-34.55121 34.551186" fillRule="evenodd"/>
                <path fill="#000000" fillOpacity="0.0" d="m340.8 98.73318l34.55121 34.551186" fillRule="evenodd"/>
                <path stroke="#000000" strokeWidth="16.0" strokeLinejoin="round" strokeLinecap="butt" d="m340.8 98.73318l34.55121 34.551186" fillRule="evenodd"/>
            </g>
        </svg>
    )
} 
*/

export default makeLabel;