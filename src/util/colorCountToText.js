import React from 'react';

const defaultTextStyle = {

}

function colorCountToText(colors, counts, textStyle = defaultTextStyle){
    return (
    <>
    {
    colors.map((color, i) => (
        <span style={{color: color, ...textStyle}} key={i}>{counts[i]} </span>
    ))}
    </>);
}

export default colorCountToText;