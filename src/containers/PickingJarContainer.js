import React, { useState, useEffect, useRef } from 'react';
import PickingJar from '../components/PickingJar';
import ResultsTray from '../components/ResultsTray';
import getNumFromStyle from '../util/getNumFromStyle';

function PickingJarContainer({specifications, swapLabels, containerIndex, label}){

    const [results, setResults] = useState([]);
    const [containerWidth, setContainerWidth] = useState(null);
    const elementRef = useRef(null);

    useEffect(()=>{

        const fixContainerWidth = () => {
            const currentElement = elementRef.current;
            const width = window.getComputedStyle(currentElement).getPropertyValue('width');
            const widthNum = getNumFromStyle(width);
            setContainerWidth(widthNum);
        }

        fixContainerWidth();

        window.addEventListener('resize', fixContainerWidth)

        return () => {
            window.removeEventListener('resize', fixContainerWidth)
        }
    }, []);

    // From https://www.w3schools.com/js/js_random.asp
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    const total = specifications.counts.reduce((sum, a) => sum + a, 0);

    function handlePick({target}){
        //console.log(`total=${total}`);
        let indexChoice = getRndInteger(0, total);
        let colorIndex = 0;
        while (indexChoice > 0 && colorIndex < specifications.colors.length) {
            indexChoice -= specifications.counts[colorIndex];
            if (indexChoice >= 0) colorIndex++;
        }

        setResults([specifications.colors[colorIndex], ...results]);
    }

    const resultsTrayStyle = {
        //flex:1,
        //flexDirection:'column',
        //display:'flex',
        //border:'dashed lightgreen 2px',
        //justifyContent:'center',
        //flexGrow:1
    }
    const JarStyle = {
        flex:1,
        //border:'dashed lightgreen 2px',
    }

    return (
        <div id={`PickingJarWrapper${containerIndex}`} style={JarStyle} ref={elementRef}>
            <PickingJar 
                //style={{ alignSelf: 'flex-start' }} 
                specs={specifications} 
                onPick={handlePick} 
                containerWidth={containerWidth}
                swapLabels={swapLabels}
                containerIndex={containerIndex}
                label={label}
            />
            <div id={`ResultsTrayContainer${containerIndex}`} style={resultsTrayStyle}>
                <ResultsTray contents={results} containerIndex={containerIndex} containerWidth={containerWidth} colorOrder={specifications.colors}/>
            </div>
        </div>
        
    );
}

export default PickingJarContainer;