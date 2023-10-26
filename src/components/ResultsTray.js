import React, { useState, useEffect, useRef }from 'react';



function ResultsTray({contents, containerWidth}){

    const [trayWidth, setTrayWidth] = useState(null);
    const elementRef = useRef(null);

    function getNumFromStyle(styleString) {
        const suffix = styleString.slice(-2);
        if( suffix === "px") return styleString.slice(0,-2);
        if( suffix.slice(-1) === '%') return styleString.slice(0, -1);
        return "Error";
    }

    // On first render record size of tile
    // Did this because rendering the tile at 30% of 
    //      flex width made the component grow after wrapping
    useEffect(()=>{
        const currentElement = elementRef.current;
        const width = window.getComputedStyle(currentElement).getPropertyValue('width');
        const widthNum = getNumFromStyle(width);
        setTrayWidth(widthNum);
    }, []);

    const makeCircleSvgWithColor = (color, centerText, isMostRecent) => {
        // Settings for tiles
        //const circleRadius = trayWidth? 0.1*trayWidth : 1;
        const circleRadius = containerWidth? 0.1*containerWidth : 1;
        const margin = circleRadius / 8;
        
        // Computed attributes of tiles
        
        const circleCenterX = circleRadius+margin;
        const boxWidth = circleCenterX * 2;


        const svgStyle = {
            flex: 1,
            border: isMostRecent?'dashed green 2px':null,
            display: centerText===-1?'none':'inline-flex',
            //width: trayWidth?trayWidth*0.27:'27%', 
        }

        return (
            <svg style={svgStyle} key={`tile${centerText}`}xmlns="http://www.w3.org/2000/svg" width={boxWidth} height={boxWidth} viewBox={`0 0 ${boxWidth} ${boxWidth}`}>
                <circle cx={circleCenterX} cy={circleCenterX} r={circleRadius} fill={color} />
                <text
                    //display={isMostRecent?'none':'inline'}
                    x={circleCenterX}
                    y={circleCenterX}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white" // You can set the desired text properties
                    fontSize={"1" * circleCenterX} // You can adjust the font size
                >{centerText + 1}</text>
            </svg>
        );
    }

    const svgRowStyle = {
        //display: 'flex',
        flexWrap: 'wrap-reverse',
        justifyContent: 'space-evenly',
        //maxWidth: trayWidth?`${trayWidth}px`:'none',
        maxWidth: containerWidth?`${containerWidth}px`:'none',
    }

    const firstElementContainerStyle = {
        justifyContent: 'center',
    }
    const rowContainerStyle = {
        justifyContent: 'center',
        //border: 'dotted red 2px',
    }

    console.log(svgRowStyle.maxWidth);

    

    return (
        <div style={{/*border:"dashed green 2px",*/ maxWidth:containerWidth?`${containerWidth}px`:'none'}}ref={elementRef}>
            {/*<p>{JSON.stringify(contents)}</p>*/}
            <div style={firstElementContainerStyle}>
                {makeCircleSvgWithColor(contents[0], contents.length-1, contents.length!==0)}
            </div>
            <div style={rowContainerStyle}>
                <div id='svg-row' style={svgRowStyle}>
                    {contents.slice(1).toReversed().map((color, i) => makeCircleSvgWithColor(color, i, false/*i===contents.length-21*/))}
                </div>
            </div>
        </div>
    );
}

export default ResultsTray;