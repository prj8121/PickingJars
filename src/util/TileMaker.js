export const makeCircleSvgWithColor = (color, radius, centerText, isMostRecent, key) => {
    // Settings for tiles
    //const circleRadius = trayWidth? 0.1*trayWidth : 1;
    const circleRadius = radius;
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
        <svg key={key} style={svgStyle} /*key={`tile${centerText}`}*/ xmlns="http://www.w3.org/2000/svg" width={boxWidth} height={boxWidth} viewBox={`0 0 ${boxWidth} ${boxWidth}`}>
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