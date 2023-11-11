import React, { useEffect, useState } from 'react';
import Counter from './Counter';

function ResultsTray({contents, containerWidth}){

    //const [trayWidth, setTrayWidth] = useState(null);
    //const elementRef = useRef(null);
    const [counterData, setCounterData] = useState(null);

    /*
    function getNumFromStyle(styleString) {
        const suffix = styleString.slice(-2);
        if( suffix === "px") return styleString.slice(0,-2);
        if( suffix.slice(-1) === '%') return styleString.slice(0, -1);
        return "Error";
    }
    */

    useEffect(()=>{
        const latestColor = contents.length>0?contents[0]:null;
        console.log(counterData)
        console.log(`latestColor:${latestColor}`)
        console.log(`contentss:${contents}`)
        if (latestColor !== null){
            console.log("entered latestColor!==null")
            const index = counterData.colors.indexOf(latestColor);
            if (index === -1){
                const newColors = [...counterData.colors, latestColor];
                const newCounts = [...counterData.counts, 1];
                setCounterData({
                    colors:newColors,
                    counts:newCounts,
                })
            } else {
                //This is just terrible
                const newCounts = counterData.counts.map((count, i) => {return(count + (i === index?1:0))});
                setCounterData({
                    colors:counterData.colors,
                    counts:newCounts,
                })
            }
        } else {
            setCounterData(
                {
                'colors':[],
                "counts":[]
                }
            )
        }
        
    }, [contents]);


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

    const rowContainerStyle = {
        justifyContent: 'center',
        //border: 'dotted red 2px',
    }

    console.log(svgRowStyle.maxWidth);

    

    return (
        <div style={{display:'flex', flexDirection:'column', /*textAlign:'center',*/ /*alignItems:'center',*/ maxWidth:containerWidth?`${containerWidth}px`:'none'}}>
            <div style={{display:'flex'}}>
                <div style={{alignSelf:'start', flex:1, opacity:0}}><Counter info={counterData}/></div>
                
                <div style={{ flex: 0, display: 'flex', justifyContent: 'center'}}>
                    {makeCircleSvgWithColor(contents[0], contents.length-1, contents.length!==0)}
                </div>

                {/* Invisible counter spacer, because I can't figure out centering one item*/}
                <div style={{alignSelf:'center', flex:1, opacity:1}}><Counter info={counterData}/></div>
                
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